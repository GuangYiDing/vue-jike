<template>
  <div class="Reply">
    <div class="inputline">
      <div class="textarea_wrapper">
        <van-field
          ref="replyInput"
          v-model="content"
          rows="1"
          autosize
          type="textarea"
          :placeholder="replyTo"
          @focus="fixedKeyborad"
        />
      </div>
      <el-button type="primary" round @click="postComm()">发送</el-button>
    </div>
    <div class="functionline">
      <div
        class="uploader"
        @click="
          () => {
            uploaderVisible = !uploaderVisible;
            emojiVisible = false;
          }
        "
      >
        <van-icon
          name="plus"
          size="2rem"
          :badge="uploads.length"
          color="#1989fa"
        />
      </div>
      <div
        class="emoji"
        @click="
          () => {
            emojiVisible = !emojiVisible;
            uploaderVisible = false;
          }
        "
      >
        <van-icon name="smile-o" size="2rem" color="#1989fa" />
      </div>
    </div>
    <Emoji
      :capacity="18"
      @addEmoji="putEmoji"
      v-show="emojiVisible"
      :visible="emojiVisible"
    />
    <van-uploader
      v-if="uploaderVisible"
      v-model="uploads"
      max-count="8"
      max-size="1024*1024"
      multiple
      @oversize="onOversize"
    ></van-uploader>
  </div>
</template>

<script>
import Emoji from "../Post/Emoji.vue";
import Iurl from "../../axios/constants";
export default {
  name: "Reply",
  components: {
    Emoji,
  },
  props: ["replyToUserName"],
  data() {
    return {
      uploads: [],
      content: "",
      emojiVisible: false,
      uploaderVisible: false,
    };
  },
  computed: {
    replyTo() {
      return "回复 " + this.replyToUserName + " :";
    },
  },
  watch: {
    replyToUserName() {
      this.content = "";
    },
  },
  methods: {
    putEmoji(src) {
      if (this.uploads == 8) {
        this.$toast("最多选择八张图~");
      } else {
        this.uploads.push({ url: src });
        this.emojiVisible = false;
        this.uploaderVisible = true;
      }
    },
    fixedKeyborad() {
      this.emojiVisible = false;
      if (this.uploads.length > 0) {
        this.uploaderVisible = true;
      }
    },
    loginCheck() {
      if (this.$store.state.token == null) {
        this.$dialog
          .confirm({
            title: "哦吼",
            message: "还没登录?来登录一起发布吧😎~",
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
      } else {
        return true;
      }
    },
    contentCheck() {
      if (this.content != "") {
        return true;
      }
      if (this.uploads.length > 0) {
        return true;
      }
      this.$toast("简单说两句");
      return false;
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
    async postComm() {
      console.log(this.loginCheck() && this.contentCheck());
      if (this.loginCheck() && this.contentCheck()) {
        let uploadsStr;
        if (this.uploads.length > 0) {
          var arr = this.uploads;
          for (let i = 0, len = arr.length; i < len; i++) {
            if (arr[i].url == undefined) {
              await this.base64toURl(arr[i]);
            }
          }
          uploadsStr = this.uploads
            .map((item) => {
              return (item = item.url.split("/master")[1]);
            })
            .toString();
        } else {
          uploadsStr = null;
        }
        this.$emit("readyToRely", {
          content: this.content,
          images: uploadsStr,
        });
      }
    },
  },
};
</script>

<style>
.Reply {
  box-shadow: 0 -1px 12px 0 rgba(0, 0, 0, 0.1);
  position: sticky;
  width: 100%;
  bottom: 0;
  color: #8e8e8e8e;
  background: #f7f8fa;
}
.inputline {
  display: flex;
  padding: 0 5px;
}
.inputline .textarea_wrapper {
  width: 80%;
  margin: 0px 8px;
}
.inputline .textarea_wrapper {
  caret-color: #409eff;
}
.inputline button {
  max-height: 44px;
}
.inputline .textarea_wrapper .van-cell {
  border-radius: 15px;
}
.functionline {
  display: flex;
  padding: 0 5px;
  justify-content: flex-start;
}
.functionline div {
  margin: 2px 12px;
}
.van-uploader {
  padding: 0px 12px;
}
.functionline .uploader .van-info {
  top: 9%;
  right: -22%;
}
</style>