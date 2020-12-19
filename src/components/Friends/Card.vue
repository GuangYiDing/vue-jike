<template>
  <div class="container">
    <div class="avatar">
      <img :src="info.userAvatar" @click="goProfile(info.id)" />
    </div>
    <div class="user">
      <div class="name">{{ info.userName }}</div>
      <span>{{ info.signature }}</span>
    </div>
    <div class="tags">
      <div class="gender" v-if="info.gender != null">
        <span v-if="info.gender == '男'">👦🏻</span>
        <span v-else>👧🏻</span>
      </div>
      <div class="astro" v-if="info.astro != null">
        <span> {{ info.astro }}</span>
      </div>
      <div class="emotion" v-if="info.emotion != null">
        <van-tag plain type="primary">{{ info.emotion }}</van-tag>
      </div>
    </div>
    <el-button
      round
      type="primary"
      @click="follwing(info.id)"
      v-if="!isFollowed"
      >关注TA</el-button
    >
    <el-button v-if="isFollowed" round @click="cancelFollwing(info.id)"
      >取消关注</el-button
    >
  </div>
</template>

<script>
export default {
  name: "SwiperCard",
  props: ["info", "isFollowing"],
  computed: {
    isFollowed() {
      for (var value of this.isFollowing) {
        if (value.id == this.info.id) return true;
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
    follwing(userId) {
      if (this.checkLogin()) {
        this.axios({
          method: "post",
          url: "/jike-api/follow",
          params: { followingUserId: userId },
          headers: {
            Authorization: this.$store.state.token,
          },
        }).then((resp) => {
          this.$toast(resp.data.message);
          this.$emit("reloadCard");
        });
      }
    },
    cancelFollwing(userId) {
      this.axios({
        method: "delete",
        url: "/jike-api/follow",
        params: { cancelFollowingUserId: userId },
        headers: {
          Authorization: this.$store.state.token,
        },
      }).then((resp) => {
        this.$toast(resp.data.message);
        this.$emit("reloadCard");
      });
    },
    goProfile(userId) {
      this.$router.push({
        path: `/Others/${userId}`,
      });
      event.stopPropagation();
    },
  },
};
</script>

<style>
.container {
  width: 260px;
  height: 370px;
  border-radius: 15px;
  margin: 30px auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.container .avatar {
  margin: 20px auto;
}
.container .avatar img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.container .user {
  margin: 12px 0px;
}
.container .user span {
  font-size: 13px;
  color: #8e8e8e8e;
}
.container .tags {
  display: flex;
  justify-content: center;
}
.container .tags div {
  padding: 6px;
}
.container .tags .astro {
  color: #8e8e8e8e;
  line-height: 29px;
  font-size: 16px;
}
</style>