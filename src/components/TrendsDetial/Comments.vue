<template>
  <div class="Comments">
    <div class="Hot-Comments" v-show="hotList.length != 0">
      <h3>热门评论</h3>
      <Comment :info="info" @replyUserName="replyTo" />
    </div>
    <div class="Latest-Comments">
      <h3>最新评论</h3>
      <Comment :info="comm" v-for="comm in commList" :key="comm.commId" />
      <van-divider v-show="commList.length == 0">暂无评论😪</van-divider>
    </div>
  </div>
</template>

<script>
import Comment from "./Comment";
export default {
  name: "Comments",
  components: {
    Comment,
  },
  data() {
    return {
      info: {
        avatar: "https://img.yzcdn.cn/vant/cat.jpeg",
        user: "马老师",
        time: "2天前",
        like: 12,
        content: "年轻人不讲武德",
        hasReply: true,
        replys: [
          {
            user: "Max丶海贼1号",
            content:
              "就这?就这?就这?就这?就这?就这?就这?就这?就这?就这?就这?就这?就这?",
          },
          {
            user: "Max丶海贼2号",
            content: "就这?",
          },
        ],
      },
      info2: {
        avatar: "https://img.yzcdn.cn/vant/cat.jpeg",
        user: "马老师",
        time: "2天前",
        like: 12,
        content: "年轻人不讲武德",
        hasReply: false,
        replys: [
          {
            user: "Max丶海贼",
            content: "就这?",
          },
          {
            user: "Max丶海贼",
            content: "就这?",
          },
        ],
      },
      commList: [],
      hotList: [],
    };
  },
  computed: {
    noParentComm: function () {
      return this.data.list.filter(function (item) {
        return item.pid == 0;
      });
    },
    hasParentComm: function () {
      return this.data.list
        .filter(function (item) {
          return item.pid != 0;
        })
        .reverse();
    },
  },
  mounted() {
    this.getComm();
  },
  methods: {
    replyTo(name) {
      this.$emit("replyUserName", name);
    },
    getComm() {
      this.axios
        .get("/jike-api/comm", {
          params: { trendId: this.$route.params.id },
        })
        .then((resp) => {
          this.commList = resp.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
.Comments .Hot-Comments h3,
.Comments .Latest-Comments h3 {
  padding: 12px;
  border-bottom: 3px solid #fafafa;
}
</style>