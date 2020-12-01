<template>
  <div class="Notify">
    <div class="left">
      <van-image round class="avatar" :src="avatar" />
    </div>
    <div class="middle">
      <div class="user">{{ user }}</div>
      <span>回复了你</span>
      <div class="replyContent">
        {{ replyContent }}
      </div>
      <span>{{ toDate(timestamp) }}之前</span>
    </div>
    <div class="right">
      <div class="content van-multi-ellipsis--l3">
        {{ content }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Notify",
  data() {
    return {
      avatar: "https://gitee.com/xiaodingsiren/JikePic/raw/master/alu/亲亲.png",
      user: "Max丶海贼",
      replyContent: "耗子尾汁 好好反思 不要再犯这样的聪明 小聪明啊 🙅‍♂️",
      timestamp: 1605669680,
      content:
        "马老师,发生肾么事啦马老师,发生肾么事啦马老师,发生肾么事啦马老师,发生肾么事啦",
    };
  },
  methods: {
    toDate(timestamp) {
      //   var mistiming = Math.round(new Date()) - timestamp;
      //   var postfix = mistiming > 0 ? "前" : "后";
      //   mistiming = Math.abs(mistiming);
      //   var arrr = ["年", "个月", "星期", "天", "小时", "分钟", "秒"];
      //   var arrn = [31536000, 2592000, 604800, 86400, 3600, 60, 1];

      //   for (var i = 0; i < 7; i++) {
      //     var inm = Math.floor(mistiming / arrn[i]);
      //     if (inm != 0) {
      //       return inm + arrr[i] + postfix;
      //     }
      //   }
      let abs = Math.round(new Date().getTime() / 1000 - timestamp);
      if (abs < 60) {
        return abs + "秒";
      } else if (abs < 60 * 60) {
        return abs + "分钟";
      } else if (abs < 60 * 60 * 60) {
        return abs + "小时";
      }
      return abs;
    },
  },
};
</script>

<style>
.Notify {
  display: flex;
  /* width: 100%; */
  padding: 12px;
  font-size: 12px;
  border-bottom: 3px solid #fafafa;
}
.Notify .left img {
  width: 60px;
}
.Notify .middle {
  margin: 0 12px;
  max-width: 200px;
}
.Notify .middle .user,
.Notify .middle span {
  display: inline-block;
}
.Notify .middle .user {
  font-weight: 900;
  margin-right: 12px;
}
.Notify .middle span {
  color: #8e8e8e8e;
}
.Notify .right .content::before {
  content: "''";
}
.Notify .right .content {
  color: #8e8e8e8e;
  max-width: 100px;
  text-overflow: ellipsis;
}
</style>