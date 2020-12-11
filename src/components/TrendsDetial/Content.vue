<template>
  <div class="Content">
    <header @click="goUserInfo">
      <div class="avatar fl">
        <van-image
          round
          width="40px"
          height="40px"
          :src="this.content.userAvatar"
        >
          <template v-slot:loading> <van-loading /> </template
        ></van-image>
      </div>
      <div class="userInfo">
        <div class="userName">
          {{ this.content.userName }}
        </div>
        <span>{{ content.signature }}</span>
      </div>
      <div class="follow fr">
       <el-button
      round
      size="small"
      type="primary"
      @click="follwing()"
      v-if="!isFollowed"
      >关注TA</el-button>
    <el-button
      v-if="isFollowed"
         size="small"
      round
      @click="cancelFollwing()"
      >取消关注</el-button>
      </div>
    </header>
    <div class="desc">{{ this.content.content }}</div>
    <div class="images">
      <van-image
        :src="image"
        @click="viewImage"
        v-for="image in content.images"
        :key="image"
      ></van-image>
    </div>
    <div class="time">
      <span> {{ content.createTime }} </span>
    </div>
    <div class="zone">
      <div class="zone-img">
        <van-image width="40" height="40" :src="content.zoneAvatar">
          <template v-slot:loading> <van-loading /> </template
        ></van-image>
      </div>
      <div class="middle">
        <div class="zone-title">{{ content.zoneName }}</div>
        <div class="zone-title-desc van-ellipsis">
          {{ content.description }}
        </div>
      </div>
      <div class="join fr">
        <!-- <el-button size="mini" round>加入</el-button> -->
      </div>
    </div>
    <footer>
      <div class="like">
        <van-icon name="like" v-if="isLiked" color="red" @click="idontlikeit" />
        <van-icon name="like-o" v-if="!isLiked" @click="ilikeit" />
        <span>
          {{ content.likesCount }}
        </span>
      </div>
      <div class="comment-count" @click="replyTrend">
        <van-icon name="comment-o" />
        <span>
          {{ content.commentsCount }}
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
export default {
  name: "Content",
  props: ["content", "likedTrend","isFollowing"],
  computed: {
    isLiked() {
      for (var value of this.likedTrend) {
        if (value.trendId == this.content.trendId) return true;
      }
      return false;
    },
     isFollowed() {
      for (var value of this.isFollowing) {
        if (value == this.content.userId) return true;
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
    viewImage() {
      ImagePreview(this.content.images);
    },
    replyTrend() {
      this.$emit("replyTrend", {
        replyTrend: true,
        userName: this.content.userName,
      });
      this.$toast("回复" + this.content.userName + "的动态");
    },
    loginCheck() {
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
      }
      return true;
    },
    ilikeit() {
      if (this.loginCheck()) {
        this.axios
          .post(
            "/jike-api/like/trend",
            JSON.stringify({ trendId: this.content.trendId }),
            {
              headers: {
                Authorization: this.$store.state.token,
              },
            }
          )
          .then((resp) => {
            if (resp.data.code == 200) {
              this.$toast({
                icon: "like-o",
                message: "好家伙",
              });
              this.$emit("reloadContent");
            }
          })
          .catch((err) => {
            this.$toast.fail(err.response.data.message);
          });
      }
    },
    idontlikeit() {
      event.stopPropagation();
      if (this.loginCheck()) {
        this.axios({
          method: "delete",
          url: "/jike-api/like/trend",
          params: { trendId: this.content.trendId },
          headers: { Authorization: this.$store.state.token },
        })
          .then((resp) => {
            if (resp.data.code == 200) {
              this.$toast({
                icon: "bulb-o",
                message: "👋 拜拜了您嘞",
              });
              this.$emit("reloadContent");
            }
          })
          .catch((err) => {
            this.$toast.fail(err.response.data.message);
          });
      }
    },
    goUserInfo() {
      if (this.$router.name != "Others") {
        var userId = this.content.userId;
        this.$router.push({
          path: `/Others/${userId}`,
        });
      }
      event.stopPropagation();
    },
     follwing() {
       event.stopPropagation();
       if(this.checkLogin()){
      this.axios({
        method: "post",
        url: "/jike-api/follow",
        params: { followingUserId: this.content.userId },
        headers: {
          Authorization: this.$store.state.token,
        },
      }).then((resp) => {
        this.$emit("reloadFollow")
        this.$toast(resp.data.message);
      });
       }
    },
    cancelFollwing() {
         event.stopPropagation();
      this.axios({
        method: "delete",
        url: "/jike-api/follow",
        params: { cancelFollowingUserId: this.content.userId },
        headers: {
          Authorization: this.$store.state.token,
        },
      }).then((resp) => {
        this.$emit("reloadFollow")
        this.$toast(resp.data.message);
      });
    },
  },
};
</script>

<style>
.Content {
  margin-top: 12px;
}
.Content header {
  height: 40px;
  padding: 12px;
}
.Content header .avatar {
  width: 40px;
  height: 40px;
  margin-right: 12px;
}
.Content header .userInfo {
  width: 200px;
  display: inline-block;
}
.Content header .userInfo span {
  display: inline-block;
  font-size: 12px;
  color: #9e9e9e;
}
.Content .desc {
  padding: 12px;
}
.Content .time {
  color: #9e9e9e;
  padding: 12px;
}
.Content .zone {
  width: 300px;
  margin: 0 auto;
  padding: 10px;
  box-shadow: 0px 1px 5px 0px rgb(0, 0, 0, 0.1);
  border-radius: 5px;
}
.Content .zone .zone-img {
  display: inline-block;
}
.Content .zone .middle {
  display: inline-block;
}
.Content .zone-img {
  display: inline-block;
  margin-right: 12px;
}
.Content .zone-title-desc {
  display: inline-block;
  font-size: 12px;
  color: #9e9e9e;
}
.Content .join .el-button {
  color: black;
}
.Content footer {
  display: flex;
  padding-left: 12px;
  padding-top: 12px;
}
.Content footer div {
  margin: 5px;
}
.images {
  padding: 12px;
}
.van-image img {
  border-radius: 5px;
}
</style>