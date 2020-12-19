<template>
  <div class="Profile">
    <van-sticky>
      <van-nav-bar
        v-if="this.$route.name == 'Others'"
        title="信息"
        left-text="返回"
        left-arrow
        @click-left="
          () => {
            this.$router.go(-1);
          }
        "
      />
    </van-sticky>
    <div class="top">
      <div class="one-line">
        <div class="avatar">
          <van-image :src="userInfo.userAvatar" width="60" height="60" round>
            <template v-slot:loading>
              <van-loading />
            </template>
          </van-image>
        </div>

        <div class="setting" v-if="this.$route.name == 'Mine'">
          <van-popover
            v-model="showPopover"
            theme="dark"
            trigger="click"
            :actions="actions"
            @select="onSelect"
          >
            <template #reference>
              <van-icon name="setting-o" size="32" />
            </template>
          </van-popover>
        </div>
        <div class="follow" v-if="this.$route.name == 'Others'">
          <el-button
            round
            size="small"
            type="primary"
            @click="follwing()"
            v-if="!isFollowed"
            >关注TA</el-button
          >
          <el-button
            v-if="isFollowed"
            size="small"
            round
            @click="cancelFollwing()"
            >取消关注</el-button
          >
        </div>
      </div>
      <div class="nike">{{ userInfo.userName }}</div>
      <div class="signature">{{ userInfo.signature }}</div>
      <div class="follow">
        <strong @click="goFollowing"> {{ userInfo.following }}</strong>
        <span @click="goFollowing"> 关注 </span> |
        <strong @click="goFollowed">{{ userInfo.followed }}</strong>
        <span @click="goFollowed"> 被关注</span>
      </div>
    </div>
    <div class="bottom">
      <van-tabs v-model="activeTabs" color="#1989fa">
        <van-tab title="动态"
          ><Cards
            :list="list"
            @cardsOnload="onload"
            @cardsOnRefresh="onRefresh"
            @reloadTrend="reloadTrend" />
          <van-empty description="暂无动态" v-if="list.length == 0"
        /></van-tab>
        <van-tab title="档案"
          ><div class="record">
            <div class="title"><van-icon name="user-o" />基本信息</div>
            <div class="attr">
              性别
              <div class="value">{{ userProfile.gender }}</div>
            </div>
            <div class="attr">
              情感
              <div class="value">{{ userProfile.emotion }}</div>
            </div>
            <div class="attr">
              生日
              <div class="value">{{ userProfile.birthday }}</div>
            </div>
          </div></van-tab
        >
      </van-tabs>
    </div>
    <van-overlay :show="aboutVisivle" @click="aboutVisivle = false">
      <div class="wrapper" @click="aboutVisivle = false">
        CopyRight © 2020 XiaoDingSiRen
      </div>
    </van-overlay>
  </div>
</template>

<script>
import Iurl from "../../axios/constants";
import Cards from "../Trends/Cards";

