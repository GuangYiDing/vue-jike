<template>
  <div class="Post">
    <div class="top">
      <van-sticky>
        <van-nav-bar
          title="发布新动态"
          left-text="返回"
          right-text="发布"
          left-arrow
          @click-left="
            () => {
              this.$router.push('/');
            }
          "
          @click-right="postTrend"
        />
      </van-sticky>
    </div>
    <div class="mid">
      <van-field
        readonly
        clickable
        :value="zone"
        placeholder="选择发布的圈子"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" round position="bottom">
        <van-picker
          show-toolbar
          :columns="zomes"
          @cancel="showPicker = false"
          @confirm="zoneConfirm"
        />
      </van-popup>
      <van-field
        v-model="message"
        rows="4"
        autosize
        type="textarea"
        placeholder="分享你的想法..."
        show-word-limit
        @focus="emojiVisible = false"
        @blur="emojiVisible = true"
      />
      <div class="upload">
        <van-uploader
          v-model="fileList"
          :max-count="9"
          :max-size="1024 * 1024"
          @oversize="onOversize"
          multiple
        />
      </div>
    </div>
    <div class="bot">
      <van-divider>表情</van-divider>
      <Emoji :capacity="18" @addEmoji="emojiList" v-show="emojiVisible" />
    </div>
  </div>
</template>

<script>
import Iurl from "../axios/constants";
import Emoji from "../components/Post/Emoji";

export default {
  name: "Post",
  components: { Emoji },
  data() {
    return {
      fileList: [],
      message: "",
      active: 1,
      zone: "",
      showPicker: false,
      emojiVisible: true,
      zomes: [],
    };
  },
  mounted() {
    this.getZoneNames();
  },
  methods: {
    async postTrend() {
      if (this.postCheck()) {
        var arr = this.fileList;
        /**
         * Promiss.all()是一个专门处理promise数组的方法，
         * 当async标记的箭头函数返回一个promise对象时，
         * map方法得到的就是一个promise对象数组，
         * 然后我们将这个数组丢给Promise.all()去依次执行，
         * 然后只需要使用await去等待执行结果，
         * 就能保证后面的end在得到结果后才会被输出
         */
        // await this.axios.all(
        //   arr.map(async (item) => {
        //     if (item.url == undefined) await this.base64toURl(item);
        //   })
        // );
        // console.log("end");
        for (let i = 0, len = arr.length; i < len; i++) {
          if (arr[i].url == undefined) {
            await this.base64toURl(arr[i]);
          }
        }
        let images = [];
        this.fileList.map((item) => {
          images.push(item.url.split("/master")[1]);
        });
        this.axios
          .post(
            "/jike-api/trend",
            {
              images: images,
              content: this.message,
              zone: this.zone,
            },
            {
              headers: {
                Authorization: this.$store.state.token,
              },
            }
          )
          .then((resp) => {
            this.$toast.clear();
            this.$toast.success(resp.data);
            this.$router.push("/");
          })
          .catch((error) => {
            this.$toast.fail(error);
          });
      }
    },
    postCheck() {
      if (this.$store.state.token == "") {
        this.$dialog
          .confirm({
            title: "哦吼",
            message: "还没登录?来登录一起搞事吧😎~",
            confirmButtonText: "去登录",
            cancelButtonText: "我才不",
          })
          .then(() => {
            this.$router.push("/Login");
          })
          .catch(() => {
            return false;
          });
        return false;
      }
      if (this.zone == "") {
        this.$toast.fail("请选择圈子");
        return false;
      } else if (this.message == "" && this.fileList.length == 0) {
        this.$toast.fail("简单说两句");
        return false;
      }
      return true;
    },
    emojiList(src) {
      if (this.fileList.length >= 9) {
        this.$toast("最多选择9张图片哦~");
      } else {
        this.fileList.push({ url: src });
      }
    },
    zoneConfirm(value) {
      this.zone = value;
      this.showPicker = false;
    },
    onOversize() {
      this.$toast("文件大小不能超过 1M");
    },
    async base64toURl(file) {
      let fileName = file.file.name;
      let path = "/images/";
      let realContent = file.content.split(",")[1];
      let random = Math.floor(Math.random() * realContent.length);
      let uploadName =
        path + realContent.substring(random, random + 5) + fileName;
      let postUrl = "/gitee" + uploadName;
      this.$toast.loading({
        message: "上传中...",
        forbidClick: true,
        duration: 0,
      });
      await this.axios
        .post(postUrl, {
          access_token: Iurl.access_token,
          message: Iurl.message,
          content: realContent,
        })
        .then(() => {
          file.url = Iurl.perview + uploadName;
        })
        .catch((error) => {
          this.$toast.fail(error);
        });
    },
    getZoneNames() {
      this.axios.get("/jike-api/zones/names").then((resp) => {
        this.zomes = resp.data.data;
      });
    },
  },
};
</script>

<style>
.Post {
  height: 100%;
  display: flex;
  flex-flow: column;
}
.van-divider {
  margin: 0;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
}
.van-uploader__preview {
  margin: 10px;
}
.van-uploader__wrapper {
  justify-content: space-around;
}
.Post .top {
  flex: 0 1 auto;
}
.Post .mid {
  flex: 1 1 auto;
}
</style>