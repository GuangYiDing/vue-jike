<template>
  <div class="Profile" @change="scaleBackground">
    <div class="top">
      <div class="one-line">
        <div class="avatar">
          <van-image :src="avatar" width="60" height="60" round>
            <template v-slot:loading>
              <van-loading />
            </template>
          </van-image>
        </div>
        <div class="btn">
          <el-button plain size="mini" round>编辑资料</el-button>
        </div>
        <div class="setting">
          <van-popover
            v-model="showPopover"
            theme="dark"
            trigger="click"
            :actions="actions"
            @select="onSelect"
          >
            <template #reference>
              <van-icon name="setting-o" size="32" />
            </template>
          </van-popover>
        </div>
      </div>

      <div class="nike">{{ nike }}</div>
      <div class="follow">
        {{ following }} <span> 关注 </span> | {{ followed }} <span>被关注</span>
      </div>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      nike: "Max丶海贼",
      avatar:
        "https://gitee.com/xiaodingsiren/JikePic/raw/master/alu/不出所料.png",
      following: 8,
      followed: 1,
      female: 0,
      showPopover: false,
      actions: [{ text: "注销" }],
    };
  },
  methods: {
    scaleBackground() {
      console.log(window.onscroll());
    },
    onSelect(action) {
      if (action.text == "注销") {
        this.axios
          .get("/jike-api/users/logout")
          .then(() => {
            this.$toast.success("注销成功");
            this.$store.commit("setToken", "");
            this.$router.push("/");
          })
          .catch((err) => {
            this.$toast.fail(err.message);
          });
      }
    },
  },
};
</script>

<style>
.Profile {
  background-size: 100%;
}
.top {
  margin: 12px;
}
.top .one-line {
  display: flex;
}
.top .one-line .btn {
  display: flex;
  align-items: center;
}
.setting {
  flex: 1;
}
.setting i {
  line-height: 66px;
  /* margin-left: 60px; */
}
.setting span {
  position: relative;
  left: 65%;
}
.top .nike,
.top .follow {
  font-size: 900;
}
.top span {
  font-size: 12px;
}
.bottom {
  border-radius: 25px;
  position: relative;
  top: 20%;
  background-color: aliceblue;
}
</style>