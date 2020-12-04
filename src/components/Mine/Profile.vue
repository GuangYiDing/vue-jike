<template>
  <div class="Profile" @change="scaleBackground">
    <div class="top">
      <div class="one-line">
        <div class="avatar">
          <van-image :src="userInfo.userAvatar" width="60" height="60" round>
            <template v-slot:loading>
              <van-loading />
            </template>
          </van-image>
        </div>
        <div class="btn">
          <el-button plain size="mini" round>编辑资料</el-button>
        </div>
        <div class="setting">
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
      </div>

      <div class="nike">{{ userInfo.userName }}</div>
      <div class="signature">{{ userInfo.signature }}</div>
      <div class="follow">
        {{ userInfo.following }} <span> 关注 </span> | {{ userInfo.followed }}
        <span>被关注</span>
      </div>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script>
import Iurl from "../../axios/constants";
export default {
  name: "Profile",
  data() {
    return {
      showPopover: false,
      actions: [{ text: "注销" }],
      userInfo: {},
    };
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    scaleBackground() {
      console.log(window.onscroll());
    },
    onSelect(action) {
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
    },
    getUserInfo() {
      this.axios
        .get("/jike-api/users/info", {
          headers: {
            Authorization: this.$store.state.token,
          },
        })
        .then((resp) => {
          console.log(resp.data.data);
          this.userInfo = resp.data.data;
          this.userInfo.userAvatar = Iurl.perview + resp.data.data.avatar;
        });
    },
  },
};
</script>

<style>
.Profile {
  background-size: 100%;
}
.Profile .top {
  margin: 12px;
}
.Profile .top .one-line {
  display: flex;
}
.Profile .top .one-line .btn {
  display: flex;
  align-items: center;
}
.setting {
  flex: 1;
}
.setting i {
  line-height: 66px;
  /* margin-left: 60px; */
}
.setting span {
  position: relative;
  left: 65%;
}
.Profile .top .nike,
.Profile .top .follow {
  font-size: 900;
}
.Profile .top span {
  font-size: 12px;
}
.Profile .bottom {
  border-radius: 25px;
  position: relative;
  top: 20%;
  background-color: aliceblue;
}
.Profile .signature {
  color: #8e8e8e8e;
  font-size: 14px;
}
</style>