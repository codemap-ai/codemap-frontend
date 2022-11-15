<template>
  <Navbar dropdown="내 정보"/>
  <div v-if="!isLoading" style="display: flex; flex-direction: column; justify-content: center; align-items: center; margin-top: 5rem;">
    <div style="display: flex; justify-content: flex-start; align-items: flex-start; margin-right: auto; margin-left: 10rem;">
      <img :src="user?.image ?? '/img/profile.png'" style="margin-right: 5rem; width: 10rem;">
      <div style="display: flex; flex-direction: column; height: 10rem;">
        <div style="font-size: 1.5rem; font-weight: bold;">{{ user.username }}</div>
        <div style="color: grey; font-size: 0.9rem;">{{ user.nickname }}</div>
        <div style="flex: .5;"></div>
        <a v-if="user?.image === undefined" href="https://api.codemap.ai/users/oauth/kakao/getId">
          <img src="/img/kakao_link.png" style="width: 15rem; margin-top: 1rem;">
        </a>
        <div v-else style="font-style: italic; color: grey; font-size: .9rem;">
          카카오 계정과 연동되어 있습니다.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import Navbar from "@/components/Navbar";

export default {
  name: "MyPageView",
  components: {Navbar},
  data() {
    return {
      isLoading: true,
      // kakao: {},
      user: {},
    };
  },
  async created() {
    // this.kakao = await api.users.getKakaoInfo();
    this.user = await api.users.me();
    if (this.user?.image === "tmp") delete this.user.image;
    this.isLoading = false;
  },
}
</script>

<style scoped>

</style>
