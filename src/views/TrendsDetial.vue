<template>
  <div class="TrendsDetial">
    <div class="top">
      <van-nav-bar
        title="即刻动态"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="mid">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <Content /> <Comments @replyUserName="replyTo" />
      </van-pull-refresh>
    </div>
    <div class="bot">
      <Reply />
    </div>
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
.TrendsDetial {
  height: 100%;
  display: flex;
  flex-flow: column;
}
.TrendsDetial .top {
  flex: 0 1 auto;
}
.TrendsDetial .mid {
  flex: 1 1 auto;
}
.TrendsDetial .bot {
  position: sticky;
  bottom: 0;
}
</style>