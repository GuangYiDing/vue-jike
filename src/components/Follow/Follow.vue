<template>
  <div class="Follow">
    <van-sticky>
      <van-nav-bar
        :title="this.$route.meta.title"
        left-text="返回"
        left-arrow
        @click-left="
          () => {
            this.$router.go(-1);
          }
        "
      />
    </van-sticky>
    <van-pull-refresh
      v-model="followIsLoading"
      success-text="刷新成功"
      @refresh="followOnRefresh"
    >
      <van-empty description="空空如也" v-if="this.people.length == 0" />
      <div class="people">
        <Person
          v-for="person in this.people"
          :key="person.id"
          :person="person"
          :isFollowing="isFollowing"
          @reloadPeople="followOnRefresh"
        />
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import Person from "../Follow/Person.vue";
export default {
  components: { Person },
  name: "Follow",
  data() {
    return {
      followIsLoading: false,
      people: [],
      isFollowing: [],
    };
  },
  mounted() {
    this.followOnRefresh();
  },
  methods: {
    followOnRefresh() {
      if (this.$route.name == "Following") {
        this.laodFollowing();
        this.getAtuhFollowing();
      } else if (this.$route.name == "Followed") {
        this.laodFollowed();
        this.getAtuhFollowing();
      }
    },
    laodFollowing() {
      this.axios({
        method: "get",
        url: "/jike-api/follow/ing",
        params: { userId: this.$route.params.userId },
      }).then((resp) => {
        this.people = resp.data.data;
        this.followIsLoading = false;
      });
    },
    laodFollowed() {
      this.axios({
        method: "get",
        url: "/jike-api/follow/ed",
        params: { userId: this.$route.params.userId },
      }).then((resp) => {
        this.people = resp.data.data;
        this.followIsLoading = false;
      });
    },
    getAtuhFollowing() {
      if (this.$store.state.token != null) {
        this.axios
          .get("/jike-api/follow/Aing", {
            headers: {
              Authorization: this.$store.state.token,
            },
          })
          .then((resp) => {
            this.isFollowing = resp.data.data;
          });
      }
    },
  },
};
</script>

<style>
.Follow {
  height: 100vh;
}
.Follow .people {
  display: flex;
  flex-direction: column;
  margin: 12px 0px;
}
</style>