<template>
  <div id="app">
    <keep-alive>
      <!-- 需要缓存的视图组件 -->
      <router-view v-if="$route.meta.keepAlive"> </router-view>
    </keep-alive>
    <!-- 不需要缓存的视图组件 -->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  created() {
    this.stopF5Refresh();
  },
  methods: {
    stopF5Refresh() {
      document.onkeydown = function (e) {
        var evt = window.event || e;
        var code = evt.keyCode || evt.which;
        //屏蔽F1---F12
        if (code > 111 && code < 124) {
          if (evt.preventDefault) {
            evt.preventDefault();
          } else {
            evt.keyCode = 0;
            evt.returnValue = false;
          }
        }
      };
      //阻止后退的所有动作，包括 键盘、鼠标手势等产生的后退动作。
      // history.pushState(null, null, window.location.href);
      // window.addEventListener("popstate", function () {
      //   history.pushState(null, null, window.location.href);
      // });
    },
  },
};
</script>

<style>
html,
body {
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 800px;
  height: 100%;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.van-nav-bar {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
}
</style>
