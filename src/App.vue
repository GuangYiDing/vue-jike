<template>
  <div id="app">
    <keep-alive include="Trends,Friends">
      <!-- 需要缓存的视图组件 -->
      <router-view v-if="isRouterAlive"  :key="key"></router-view>
    </keep-alive>
  </div>
</template>

<script>
// import { Notification } from 'element-ui';
// import { Icon } from 'element-ui';
// import Vue from 'vue'
// Vue.use(Icon)
import Stomp from "stompjs";
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload,
    };
  },
  computed:{
    key(){
     return  this.$route.fullPath
    }
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  created() {
    this.stopF5Refresh();
    if (this.$store.state.token != null) this.connect();
  },
  destroyed() {
    this.disconnect();
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
    //webSocket连接成功后回调函数
    onConnected(frame) {
      console.log("Connected: " + frame);
      //绑定交换机exchange_pushmsg是交换机的名字rk_pushmsg是绑定的路由key
      var exchange =
        "/exchange/exchange_jike_msg/" + this.$store.state.token;
      //创建随机队列用上面的路由key绑定交换机,放入收到消息后的回调函数和失败的回调函数
      this.client.subscribe(exchange, this.responseCallback, this.onFailed);
      console.log(frame);


    },
    onFailed(frame) {
      console.log("Failed: " + frame);
    },
    responseCallback(frame) {
        //     Notification({
        //   title: '成功',
        //   message:frame.body,
        //   type: 'success'
        // });
      //接收到服务器推送消息，向服务器定义的接收消息routekey路由rk_recivemsg发送确认消息
      this.client.send(
        "/exchange/exchange_jike_msg_push/rk_recive_msg",
        { "content-type": "text/plain" },
        frame.body
      );
    },
    connect() {
      //这里填你rabbitMQ的连接ip地址直接替换localhost:15674就好其它的不用改
      this.client = Stomp.client("ws://localhost:15674/ws");
      //填写你rabbitMQ登录的用户名和密码
      var headers = {
        login: "admin",
        passcode: "a1519877813",
        //虚拟主机，默认“/”
        host: "/",
      };
      //创建连接,放入连接成功和失败回调函数
      console.log("创建一次连接");
      this.client.connect(headers, this.onConnected, this.onFailed);
    },
    disconnect() {
      this.client = Stomp.client("ws://localhost:15674/ws");
      this.client.disconnect(() => {
        console.log("stomp disconnected");
      });
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
  /* color: #2c3e50; */
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
.bule {
  background-color: rgb(25 137 250);
}
</style>
