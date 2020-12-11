<template>
  <div class="Cards">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      success-text="刷新成功"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <card
          v-for="item in list"
          :key="item.cardId"
          :info="item"
          :likedTrend="likedTrend"
          @reloadTrend="reloadTrend"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import Card from "./Card";
export default {
  name: "Cards",
  inject: ["reload"],
  props: ["list"],
  components: {
    Card,
  },
  data() {
    return {
      loading: false,
      finished: false,
      isLoading: false,
      likedTrend: [],
    };
  },
  methods: {
    async onLoad() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      this.$emit("cardsOnload");
      await this.getLikedTrend();
    },
    async onRefresh() {
      this.$emit("cardsOnRefresh");
      await this.getLikedTrend();
    },
    getLikedTrend() {
      if (this.$store.state.token != null) {
        this.axios
          .get("/jike-api/like/trend", {
            headers: {
              Authorization: this.$store.state.token,
            },
          })
          .then((resp) => {
            this.likedTrend = resp.data.data;
            this.isLoading = false;
            this.finished = true;
          });
      }
    },
    reloadTrend() {
      this.$emit("reloadTrend");
      this.getLikedTrend();
    },
  },
};
</script>

<style>
</style>