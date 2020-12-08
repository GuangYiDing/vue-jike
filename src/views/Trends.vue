<template>
  <div class="Trends">
    <van-tabs swipeable color="#1989fa">
      <van-tab title="动态广场">
        <Cards :list="list" @cardsOnload="onload" @cardsOnRefresh="onRefresh" />
      </van-tab>
      <van-tab title="推荐"></van-tab>
    </van-tabs>
    <footer>
      <Tabbar />
    </footer>
  </div>
</template>

<script>
import Tabbar from "../components/Public/Tabbar";
import Cards from "../components/Trends/Cards";
import Iurl from "../axios/constants";
export default {
  name: "Trends",
  components: {
    Tabbar,
    Cards,
  },
  data() {
    return {
      list: [],
    };
  },
  methods: {
    onload() {
      this.loadTrend();
    },
    async onRefresh() {
      await this.loadTrend();
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
      this.loadTrend();
    },
  },
};
</script>

<style>
</style>