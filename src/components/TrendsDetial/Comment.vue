<template>
  <div class="Comment">
    <van-action-sheet
      v-model="actionSheetVisible"
      :actions="actions"
      @select="acitonSheetOnSelect"
      cancel-text="取消"
      @cancel="actionSheetOnCancel"
    />
    <div class="left">
      <van-image
        round
        class="avatar"
        width="40px"
        height="40px"
        :src="info.userAvatar"
      >
        <template v-slot:loading> <van-loading /> </template
      ></van-image>
    </div>
    <div class="right">
      <div class="header">
        <div class="middle">
          <div class="userName">{{ info.userName }}</div>
          <span>{{ info.createTime }}</span>
        </div>
        <div class="like fr">
          <van-icon name="like-o" /> <span>{{ info.likesCount }}</span>
        </div>
      </div>
      <div class="content" @click="showAcitonSheet">
        {{ info.content }}
      </div>
      <van-image
        :src="image"
        @click="viewImage"
        v-for="image in info.images"
        :key="image"
        width="80"
      >
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
      </van-image>
      <div class="show" v-if="info.hasReply">
        <div class="replys" v-for="reply in info.replys" :key="reply.id">
          <div class="line">
            <div class="user fl">{{ reply.user }}</div>
            <div class="replyContent" @click="showSubAcitonSheet(reply.user)">
              {{ reply.content }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
export default {
  name: "Commnet",
  props: ["info"],
  data() {
    return {
      actionSheetVisible: false,
      actions: [{ name: "回复" }, { name: "复制" }, { name: "分享" }],
      subReplyUser: "",
    };
  },

  methods: {
    showAcitonSheet() {
      this.actionSheetVisible = true;
    },
    showSubAcitonSheet(name) {
      this.actionSheetVisible = true;
      this.subReplyUser = name;
    },
    acitonSheetOnSelect(item) {
      if (item.name == "回复") {
        if (this.subReplyUser.length != "") {
          this.$toast.success(this.subReplyUser);
          this.replyTo(this.subReplyUser);
        } else {
          this.replyTo(this.info.user);
        }
      }
      this.actionSheetVisible = false;
    },
    replyTo(name) {
      this.$emit("replyUserName", name);
    },
    actionSheetOnCancel() {},
    viewImage() {
      ImagePreview(this.info.images);
    },
  },
};
</script>

<style>
.Comment {
  display: flex;
}

.Comment .left {
  flex: 0 1 auto;
  margin: 12px;
}

.Comment .right {
  flex: 1 1 auto;
  padding: 10px;
  border-bottom: 1px solid #ebedf0;
}
.Comment .right .header .middle {
  display: inline-block;
}
.Comment .right .header .like {
  display: inline-block;
}
.Comment .right .header span {
  color: grey;
  font-size: 12px;
}
.Comment .right .content {
  margin: 8px 0px;
}
.Comment .right .show {
  background-color: #f7f8fa;
  padding-top: 5px;
  padding-left: 10px;
  padding-bottom: 5px;
  font-size: 14px;
  border-radius: 5px;
}
.Comment .right .replys .user {
  display: inline-block;
  color: #38a7ff;
  font-weight: 500;
}
.Comment .right .replys .user::after {
  content: ":";
  margin-right: 8px;
}

.Comment .right .like {
  text-align: center;
  line-height: 22px;
  height: 22px;
}
</style>