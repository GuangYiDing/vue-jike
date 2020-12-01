<template>
  <div class="Trends">
    <van-tabs swipeable>
      <van-tab title="动态广场">
        <Cards />
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
export default {
  name: "Trends",
  components: {
    Tabbar,
    Cards,
  },
};
</script>

<style>
</style>