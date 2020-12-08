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
    onLoad() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      this.$emit("cardsOnload");

      this.getLikedTrend();
    },
    async onRefresh() {
      this.$emit("cardsOnRefresh");
      this.getLikedTrend();
      this.isLoading = false;
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
          });
      }
    },
    reloadTrend() {
      this.$emit("reloadTrend");
      this.$toast({
        icon: "like-o",
        message: "好家伙",
      });
      this.getLikedTrend();
    },
  },
};
</script>

<style>
</style>