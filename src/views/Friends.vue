<template>
  <div class="Friends">
    <van-nav-bar title="动态" />
    <div class="slogan">
      <h2>记录我,遇见你</h2>
      <span>关注其他用户后,他们的动态会在此展示</span>
    </div>
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide v-for="item in infos" :key="item">
        <SwiperCard :info="item" />
      </swiper-slide>
    </swiper>
    <footer>
      <tabbar></tabbar>
    </footer>
  </div>
</template>

<script>
import Tabbar from "../components/Public/Tabbar";
import SwiperCard from "../components/Friends/Card";

export default {
  name: "Friends",
  components: {
    Tabbar,
    SwiperCard,
  },
  data() {
    return {
      swiperOptions: {
        effect: "coverflow",
        centeredSlides: true,
        spaceBetween: "2%",
        slidesPerView: 1.5,
        loop: true,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
      },
      infos: [
        {
          avatar: "https://img.yzcdn.cn/vant/cat.jpeg",
          name: "马老师",
          desc: "年轻人不讲武德",
          imgList: [
            { src: "https://img.yzcdn.cn/vant/cat.jpeg" },
            { src: "https://img.yzcdn.cn/vant/cat.jpeg" },
            { src: "https://img.yzcdn.cn/vant/cat.jpeg" },
          ],
        },
        {
          avatar: "https://img.yzcdn.cn/vant/cat.jpeg",
          name: "马老师",
          desc: "年轻人不讲武德",
          imgList: [
            { src: "https://img.yzcdn.cn/vant/cat.jpeg" },
            { src: "https://img.yzcdn.cn/vant/cat.jpeg" },
            { src: "https://img.yzcdn.cn/vant/dog.jpeg" },
          ],
        },
      ],
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },
  mounted() {
    console.log("Current Swiper instance object", this.swiper);
  },
};
</script>

<style>
.Friends .slogan {
  text-align: center;
  margin: 50px 0px;
}
.Friends .slogan span {
  color: #8e8e8e8e;
}

.Friends .swiper-container {
  width: 100%;
  height: 100%;
}
.Friends .swiper-slide {
  width: 80%;
  text-align: center;
  font-size: 18px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 300ms;
  transform: scale(0.9);
}
.Friends .swiper-slide-active,
.swiper-slide-duplicate-active {
  transform: scale(1);
}

.Friends .container {
  width: 260px;
  height: 370px;
  border-radius: 15px;
  margin: 30px auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.Friends .container .avatar {
  margin: 20px auto;
}
.Friends .container .user {
  margin: 12px 0px;
}
.Friends .container .user span {
  font-size: 13px;
  color: #8e8e8e8e;
}
</style>