<template>
  <div class="container">
    <div class="avatar">
      <van-image width="100" height="100" round :src="info.avatar" />
    </div>
    <div class="user">
      <div class="name">{{ info.name }}</div>
      <span>{{ info.desc }}</span>
    </div>
    <div class="imgList">
      <van-image
        v-for="item in info.imgList"
        :key="item.src"
        width="50px"
        height="50px"
        :src="item.src"
      />
    </div>
    <el-button round type="primary" id="followBtn">关注TA</el-button>
  </div>
</template>

<script>
export default {
  name: "SwiperCard",
  props: ["info"],
};
</script>

<style>
.container {
  width: 260px;
  height: 370px;
  border-radius: 15px;
  margin: 30px auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.container .avatar {
  margin: 20px auto;
}
.container .user {
  margin: 12px 0px;
}
.container .user span {
  font-size: 13px;
  color: #8e8e8e8e;
}

.container .imgList .van-image {
  margin: 8px;
}
.container #van-followBtn {
  margin: 20px;
  color: black;
  border: none;
  background: #f8e71c;
}
</style>