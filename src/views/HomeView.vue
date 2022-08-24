<template>
  <Navbar/>
  <!--  <button @click='$router.push("/lecture/1");'>lecture</button>-->
  <button @click='register'>회원가입 (테스트)</button>
  <button @click='login'>로그인 (테스트)</button>
  <button @click='logout'>로그아웃</button>
  <!--  <button @click='$router.push("/problem/1");'>문제 해결 창 이동</button>-->
  <!--  <button @click='$router.push("/contest/1");'>1번 대회 이동</button>-->
  <!--  <StartContest/>-->
  <!--  <button @click='$router.push("/curriculum");'>curriculum</button>-->
</template>

<script>
import StartContest from "@/components/StartContest";
import api from "@/api";
import {setToken} from "@/api/token";
import Navbar from "@/components/Navbar";

export default {
  name: "HomeView",
  components: {Navbar, StartContest},
  created() {
  
  },
  data() {
    return {
      id: "test1234",
      pw: "asdfasdf",
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      alert("로그아웃 했습니다.");
      location.reload();
    },
    async login() {
      let ret = await api.users.signin(this.id, this.pw);
      if (ret.token !== undefined) {
        localStorage.setItem("token", ret.token);
        setToken(ret.token);
        alert(`로그인 했습니다.\ntoken : ${ret.token}`);
      } else {
        alert('로그인 실패');
      }
    },
    async register() {
      let ret = await api.users.signup(this.id, this.pw, "닉네임");
      if (ret.message !== undefined) {
        alert(ret.message);
        return;
      }
      if (ret.username === undefined) {
        alert("회원가입 실패");
        return;
      }
      await this.login();
    },
  }
}
</script>

<style scoped>

</style>
