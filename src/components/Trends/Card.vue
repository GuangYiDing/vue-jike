<template>
  <div class="Card" :trentsId="info.trendsId" @click="goDetail(info.trendId)">
    <header>
      <div class="zone-img fl">
        <van-image width="40" height="40" :src="info.zoneAvatar">
          <template v-slot:loading> <van-loading /> </template
        ></van-image>
      </div>
      <div class="fl">
        <div class="zone-title">{{ info.zoneName }}</div>
        <div class="user">
          <van-image
            round
            class="avatar"
            width="20"
            height="20"
            :src="info.userAvatar"
          >
            <template v-slot:loading> <van-loading /> </template
          ></van-image>
          {{ info.userName }}
          <span>发布了</span>
        </div>
      </div>
    </header>
    <div class="content">
      {{ info.content }}
    </div>
    <van-image
      :src="image"
      @click="viewImage"
      v-for="image in info.images"
      :key="image"
      width="80"
    >
      <template v-slot:loading>
        <van-loading type="spinner" size="20" />
      </template>
    </van-image>
    <div class="comments" v-show="false">
      <div class="hot">
        <van-icon name="fire" />热评
        <div class="comments-like fr">{{ info.commentsLike }}赞</div>
      </div>
      <div class="comment">
        <span> {{ info.commentsUser }}:</span>
        {{ info.commentsContent }}
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
  name: "Card",
  props: ["info"],
  data() {
    return {};
  },
  computed: {
    images: () => {
      this.info.images;
    },
  },
  methods: {
    goDetail(id) {
      this.$router.push({
        path: `/TrendsDetial/${id}`,
      });
    },
    viewImage() {
      ImagePreview(this.info.images);
    },
  },
};
</script>

<style>
.Card {
  max-width: 800px;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.Card header {
  max-height: 50px;
  overflow: hidden;
}

.Card header .zone-img {
  border-radius: 5px;
  padding-right: 12px;
}
.Card header .zone-title {
  font-size: 14px;
}
.Card header .user {
  font-size: 12px;
}
.Card header .user span {
  color: gray;
  font-size: 10px;
}
.Card .content {
  margin: 20px 0px;
}
.Card .comments {
  background-color: #f7f8fa;
  border-radius: 5px;
  font-size: 12px;
  padding: 10px;
}
.Card .comments .comments-like {
  color: #9e9e9e;
}

.Card .comments span {
  color: black;
}
.Card footer {
  display: flex;
}
.Card footer div {
  margin: 10px 0;
  margin-right: 25px;
}
.van-image img {
  border-radius: 5px;
}
</style>