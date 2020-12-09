<template>
  <div class="Personal">
    <van-uploader
      ref="avatarUpload"
      v-model="avatarList"
      :after-read="afterReadAvatar"
      :max-size="1024 * 1024"
      @oversize="onOversize"
      :max-count="2"
      style="display: none"
    />
    <van-uploader
      ref="backgdUpload"
      v-model="coverList"
      :after-read="afterReadBackGround"
      :max-size="1024 * 1024"
      @oversize="onOversize"
      :max-count="2"
      style="display: none"
    />
    <van-sticky>
      <van-nav-bar
        title="编辑个人信息"
        left-text="返回"
        right-text="完成"
        left-arrow
        @click-left="
          () => {
            this.$router.go(-1);
          }
        "
        @click-right="readyToUpdate"
      />
    </van-sticky>
    <div class="top">
      <div class="avatar">
        <img class="avatarImg" />
        <div @click="showAvatarUpload">更换</div>
      </div>
    </div>
    <div class="changeBcgBtn" @click="showBackGUpload">更换封面</div>
    <div class="form">
      <van-cell-group>
        <van-field
          v-model="userName"
          label="昵称"
          placeholder="4-24个字符"
          maxlength="24"
        />
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="signature" label="签名" placeholder="介绍下自己" />
      </van-cell-group>
      <van-cell-group>
        <van-field
          v-model="gender"
          readonly
          clickable
          placeholder="你的性别"
          label="性别"
          @click="showGenderPicker = true"
        />
      </van-cell-group>
      <van-cell-group>
        <van-field
          readonly
          clickable
          v-model="emotion"
          label="情感"
          placeholder="你的情感状态"
          @click="showEmotionPicker = true"
        />
      </van-cell-group>
      <van-cell-group>
        <van-field
          v-model="birthday"
          readonly
          clickable
          @click="showDatePicker = true"
          label="生日"
          placeholder="你的生日"
        />
      </van-cell-group>

      <van-popup v-model="showGenderPicker" round position="bottom">
        <van-picker
          show-toolbar
          :columns="genders"
          @cancel="showGenderPicker = false"
          @confirm="onGenderConfirm"
        />
      </van-popup>
      <van-popup v-model="showEmotionPicker" round position="bottom">
        <van-picker
          show-toolbar
          :columns="emotions"
          @cancel="showEmotionPicker = false"
          @confirm="onEmotionConfirm"
        />
      </van-popup>
      <van-popup v-model="showDatePicker" round position="bottom">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @cancel="showDatePicker = false"
          @confirm="onDateConfirm"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
import Iurl from "../../axios/constants";
export default {
  name: "Personal",
  data() {
    return {
      currentDate: new Date(),
      personal: {},
      userName: "",
      signature: "",
      gender: "",
      emotion: "",
      birthday: "",
      avatarList: [],
      coverList: [],
      showGenderPicker: false,
      showEmotionPicker: false,
      genders: ["男", "女"],
      emotions: [
        "母胎solo",
        "今日单身",
        "等TA出现",
        "自由可撩",
        "心里有人",
        "恋爱中",
        "一言难尽",
      ],
      showDatePicker: false,
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDay()
      ),
    };
  },
  mounted() {
    this.getUserPersonal();
  },
  methods: {
    showAvatarUpload() {
      this.avatarList = [];
      this.$refs.avatarUpload.chooseFile();
    },
    showBackGUpload() {
      this.coverList = [];
      this.$refs.backgdUpload.chooseFile();
    },
    afterReadAvatar(file) {
      $(".avatarImg").attr("src", file.content);
    },
    afterReadBackGround(file) {
      $(".top").css("background-image", "url(" + file.content + ")");
    },
    onOversize() {
      this.$toast("图片大小不能超过1M😢");
    },
    onGenderConfirm(value) {
      this.gender = value;
      this.showGenderPicker = false;
    },
    onEmotionConfirm(value) {
      this.emotion = value;
      this.showEmotionPicker = false;
    },
    onDateConfirm(value) {
      this.birthday = value.toLocaleDateString();
      this.showDatePicker = false;
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
          this.$toast.clear();
          file.url = Iurl.perview + uploadName;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    async readyToUpdate() {
      this.personal.userName = this.userName;
      this.personal.signature = this.signature;
      this.personal.gender = this.gender;
      this.personal.emotion = this.emotion;
      this.personal.birthday = this.birthday;
      if (this.avatarList.length > 0) {
        await this.base64toURl(this.avatarList[0]);
        this.personal.userAvatar = this.avatarList[0].url.split("/master")[1];
      }
      if (this.coverList.length > 0) {
        await this.base64toURl(this.coverList[0]);
        this.personal.cover = this.coverList[0].url.split("/master")[1];
      }
      this.updatePersonal();
    },
    getUserPersonal() {
      this.axios
        .get("/jike-api/users/personal", {
          headers: {
            Authorization: this.$store.state.token,
          },
        })
        .then((resp) => {
          this.personal = resp.data.data;
          this.userName = this.personal.userName;
          this.signature = this.personal.signature;
          this.gender = this.personal.gender;
          this.emotion = this.personal.emotion;
          this.birthday = this.personal.birthday;
          console.log(this.personal);
          $(".avatarImg").attr("src", Iurl.perview + this.personal.userAvatar);
          $(".top").css(
            "background-image",
            "url(" + Iurl.perview + this.personal.cover + ")"
          );
        });
    },
    updatePersonal() {
      this.axios
        .post("/jike-api/users/personal", JSON.stringify(this.personal), {
          headers: {
            Authorization: this.$store.state.token,
          },
        })
        .then(() => {
          this.$toast.success("更新成功");
          this.$router.push("/Mine");
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
  },
};
</script>

<style>
.Personal .top {
  height: 25vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
.Personal .top .avatar {
  display: inline-block;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
}
.Personal .top .avatar img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.Personal .top .avatar div {
  position: relative;
  top: -35%;
  text-align: center;
  background: rgb(0 0 0 / 30%);
}
.Personal .changeBcgBtn {
  font-size: 14px;
  float: right;
  display: block;
  position: relative;
  top: -43px;
  right: 14px;
  text-align: center;
  color: #fff;
  border-radius: 5px;
  padding: 5px;
  background: rgb(0 0 0 / 30%);
}
</style>