export default {
  name: "Profile",
  components: { Cards },
  data() {
    return {
      showPopover: false,
      actions: [{ text: "编辑资料" }, { text: "注销" }, { text: "关于" }],
      userInfo: {},
      aboutVisivle: false,
      activeTabs: 0,
      list: [],
      userProfile: {},
      isFollowing: [],
    };
  },
  mounted() {
    this.getUserInfo();
    this.getProfile();
    this.getAtuhFollowing();
  },
  computed: {
    isFollowed() {
      for (var value of this.isFollowing) {
        if (value.id == this.$route.params.userId) return true;
      }
      return false;
    },
  },
  methods: {
    checkLogin() {
      if (this.$store.state.token == null) {
        this.$dialog
          .confirm({
            title: "哦吼",
            message: "还没登录?来登录一起搞事吧😎~",
            confirmButtonText: "去登录",
            cancelButtonText: "我才不",
          })
          .then(() => {
            this.$router.push("/Login");
          })
          .catch(() => {
            return false;
          });
        return false;
      } else {
        return true;
      }
    },
    onSelect(action) {
      if (action.text == "编辑资料") {
        this.$router.push("/Personal");
      }
      if (action.text == "注销") {
        this.axios
          .get("/jike-api/users/logout", {
            headers: {
              Authorization: this.$store.state.token,
            },
          })
          .then(() => {
            this.$toast.success("注销成功");
            this.$store.commit("setToken", null);
            this.$router.push("/");
            location.reload();
          })
          .catch((err) => {
            this.$toast.fail(err.message);
          });
      }
      if (action.text == "关于") {
        this.aboutVisivle = true;
      }
    },
    getUserInfo() {
      if (this.$route.name == "Mine") {
        this.axios
          .get("/jike-api/users/info", {
            headers: {
              Authorization: this.$store.state.token,
            },
          })
          .then((resp) => {
            this.userInfo = resp.data.data;
            this.userInfo.userAvatar = Iurl.perview + resp.data.data.avatar;
            $(".top").css(
              "background-image",
              "url(" + Iurl.perview + resp.data.data.cover + ")"
            );
          });
      } else {
        this.axios
          .get("/jike-api/users/info/others", {
            params: { userId: this.$route.params.userId },
          })
          .then((resp) => {
            console.log(resp.data.data);
            this.userInfo = resp.data.data;
            this.userInfo.userAvatar = Iurl.perview + resp.data.data.avatar;
            $(".top").css(
              "background-image",
              "url(" + Iurl.perview + resp.data.data.cover + ")"
            );
          });
      }
    },
    getProfile() {
      if (this.$route.name == "Mine") {
        this.axios
          .get("/jike-api/users/personal", {
            headers: { Authorization: this.$store.state.token },
          })
          .then((resp) => {
            this.userProfile = resp.data.data;
            if (this.userProfile.gender == null) {
              this.userProfile.gender = "是个秘密";
            }
            if (this.userProfile.birthday == null) {
              this.userProfile.birthday = "是个秘密";
            }
            if (this.userProfile.emotion == null) {
              this.userProfile.emotion = "是个秘密";
            }
          });
      } else {
        this.axios
          .get("/jike-api/users/personal/others", {
            params: { userId: this.$route.params.userId },
          })
          .then((resp) => {
            this.userProfile = resp.data.data;
            if (this.userProfile.gender == null) {
              this.userProfile.gender = "是个秘密";
            }
            if (this.userProfile.birthday == null) {
              this.userProfile.birthday = "是个秘密";
            }
            if (this.userProfile.emotion == null) {
              this.userProfile.emotion = "是个秘密";
            }
          });
      }
    },
    onload() {
      this.loadTrend();
    },
    async onRefresh() {
      await this.loadTrend();
    },
    loadTrend() {
      if (this.$route.name == "Mine") {
        this.axios
          .get("/jike-api/trend/personal", {
            headers: {
              Authorization: this.$store.state.token,
            },
          })
          .then((resp) => {
            const list = resp.data.data;
            list.filter((item) => {
              if (item.images.length > 3) {
                let imageStr = item.images.slice(1, item.images.length - 1);
                let imagesArr = imageStr.split(",");
                let perviewArr = imagesArr.map((i) => {
                  return (i = Iurl.perview + i);
                });
                item.images = perviewArr;
              } else {
                item.images = [];
              }
              item.userAvatar = Iurl.perview + item.userAvatar;
              item.zoneAvatar = Iurl.perview + item.zoneAvatar;
            });
            this.list = list;
            this.$toast.clear();
            this.finished = true;
          });
      } else {
        this.axios
          .get("/jike-api/trend/others", {
            params: { userId: this.$route.params.userId },
          })
          .then((resp) => {
            const list = resp.data.data;
            list.filter((item) => {
              if (item.images.length > 3) {
                let imageStr = item.images.slice(1, item.images.length - 1);
                let imagesArr = imageStr.split(",");
                let perviewArr = imagesArr.map((i) => {
                  return (i = Iurl.perview + i);
                });
                item.images = perviewArr;
              } else {
                item.images = [];
              }
              item.userAvatar = Iurl.perview + item.userAvatar;
              item.zoneAvatar = Iurl.perview + item.zoneAvatar;
            });
            this.list = list;
            this.$toast.clear();
            this.finished = true;
          });
      }
    },
    reloadTrend() {
      this.loadTrend();
    },
    goFollowing() {
      if (this.$route.name == "Mine") {
        this.$router.push({
          path: `/Following/${this.userInfo.id}`,
        });
      } else {
        this.$router.push({
          path: `/Following/${this.$route.params.userId}`,
        });
      }
    },
    goFollowed() {
      if (this.$route.name == "Mine") {
        this.$router.push({
          path: `/Followed/${this.userInfo.id}`,
        });
      } else {
        this.$router.push({
          path: `/Followed/${this.$route.params.userId}`,
        });
      }
    },
    follwing() {
      if (this.checkLogin()) {
        this.axios({
          method: "post",
          url: "/jike-api/follow",
          params: { followingUserId: this.$route.params.userId },
          headers: {
            Authorization: this.$store.state.token,
          },
        }).then((resp) => {
          this.$toast(resp.data.message);
          this.getAtuhFollowing();
          this.getUserInfo();
        });
      }
    },
    cancelFollwing() {
      this.axios({
        method: "delete",
        url: "/jike-api/follow",
        params: { cancelFollowingUserId: this.$route.params.userId },
        headers: {
          Authorization: this.$store.state.token,
        },
      }).then((resp) => {
        this.$toast(resp.data.message);
        this.getAtuhFollowing();
      });
    },
    getAtuhFollowing() {
      if (this.$store.state.token != null) {
        this.axios
          .get("/jike-api/follow/Aing", {
            headers: {
              Authorization: this.$store.state.token,
            },
          })
          .then((resp) => {
            this.isFollowing = resp.data.data;
          });
      }
    },
  },
};
</script>

<style>
.Profile {
  color: #000;
}
.Profile .top {
  padding: 12px 12px 12px 24px;
  height: 25vh;
  background-size: cover;
  background-image: url("https://gitee.com/xiaodingsiren/JikePic/raw/master/images/gcS0gSnipaste_2020-11-18_23-13-01.png");
}
.Profile .top div {
  margin: 6px 0px;
}
.Profile .top .one-line {
  display: flex;
  margin-top: 2vh;
  justify-content: space-between;
}
.Profile .top .one-line .btn {
  display: flex;
  align-items: center;
}
.Profile .top .one-line .setting {
  margin-right: 50px;
}
.Profile .top .one-line .setting i {
  line-height: 66px;
}
.Profile .top .one-line .follow {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.Profile .top .nike,
.Profile .top .follow strong {
  font-weight: 900;
}
.Profile .top span {
  font-size: 12px;
}
.Profile .bottom {
  border-radius: 25px;
  position: relative;
  top: 20%;
}
.Profile .signature {
  /* color: #8e8e8e8e; */
  font-size: 14px;
}
.Profile .wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #fff;
}
.Profile .record .attr,
.Profile .record .value {
  padding: 12px;
}

.Profile .record .attr,
.Profile .record .value {
  color: #8e8e8e8e;
}
.Profile .record .value {
  display: inline-block;
}
.Profile .record .title {
  font-weight: 900;
}
.Profile .record .title i {
  margin: 0 12px;
}
</style>