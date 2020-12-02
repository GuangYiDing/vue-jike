<template>
  <div class="TrendsDetial">
    <div class="top">
      <van-nav-bar
        title="即刻动态"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="mid">
      <Content :content="detailContent" @replyTrend="replyTo" />
      <Comments
        @replyToUser="replyTo"
        :noParentComm="noParentComm"
        :hasParentComm="hasParentComm"
      />
    </div>
    <div class="bot">
      <Reply :replyToUserName="replyPlaceHolder" @readyToRely="postReply" />
    </div>
  </div>
</template>

<script>
import Content from "../components/TrendsDetial/Content";
import Comments from "../components/TrendsDetial/Comments";
import Reply from "../components/TrendsDetial/Reply";
import Iurl from "../axios/constants";
export default {
  name: "TrendsDetial",
  components: {
    Content,
    Comments,
    Reply,
  },
  inject: ["reload"],
  data() {
    return {
      detailContent: {},
      noParentComm: [],
      hasParentComm: [],
      replyUserInfo: {},
      replyPlaceHolder: "",
    };
  },
  mounted() {
    this.loadContent();
    this.loadComments();
  },
  methods: {
    onClickLeft() {
      this.$router.push("/");
    },
    loadContent() {
      this.axios
        .get("/jike-api/trend", {
          params: { trendId: this.$route.params.id },
        })
        .then((resp) => {
          let item = resp.data.data;
          let imageStr = item.images.slice(1, item.images.length - 1);
          let imagesArr = imageStr.split(",");
          let perviewArr = imagesArr.map((i) => {
            return (i = Iurl.perview + i);
          });
          item.images = perviewArr;
          item.userAvatar = Iurl.perview + item.userAvatar;
          item.zoneAvatar = Iurl.perview + item.zoneAvatar;
          this.detailContent = item;
          this.detailContent.description =
            item.description.length > 15
              ? item.description.slice(0, 12) + "..."
              : item.description;
          // 回复框占位符默认动态主名
          this.replyPlaceHolder = this.detailContent.userName;
        });
    },
    async loadComments() {
      await this.axios
        .get("/jike-api/comm", {
          params: { trendId: this.$route.params.id },
        })
        .then((resp) => {
          let detailComments = resp.data.data.map((item) => {
            if (item.images != null) {
              let imagesArr = item.images.split(",");
              let perviewArr = imagesArr.map((i) => {
                return (i = Iurl.perview + i);
              });
              item.images = perviewArr;
            }
            item.userAvatar = Iurl.perview + item.userAvatar;
            item.zoneAvatar = Iurl.perview + item.zoneAvatar;
            return item;
          });
          this.noParentComm = detailComments.filter(function (item) {
            return item.parentId == 0;
          });
          this.hasParentComm = detailComments.filter(function (item) {
            return item.parentId != 0;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 解决回复动态还是回复评论的问题
    replyTo(payload) {
      if (payload.replyTrend === true) {
        this.replyUserInfo = {};
        this.replyPlaceHolder = this.detailContent.userName;
      } else {
        this.replyUserInfo = payload;
        this.replyPlaceHolder = payload.userName + payload.commId;
        this.$toast("回复" + payload.userName + "的评论");
      }
    },
    postReply(replyContentPayload) {
      // 判断回复的是动态还是评论还是子评论,如果为子评论需要将父节点修改为子评论的父节点
      // let parentId = 0;
      // if (this.replyUserInfo.commId == undefined) {
      //   parentId = 0;
      // }
      // if (this.replyUserInfo.parentId == 0) {
      //   parentId = this.replyUserInfo.commId;
      // } else {
      //   parentId = this.replyUserInfo.parentId;
      // }
      this.axios
        .post(
          "/jike-api/comm",
          JSON.stringify({
            trendId: this.$route.params.id,
            content: replyContentPayload.content,
            images: replyContentPayload.images,
            parentId:
              this.replyUserInfo.commId == undefined
                ? 0
                : this.replyUserInfo.parentId == 0
                ? this.replyUserInfo.commId
                : this.replyUserInfo.parentId,
          })
        )
        .then((resp) => {
          this.$toast.success(resp.data);
          this.reload();
        })
        .catch((err) => {
          this.$toast.fail(err);
          this.reload();
        });
    },
  },
};
</script>

<style>
.TrendsDetial {
  height: 100%;
  display: flex;
  flex-flow: column;
}
.TrendsDetial .top {
  position: sticky;
  top: 0;
  z-index: 1;
}
.TrendsDetial .mid {
  flex: 1 1 auto;
}
.TrendsDetial .bot {
  position: sticky;
  bottom: 0;
}
</style>