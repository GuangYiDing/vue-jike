<template>
  <div class="Login">
    <van-nav-bar
      title="登录/注册"
      left-text="返回"
      left-arrow
      @click-left="
        () => {
          this.$router.go(-1);
        }
      "
    />
    <van-tabs v-model="active">
      <van-tab title="登录">
        <div class="block">
          <h2 class="block-title">用户名</h2>
          <div class="filed">
            <input type="text" v-model="loginUserName" />
          </div>
          <h2 class="block-title">密码</h2>

          <van-password-input
            :value="loginPassWord"
            :length="6"
            :info="passwordInfo"
            :focused="showKeyboard"
            :error-info="loginPasswordErrorInfo"
            @focus="showKeyboard = true"
          />
          <van-number-keyboard
            v-model="loginPassWord"
            theme="custom"
            :extra-key="['@', '.']"
            close-button-text="完成"
            :show="showKeyboard"
            maxlength="6"
            @blur="showKeyboard = false"
          />
          <h2 class="block-title">验证</h2>
          <div class="verify">
            <drag-verify
              ref="dragVerify"
              :isPassing.sync="loginVerify"
              :width="350"
              text="请按住滑块拖动"
              successText="验证通过"
              handlerIcon="van-icon van-icon-arrow"
              successIcon="van-icon van-icon-success"
              @passcallback="loginVerify = true"
            />
          </div>
          <div class="button">
            <el-button type="info" size="large" round @click="loginReset"
              >重置</el-button
            >
            <el-button type="primary" size="large" round @click="login"
              >登录</el-button
            >
          </div>
        </div>
      </van-tab>
      <van-tab title="注册">
        <div class="block">
          <h2 class="block-title">用户名</h2>
          <div class="filed">
            <input type="text" v-model="signupUserName" />
          </div>
          <h2 class="block-title">密码</h2>

          <van-password-input
            :value="signupPassWord"
            :length="6"
            :info="passwordInfo"
            :focused="showKeyboard"
            :error-info="signupPasswordErrorInfo"
            @focus="showKeyboard = true"
          />

          <van-number-keyboard
            v-model="signupPassWord"
            :show="showKeyboard"
            theme="custom"
            :extra-key="['@', '.']"
            close-button-text="完成"
            @blur="showKeyboard = false"
          />
          <h2 class="block-title">验证</h2>
          <div class="verify">
            <drag-verify-img-chip
              ref="dragImgVerify"
              :imgsrc="require('../assets/t3f6f8c53.png')"
              :isPassing.sync="signupVerify"
              handlerIcon="van-icon van-icon-arrow"
              successIcon="van-icon van-icon-success"
              text="请按动滑动拖动"
              :showRefresh="this.showRefresh"
              @passcallback="signupVerify = true"
              @refresh="this.imgChipRefresh"
            >
            </drag-verify-img-chip>
          </div>
          <div class="button">
            <el-button type="info" size="large" round @click="signupReset"
              >重置</el-button
            >
            <el-button type="primary" size="large" round @click="signup"
              >注册</el-button
            >
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import dragVerify from "vue-drag-verify2";
// import dragVerifyImgChip from "vue-drag-verify-img-chip";
import dragVerifyImgChip from "../components/Login/DragVerifyImgChip";
import qs from "qs";
export default {
  name: "Login",
  components: { dragVerify, dragVerifyImgChip },
  data() {
    return {
      active: 0,
      passwordInfo: "密码为6位数字或字符",
      loginUserName: "",
      loginPassWord: "",
      loginPasswordErrorInfo: "",
      loginVerify: false,
      signupUserName: "",
      signupPassWord: "",
      signupPasswordErrorInfo: "",
      signupVerify: false,
      showKeyboard: true,
      imgsrc: "/assets/t3f6f8c53.png",
      showRefresh: true,
    };
  },
  mounted() {},

  methods: {
    loginReset() {
      this.loginUserName = "";
      this.loginPassWord = "";
      this.loginPasswordErrorInfo = "";
      this.loginVerify = false;
      this.$refs.dragVerify.reset();
    },
    checkLogin() {
      if (this.loginUserName == "") {
        this.$toast.fail("用户名未填写");
        return false;
      } else if (this.loginPassWord == "") {
        this.$toast.fail("密码未填写");
        return false;
      } else if (this.loginPassWord.length < 6) {
        this.loginPasswordErrorInfo = "密码未填写完整";
        this.$toast.fail("密码为6位数字或字符!");
        return false;
      } else if (!this.loginVerify) {
        this.$toast.fail("验证未通过");
        return false;
      }
      return true;
    },
    login() {
      if (this.checkLogin()) {
        this.axios
          .post(
            "/jike-api/users/login",
            qs.stringify({
              userName: this.loginUserName,
              password: this.loginPassWord,
            }),
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          )
          .then((resp) => {
            this.$toast.success("登录成功~");
            console.log(resp);
            this.$store.commit("setToken", resp.data.data);
            this.$router.push("/");
          })
          .catch((error) => {
            this.$toast.fail(error.message);
          });
      }
    },
    signupReset() {
      this.signupUserName = "";
      this.signupPassWord = "";
      this.signupPasswordErrorInfo = "";
      this.signupVerify = false;
      this.$refs.dragImgVerify.reset();
    },
    checkSignup() {
      if (this.signupUserName == "") {
        this.$toast.fail("用户名未填写");
        return false;
      } else if (this.signupPassWord == "") {
        this.$toast.fail("密码未填写");
        return false;
      } else if (this.signupPassWord.length < 6) {
        this.signupPasswordErrorInfo = "密码未填写完整";
        this.$toast.fail("密码为6位数字或字符!");
        return false;
      } else if (!this.signupVerify) {
        this.$toast.fail("验证未通过");
        return false;
      }
      return true;
    },
    signup() {
      if (this.checkSignup()) {
        this.axios
          .post(
            "/jike-api/users",
            qs.stringify({
              userName: this.signupUserName,
              password: this.signupPassWord,
            }),
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          )
          .then(() => {
            this.$toast.success("成功注册可以登录啦~");
            this.loginUserName = this.signupUserName;
            this.loginPassWord = this.signupPassWord;
            this.active = 0;
          })
          .catch((error) => {
            this.$toast.fail(error.message);
          });
      }
    },

    imgChipRefresh() {},
  },
};
</script>

<style>
.Login {
  background: #f7f8fa;
  height: 100%;
}
.drag_verify {
  border: 1px solid #f3f3f3;
}
.block {
  display: block;
}
.block-title {
  margin: 0;
  padding: 32px 16px 16px;
  color: rgba(69, 90, 100, 0.6);
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
}
.block-title:first-of-type,
.block-title {
  padding-top: 20px;
}
.block .filed {
  padding: 10px 16px;
  overflow: hidden;
  color: #323233;
  font-size: 14px;
  line-height: 24px;
  margin: 0 16px;
  background-color: #fff;
}
.block .filed input {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  margin: 0;
  padding: 0;
  color: #323233;
  line-height: inherit;
  text-align: left;
  background-color: transparent;
  border: 0;
  resize: none;
}
.block .verify {
  margin: 0 16px;
  display: flex;
  justify-content: center;
}
.block .button {
  margin-top: 50px;
  display: flex;
  justify-content: space-around;
}
</style>
