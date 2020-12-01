<template>
  <div class="Emoji">
    <van-tabs ref="tabs" :lazy-render="true" color="#1989fa">
      <van-tab title="Alu">
        <van-swipe indicator-color="#1989fa" :lazy-render="true" ref="swipe">
          <van-swipe-item
            v-for="value in Math.ceil(aluList.length / capacity)"
            :key="value"
          >
            <div class="my-container">
              <div
                class="item"
                v-for="item in aluList.slice(
                  (value - 1) * capacity,
                  (value - 1) * capacity + capacity
                )"
                :key="item.name"
              >
                <div v-lazy-container="{ selector: 'van-image' }">
                  <van-image :src="item.src" @click="chooseEmoji(item.src)">
                    <template v-slot:loading> <van-loading /> </template
                  ></van-image>
                </div>
                <div class="desc">{{ item.name }}</div>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </van-tab>
      <van-tab title="Ac娘">
        <van-swipe indicator-color="#1989fa">
          <van-swipe-item
            v-for="value in Math.ceil(acList.length / capacity)"
            :key="value"
          >
            <div class="my-container">
              <div
                class="item"
                v-for="item in acList.slice(
                  (value - 1) * capacity,
                  (value - 1) * capacity + capacity
                )"
                :key="item.name"
              >
                <div v-lazy-container="{ selector: 'van-image' }">
                  <van-image :src="item.src" @click="chooseEmoji(item.src)">
                    <template v-slot:loading> <van-loading /> </template
                  ></van-image>
                </div>
                <div class="desc"></div>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Iurl from "../../axios/constants";
import { mapState } from "vuex";
export default {
  name: "Emoji",
  props: {
    capacity: {
      type: Number,
      default: 20,
    },
    visible: {
      type: Boolean,
    },
  },
  computed: {
    ...mapState({
      aluList: (state) => state.emojiList.aluList,
      acList: (state) => state.emojiList.acList,
    }),
  },
  watch: {
    // 修复隐藏带来的tabs 和swipe 高度消失的问题
    visible() {
      if (this.visible) {
        this.$refs.swipe.resize();
        this.$refs.tabs.resize();
      }
    },
  },
  data() {
    return {
      // active: "1",
    };
  },
  mounted() {
    // 并发获取
    this.axios.all([this.loadAlu(), this.loadAc()]).then();
  },
  methods: {
    // 通知父组件选中的表情
    chooseEmoji(src) {
      this.$emit("addEmoji", src);
    }, // 加载alu 表情包
    loadAlu() {
      let path = "/alu";
      let getUrl = "/gitee" + path;
      if (this.aluList.length == 0) {
        this.axios
          .get(getUrl, {
            headers: {
              Authorization: "Bearer " + Iurl.access_token,
            },
          })
          .then((response) => {
            response.data.forEach((element) => {
              this.aluList.push({
                name: element.name.split(".")[0],
                src: element.download_url,
              });
              this.$store.commit("setAluList", {
                aluList: this.aluList,
              });
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    // 加载AC 表情包
    loadAc() {
      let path = "/ac";
      let getUrl = "/gitee" + path;
      if (this.aluList.length == 0) {
        this.axios
          .get(getUrl, {
            headers: {
              Authorization: "Bearer " + Iurl.access_token,
            },
          })
          .then((response) => {
            response.data.forEach((element) => {
              this.acList.push({
                src: element.download_url,
              });
              this.$store.commit("setAcList", {
                acList: this.acList,
              });
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style >
.my-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px 0px;
  background: #fff;
}
.my-container .item {
  width: 60px;
  text-align: center;
}
.my-container .item .van-image {
  width: 60px;
  height: 60px;
}
.my-container .item .van-image img {
  height: 100%;
}
.my-container .item .desc {
  font-size: 14px;
  height: 20px;
  line-height: 20px;
}
</style>