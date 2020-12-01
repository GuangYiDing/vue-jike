<template>
  <div class="Cards">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <card v-for="item in list" :key="item.cardId" :info="item" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import Iurl from "../../axios/constants";
import Card from "./Card";
export default {
  name: "Cards",
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
    };
  },
  methods: {
    onLoad() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
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
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
      }, 1000);
    },
  },
};
</script>

<style>
</style>