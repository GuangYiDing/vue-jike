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
import Iurl from "../../axios/constants";
import Card from "./Card";
export default {
  name: "Cards",
  inject: ["reload"],
  components: {
    Card,
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      count: 0,
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
      this.loadTrend();
      this.getLikedTrend();
    },
    async onRefresh() {
      await this.loadTrend();
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
    loadTrend() {
      this.axios.get("/jike-api/trend/recommend").then((resp) => {
        const list = resp.data.data;
        list.filter((item) => {
          let imageStr = item.images.slice(1, item.images.length - 1);
          let imagesArr = imageStr.split(",");
          let perviewArr = imagesArr.map((i) => {
            return (i = Iurl.perview + i);
          });
          item.images = perviewArr;
          item.userAvatar = Iurl.perview + item.userAvatar;
          item.zoneAvatar = Iurl.perview + item.zoneAvatar;
        });
        this.list = list;
        this.$store.commit("setRecommendList", this.list);
        this.$toast.clear();
        this.finished = true;
      });
    },
    reloadTrend() {
      this.$toast({
        icon: "like-o",
        message: "好家伙",
      });
      this.loadTrend();
      this.getLikedTrend();
    },
  },
};
</script>

<style>
</style>