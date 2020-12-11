<template>
  <div class="Friends">
    <van-nav-bar title="动态" />
    <Cards
    v-if="this.$store.state.token!=null"
      :list="followingUserTrends"
      @cardsOnload="onload"
      @cardsOnRefresh="onRefresh"
      @reloadTrend="reloadTrend"
    />
    <van-empty v-if="followingUserTrends.length == 0" image="search" description="你所关注的用户动态将在此展示" />
    <footer>
      <tabbar></tabbar>
    </footer>
  </div>
</template>

<script>
import Tabbar from "../components/Public/Tabbar";
import Cards from "../components/Trends/Cards";
import Iurl from "../axios/constants";
export default {
  name: "Friends",
  components: {
    Tabbar,
    Cards,
  },
  data() {
    return {
      followingUserTrends: [],
    };
  },
  mounted() {
    this.getFollowingUserTrends();
  },
  methods: {
    getFollowingUserTrends() {
      if (this.$store.state.token!=null) {
      this.axios
        .get("/jike-api/trend/following", {
          headers: {
            Authorization: this.$store.state.token,
          },
        })
        .then((resp) => {
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
          this.followingUserTrends = list;
        });       
      }
          this.$toast.clear();
    },
    onload() {
      this.getFollowingUserTrends();
    },
    async onRefresh() {
      await this.getFollowingUserTrends();
    },
    reloadTrend() {
      this.getFollowingUserTrends();
    },
  },
};
</script>

<style>
</style>