<template>
  <div class="Content">
    <header>
      <div class="avatar fl">
        <van-image
          round
          width="40px"
          height="40px"
          :src="this.content.userAvatar"
        >
          <template v-slot:loading> <van-loading /> </template
        ></van-image>
      </div>
      <div class="userInfo">
        {{ this.content.userName }}
        <span>{{ content.signature }}</span>
      </div>
      <div class="follow fr">
        <el-button size="small" round type="primary">关注</el-button>
      </div>
    </header>
    <div class="desc">{{ this.content.content }}</div>
    <div class="images">
      <van-image
        :src="image"
        @click="viewImage"
        v-for="image in content.images"
        :key="image"
        width="80"
      ></van-image>
    </div>
    <div class="time">
      <span> {{ content.createTime }} </span>
    </div>
    <div class="zone">
      <div class="zone-img">
        <van-image width="40" height="40" :src="content.zoneAvatar">
          <template v-slot:loading> <van-loading /> </template
        ></van-image>
      </div>
      <div class="middle">
        <div class="zone-title">{{ content.zoneName }}</div>
        <div class="zone-title-desc van-ellipsis">
          {{ content.description }}
        </div>
      </div>
      <div class="join fr">
        <el-button size="mini" round>加入</el-button>
      </div>
    </div>
    <footer>
      <div class="like">
        <van-icon name="like-o" />
        <span>
          {{ content.likesCount }}
        </span>
      </div>
      <div class="comment-count" @click="replyTrend">
        <van-icon name="comment-o" />
        <span>
          {{ content.commentsCount }}
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
export default {
  name: "Content",
  props: ["content"],
  data() {
    return {};
  },
  methods: {
    viewImage() {
      ImagePreview(this.content.images);
    },
    replyTrend() {
      this.$emit("replyTrend", {
        replyTrend: true,
        userName: this.content.userName,
      });
      this.$toast("回复" + this.content.userName + "的动态");
    },
  },
};
</script>

<style>
.Content {
  margin-top: 12px;
}
.Content header {
  height: 40px;
  padding: 12px;
}
.Content header .avatar {
  width: 40px;
  height: 40px;
  margin-right: 12px;
}
.Content header .userInfo {
  width: 200px;
  display: inline-block;
}
.Content header .userInfo span {
  display: inline-block;
  position: relative;
  font-size: 12px;
  color: #9e9e9e;
  left: -34%;
  top: 20px;
}
.Content .desc {
  padding: 12px;
}
.Content .time {
  color: #9e9e9e;
  padding: 12px;
}
.Content .zone {
  width: 300px;
  margin: 0 auto;
  padding: 10px;
  box-shadow: 0px 1px 5px 0px rgb(0, 0, 0, 0.1);
  border-radius: 5px;
}
.Content .zone .zone-img {
  display: inline-block;
}
.Content .zone .middle {
  display: inline-block;
}
.Content .zone-img {
  display: inline-block;
  margin-right: 12px;
}
.Content .zone-title-desc {
  display: inline-block;
  font-size: 12px;
  color: #9e9e9e;
}
.Content .join .el-button {
  color: black;
}
.Content footer {
  display: flex;
  padding-left: 12px;
  padding-top: 12px;
}
.Content footer div {
  margin: 5px;
}
.images {
  padding: 12px;
}
.van-image img {
  border-radius: 5px;
}
</style>