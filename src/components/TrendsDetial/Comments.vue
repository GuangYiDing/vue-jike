<template>
  <div class="Comments">
    <!-- <div class="Hot-Comments" v-show="this.comments.length != 0">
      <h3>热门评论</h3>
      <Comment />
    </div> -->
    <div class="Latest-Comments">
      <h3>最新评论</h3>
      <Comment
        :comm="comm"
        v-for="comm in this.noParentComm"
        :key="comm.commId"
        :childComm="hasParentComm"
        :likedComm="likedComm"
        @replyToComm="replyTo"
        @reloadComm="reloadComm"
      />
      <van-divider v-show="this.noParentComm.length == 0"
        >暂无评论😪</van-divider
      >
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
  props: ["comments", "hasParentComm", "noParentComm"],
  inject: ["reload"],
  data() {
    return {
      likedComm: [],
    };
  },
  mounted() {
    this.getLikedComm();
  },
  methods: {
    replyTo(user) {
      this.$emit("replyToUser", user);
    },
    getLikedComm() {
      if (this.$store.state.token != null) {
        this.axios
          .get("/jike-api/like/comm", {
            headers: {
              Authorization: this.$store.state.token,
            },
          })
          .then((resp) => {
            this.likedComm = resp.data.data;
          });
      }
    },
    reloadComm() {
      this.$emit("reloadComm");
      this.getLikedComm();
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