<template>
  <Navbar dropdown="내 정보"/>
  <div v-if="!isLoading" style="display: flex; flex-direction: column; justify-content: center; align-items: center; margin: 5rem 10rem 10rem;">
    <div style="display: flex; justify-content: flex-start; align-items: flex-start; margin-right: auto;">
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
    <div style="width: 100%; margin-top: 3rem; display: flex;">
      <div style="flex: 1;">
        <div style="font-weight: 600; font-size: 1.5rem; margin-bottom: 1.5rem;">해결한 문제</div>
        <Table :headers="['문제 번호', '문제 이름']" :ratio="[2, 4]" :values="solved.problems.map(obj => Object.values(obj))"></Table>
      </div>
      <div style="flex: 1; margin-left: 2rem;">
        <div style="font-weight: 600; font-size: 1.5rem; margin-bottom: 1.5rem;">참여한 대회</div>
        <Table :headers="['대회 이름 (스코어보드)']" :ratio="[1]" :values="solved.contests.map(obj => [
            obj.problem_set_name,
        ])" :links="solved.contests.map(obj => `https://scoreboard.codemap.ai/${obj.problem_set_id}`)"></Table>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import Navbar from "@/components/Navbar";
import Table from "@/components/Table.vue";

export default {
  name: "MyPageView",
  components: {Table, Navbar},
  data() {
    return {
      isLoading: true,
      // kakao: {},
      user: {},
      solved: {},
    };
  },
  async created() {
    // this.kakao = await api.users.getKakaoInfo();
    this.user = await api.users.me();
    if (this.user?.image === "tmp") delete this.user.image;
  
    this.solved = await api.users.getSolved();
    
    this.isLoading = false;
  },
}
</script>

<style scoped>

</style>
