<template>
  <div style="height: 100vh; background: rgba(0, 0, 0, .1); display: flex; justify-content: center; align-items: center;">
    <!--    <img src="@/images/main-img.svg" style="width: 15rem; margin-top: 10rem;">-->
    <div style="background: white; width: 70vw; height: 75vh; border-radius: 2rem; box-shadow: 0px 0px 20px -11px #000000; display: flex;">
      <div style="background: #3376f6; flex: 1; border-radius: 2rem 0 0 2rem; padding: 5rem; display: flex; flex-direction: column; justify-content: center;">
        <div style="font-size: 1.5rem; font-weight: 600; color: white;">코드맵</div>
        <!--        <div style="background: white; width: 2rem; height: .2rem; margin-top: .5rem;"></div>-->
        <div style="color: white; margin-top: 1rem;">알고리즘 대회 준비를 위한 길라잡이</div>
      </div>
      <div style="flex: 1; border-radius: 2rem 0 0 2rem; padding: 5rem; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <div style="font-size: 1.5rem; font-weight: 500;">로그인</div>
        <div style="background: #3376f6; width: 2rem; height: .1rem; margin-top: .7rem; margin-bottom: 1rem;"></div>
        <input style="width: 15rem; height: 1rem; padding: 1rem; border: 1px solid #3376f6; border-radius: 1rem;" placeholder="아이디" v-model="id">
        <input style="width: 15rem; height: 1rem; padding: 1rem; border: 1px solid #3376f6; border-radius: 1rem; margin-top: .5rem;" placeholder="비밀번호" v-model="pw" type="password">
        <div
            style="width: 15rem; height: 2.5rem; background: #3376f6; border-radius: 1rem; display: flex; align-items: center; justify-content: center; color: white; margin-top: 1.5rem; cursor:pointer;"
            @click="login">로그인
        </div>
        <a href="https://api.codemap.ai/users/oauth/kakao/signin">
          <img src="/img/kakao_login_large_wide.png" style="width: 100%; margin-top: 1rem;">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import api from "@/api";
import {setToken, isLogin} from "@/api/token";

export default {
  name: "Login",
  components: {Navbar},
  data() {
    return {
      id: "",
      pw: "",
    };
  },
  created() {
    if (isLogin()) {
      this.$router.go(-1);
    }
  },
  methods: {
    async login() {
      let ret = await api.users.signin(this.id, this.pw);
      if (ret.token !== undefined) {
        localStorage.setItem("token", ret.token);
        setToken(ret.token);
        // this.$router.push("/");
        this.$router.go(-1);
        // alert(`로그인 했습니다.\ntoken : ${ret.token}`);
      } else {
        alert('아이디 또는 비밀번호가 잘못되었습니다.');
      }
    },
  },
}
</script>

<style scoped>
input:focus {
  border-color: #3376f6;
  outline-color: #3376f6;
}
</style>
