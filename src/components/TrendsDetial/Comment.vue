<template>
  <div class="Comment">
    <van-action-sheet
      v-model="actionSheetVisible"
      :actions="actions"
      @select="acitonSheetOnSelect"
      cancel-text="取消"
    />
    <div class="left">
      <van-image
        round
        class="avatar"
        width="40px"
        height="40px"
        :src="comm.userAvatar"
      >
        <template v-slot:loading> <van-loading /> </template
      ></van-image>
    </div>
    <div class="right">
      <div class="header">
        <div class="middle">
          <div class="userName">{{ comm.userName }}</div>
          <span>{{ comm.createTime }}</span>
        </div>
        <div class="like fr">
          <van-icon name="like" v-if="isLiked" color="red" />
          <van-icon name="like-o" v-if="!isLiked" @click="ilikeit" />
          <span>{{ comm.likesCount }}</span>
        </div>
      </div>
      <div class="content" @click="showAcitonSheet()">
        {{ comm.content }}
        <div class="content-images">
          <van-image
            :src="image"
            @click="viewImage"
            v-for="image in comm.images"
            :key="image"
            width="80"
          >
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
        </div>
      </div>
      <!-- 子评论 -->
      <div class="childComm" v-for="child in childComm" :key="child.id">
        <div class="show" v-if="child.parentId == comm.commId">
          <div class="replys">
            <div class="line">
              <div class="user fl">{{ child.userName }}</div>
              <div class="replyContent" @click="showSubAcitonSheet(child)">
                {{ child.content }}
                <el-link
                  type="primary"
                  @click="viewChilCommImage(child.images)"
                  v-if="child.images && child.images.length > 0"
                  >查看图片</el-link
                >
              </div>
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
  props: ["comm", "childComm", "likedComm"],
  inject: ["reload"],
  data() {
    return {
      actionSheetVisible: false,
      actions: [{ name: "回复" }, { name: "复制" }, { name: "分享" }],
      replyChildInfo: {},
    };
  },
  computed: {
    isLiked() {
      for (var value of this.likedComm) {
        if (value.commentId == this.comm.commId) return true;
      }
      return false;
    },
  },
  methods: {
    showAcitonSheet() {
      this.actionSheetVisible = true;
      this.replyChildInfo = {};
    },
    showSubAcitonSheet(child) {
      this.actionSheetVisible = true;
      this.replyChildInfo = {
        commId: child.commId,
        userName: child.userName,
        parentId: child.parentId,
      };
    },
    acitonSheetOnSelect(item) {
      if (item.name == "回复") {
        // 回复评论
        if (this.replyChildInfo.commId == undefined) {
          this.$emit("replyToComm", {
            userName: this.comm.userName,
            commId: this.comm.commId,
            parentId: 0,
          });
        } else {
          // 回复子评论
          this.$emit("replyToComm", this.replyChildInfo);
        }
      }
      this.actionSheetVisible = false;
    },
    viewImage() {
      ImagePreview(this.comm.images);
      event.stopPropagation();
    },
    viewChilCommImage(images) {
      ImagePreview(images);
      event.stopPropagation();
    },
    loginCheck() {
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
      }
      return true;
    },
    ilikeit() {
      event.stopPropagation();
      if (this.loginCheck()) {
        this.axios
          .post(
            "/jike-api/like/comm",
            JSON.stringify({
              commId: this.comm.commId,
            }),
            {
              headers: {
                Authorization: this.$store.state.token,
              },
            }
          )
          .then((resp) => {
            if (resp.data.code == 200) {
              this.$toast({
                icon: "like-o",
                message: "好家伙",
              });
              this.$emit("reloadComm");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
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