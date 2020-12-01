<template>
  <div class="Content">
    <header>
      <div class="avatar fl">
        <van-image
          round
          width="40px"
          height="40px"
          :src="this.info.userAvatar"
        />
      </div>
      <div class="userInfo">
        {{ this.info.userName }}
        <span>{{ info.signature }}</span>
      </div>
      <div class="follow fr">
        <el-button size="small" round type="primary">关注</el-button>
      </div>
    </header>
    <div class="desc">{{ this.info.content }}</div>
    <div class="images">
      <van-image
        :src="image"
        @click="viewImage"
        v-for="image in info.images"
        :key="image"
        width="80"
      ></van-image>
    </div>
    <div class="time">
      <span> {{ info.createTime }} </span>
    </div>
    <div class="zone">
      <div class="zone-img">
        <van-image width="40" height="40" :src="info.zoneAvatar" />
      </div>
      <div class="middle">
        <div class="zone-title">{{ info.zoneName }}</div>
        <div class="zone-title-desc van-ellipsis">
          {{
            this.info.description.length > 15
              ? info.description.slice(0, 12) + "..."
              : info.description
          }}
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
          {{ info.likesCount }}
        </span>
      </div>
      <div class="comment-count">
        <van-icon name="comment-o" />
        <span>
          {{ info.commentsCount }}
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
export default {
  name: "Content",
  data() {
    return {
      info: {},
    };
  },
  mounted() {
    this.loadDetail();
  },
  created() {},
  methods: {
    loadDetail() {
      if (this.$store.state.recommendList.length > 0) {
        this.$store.state.recommendList.forEach((element) => {
          if (this.$route.params.id == element.trendId) {
            this.info = element;
          }
        });
      }
    },
    viewImage() {
      ImagePreview(this.info.images);
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
  left: -25%;
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
</style>