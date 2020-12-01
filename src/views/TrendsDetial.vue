<template>
  <div class="TrendsDetial">
    <van-nav-bar
      title="即刻动态"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <Content /> <Comments @replyUserName="replyTo" />
    </van-pull-refresh>
    <Reply />
  </div>
</template>

<script>
import Content from "../components/TrendsDetial/Content";
import Comments from "../components/TrendsDetial/Comments";
import Reply from "../components/TrendsDetial/Reply";
export default {
  name: "TrendsDetial",
  components: {
    Content,
    Comments,
    Reply,
  },
  data() {
    return {
      count: 0,
      isLoading: false,
    };
  },
 
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        this.count++;
      }, 1000);
    },
    replyTo(name) {
      return name;
    },
   
  },
};
</script>

<style>
</style>