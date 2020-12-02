<template>
  <div id="app">
    <keep-alive include="Trends,Friends">
      <!-- 需要缓存的视图组件 -->
      <router-view v-if="isRouterAlive"></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
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
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true));
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
  padding: 0;
  margin: 0;
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
