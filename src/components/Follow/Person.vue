<template>
  <div class="Person van-hairline--bottom">
    <div class="left">
      <van-image
        :src="perview + person.avatar"
        width="60"
        height="60"
        round
        @click="goProfile(person.id)"
      >
        <template v-slot:loading>
          <van-loading />
        </template>
      </van-image>
    </div>
    <div class="mid">
      {{ person.userName }}
      <div class="signature">{{ person.signature }}</div>
    </div>
    <div class="right">
      <el-button
        round
        size="small"
        type="primary"
        v-if="!isFollowed"
        @click="follwing"
        >关注TA</el-button
      >
      <el-button v-if="isFollowed" size="small" round @click="cancelFollwing"
        >取消关注</el-button
      >
    </div>
  </div>
</template>

<script>
import Iurl from "../../axios/constants";
export default {
  name: "Person",
  props: ["person", "isFollowing"],
  data() {
    return {
      perview: Iurl.perview,
    };
  },
  computed: {
    isFollowed() {
      for (var value of this.isFollowing) {
        if (value.id == this.person.id) return true;
      }
      return false;
    },
  },
  methods: {
    checkLogin() {
      if (this.$store.state.token == null) {
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
      } else {
        return true;
      }
    },
    goProfile(userId) {
      this.$router.push({
        path: `/Others/${userId}`,
      });
    },
    follwing() {
      if (this.checkLogin()) {
        this.axios({
          method: "post",
          url: "/jike-api/follow",
          params: { followingUserId: this.people.id },
          headers: {
            Authorization: this.$store.state.token,
          },
        }).then((resp) => {
          this.$toast(resp.data.message);
          this.$emit("reloadPeople");
        });
      }
    },
    cancelFollwing() {
      this.axios({
        method: "delete",
        url: "/jike-api/follow",
        params: { cancelFollowingUserId: this.people.id },
        headers: {
          Authorization: this.$store.state.token,
        },
      }).then((resp) => {
        this.$toast(resp.data.message);
        this.$emit("reloadPeople");
      });
    },
  },
};
</script>

<style>
.Person {
  display: flex;
  padding: 12px 0px;
  justify-content: space-around;
}
.Person .mid {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.Person .mid .signature {
  color: #8f8f8f;
  font-size: 14px;
}
.Person .right {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>