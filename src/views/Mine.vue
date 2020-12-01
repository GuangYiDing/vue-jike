<template>
  <div class="Mine">
    <Profile />
    <footer>
      <tabbar></tabbar>
    </footer>
  </div>
</template>

<script>
import Tabbar from "../components/Public/Tabbar";
import Profile from "../components/Mine/Profile";

export default {
  name: "Mine",
  components: {
    Tabbar,
    Profile,
  },
  methods: {},
  created() {
    
  },
};
</script>

<style>
.Mine {
  height: 100%;
}
</style>