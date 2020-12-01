<template>
  <div class="Messages">
    <van-nav-bar title="我的通知" />
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <Notify />
      <Notify />
      <Notify />
    </van-pull-refresh>

    <footer>
      <tabbar></tabbar>
    </footer>
  </div>
</template>

<script>
import Tabbar from "../components/Public/Tabbar";
import Notify from "../components/Message/Notify";

export default {
  name: "Messages",
  components: {
    Tabbar,
    Notify,
  },
  data() {
    return {
      count: 0,
      isLoading: false,
    };
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.$toast.success("刷新成功");
        this.isLoading = false;
        this.count++;
      }, 1000);
    },
  },
};
</script>

<style>
.Messages {
  height: 100%;
}
.van-pull-refresh {
  height: 100%;
}
</style>