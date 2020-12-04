<template>
  <div class="JTabBar">
    <van-tabbar route v-model="active">
      <van-tabbar-item replace to="/friends" icon="friends-o"
        >动态</van-tabbar-item
      >
      <van-tabbar-item replace to="/" icon="orders-o">推荐</van-tabbar-item>
      <van-tabbar-item replace to="/post" icon="plus">发布</van-tabbar-item>
      <van-tabbar-item replace to="/messages" icon="chat-o" badge="99+"
        >通知</van-tabbar-item
      >
      <van-tabbar-item replace icon="user-circle-o" @click="checkLogin">
        我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Tabbar",
  data() {
    return {
      active: 2,
      show: false,
    };
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
        this.$router.push("/Mine");
      }
    },
  },
};
</script>

<style>
.JTabBar {
  height: 50px;
  position: fixed;
  bottom: 0;
}
</style>