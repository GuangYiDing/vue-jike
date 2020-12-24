<template>
  <div class="RecommUser">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="slogan">
        <h2>记录我,遇见你</h2>
        <span>关注其他用户后,他们的动态会在动态中展示</span>
      </div>
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide v-for="item in infos" :key="item.id">
          <SwiperCard
            :info="item"
            :isFollowing="isFollowing"
            @reloadCard="reloadCard"
          />
        </swiper-slide>
      </swiper>
    </van-pull-refresh>
  </div>
</template>

<script>
import SwiperCard from "../Friends/Card";
import Iurl from "../../axios/constants";
export default {
  name: "RecommUser",
  components: {
    SwiperCard,
  },
  data() {
    return {
      swiperOptions: {
        effect: "coverflow",
        centeredSlides: true,
        spaceBetween: "2%",
        slidesPerView: 1.5,
        loop: false,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
      },
      infos: [],
      isFollowing: [],
      isLoading: false,
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },
  mounted() {
    this.getUserInfo();
    if (this.$store.state.token != null) {
      this.getFollowing();
    }
  },
  methods: {
    // 根据生日的月份和日期，计算星座。
    getAstro(month, day) {
      var s = "魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
      var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
      return s.substr(month * 2 - (day < arr[month - 1] ? 2 : 0), 2) + "座";
    },
    getUserInfo() {
      this.axios.get("/jike-api/users/info/cards").then((resp) => {
        this.infos = resp.data.data;
        this.infos.forEach((item) => {
          item.userAvatar = Iurl.perview + item.userAvatar;
          if (item.birthday != null) {
            item.astro = this.getAstro(
              new Date(item.birthday).getMonth() + 1,
              new Date(item.birthday).getDate()
            );
          }
        });
      });
    },
    getFollowing() {
      this.axios
        .get("/jike-api/follow/Aing", {
          headers: {
            Authorization: this.$store.state.token,
          },
        })
        .then((resp) => {
          this.isFollowing = resp.data.data;
        });
    },
    async onRefresh() {
      await this.getUserInfo();
      if (this.$store.state.token != null) {
        await this.getFollowing();
      }
      this.isLoading = false;
    },

    reloadCard() {
      this.getUserInfo();
      if (this.$store.state.token != null) {
        this.getFollowing();
      }
    },
  },
};
</script>

<style>
.RecommUser .slogan {
  text-align: center;
  margin: 50px 0px;
}
.RecommUser .slogan span {
  color: #8e8e8e8e;
}

.RecommUser .swiper-container {
  width: 100%;
  height: 100%;
}
.RecommUser .swiper-slide {
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
.RecommUser .swiper-slide-active,
.swiper-slide-duplicate-active {
  transform: scale(1);
}

.RecommUser .container {
  width: 260px;
  height: 370px;
  border-radius: 15px;
  margin: 30px auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.RecommUser .container .avatar {
  margin: 20px auto;
}
.RecommUser .container .user {
  margin: 12px 0px;
}
.RecommUser .container .user span {
  font-size: 13px;
  color: #8e8e8e8e;
}
</style>