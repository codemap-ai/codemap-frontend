<template>
  <!--  <Navbar/>-->
  <!--  <button @click='$router.push("/lecture/1");'>lecture</button>-->
  <!--  <button @click='register'>회원가입 (테스트)</button>-->
  <!--  <button @click='login'>로그인 (테스트)</button>-->
  <!--  <button @click='logout'>로그아웃</button>-->
  <!--  <button @click='$router.push("/problem/1");'>문제 해결 창 이동</button>-->
  <!--  <button @click='$router.push("/contest/1");'>1번 대회 이동</button>-->
  <!--  <StartContest/>-->
  <!--  <button @click='$router.push("/curriculum");'>curriculum</button>-->
  <div class="wrap">
    <div class="container">
      <section class="top">
        <a href="#" class="logo"></a>
        <ul v-if="!isLogin">
          <li><router-link to="/register" class="join">가입</router-link></li>
          <li><router-link to="/login" class="login">로그인</router-link></li>
        </ul>
        <ul v-else>
          <li><a href="#" @click="logout" class="join">로그아웃</a></li>
        </ul>
      </section>
      
      <section class="content">
        <div class="main-img">
          <div class="main-wrap">
            <div class="main-img-logo"></div>
            <h6>알고리즘 대회 준비를 위한 길라잡이</h6>
          </div>
        </div>
        
        <div class="codemap-btns">
          <div class="codemap-btn btn01">
            <ul>
              <li>
                <h5>알고리즘</h5>
                <p>기초부터 고급까지<br>준비된 학습자료</p>
              </li>
              <li><router-link to="/curriculum/"></router-link></li>
            </ul>
          </div>
          <div class="codemap-btn btn02">
            <ul>
              <li>
                <h5>모의고사</h5>
                <p>대회 기출문제를 활용한<br>실전 모의고사 체험</p>
              </li>
              <li><router-link to="/problem_set/"></router-link></li>
            </ul>
          </div>
          <div class="codemap-btn btn03">
            <ul>
              <li>
                <h5>문제풀이</h5>
                <p>각 문제 풀어보기</p>
              </li>
              <li><router-link to="/problem/"></router-link></li>
            </ul>
          </div>
        </div>
      </section>
      <section class="footer">
        <div class="footer-logo"></div>
        <div class="footer-txt">
          <p>코드맵 | CodeMap</p>
          <p>Email : ai.codemap@gmail.com</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import StartContest from "@/components/StartContest";
import api from "@/api";
import {isLogin} from "@/api/token";
import Navbar from "@/components/Navbar";

export default {
  name: "HomeView",
  components: {Navbar, StartContest},
  created() {
  
  },
  data() {
    return {
    
    };
  },
  computed: {
    isLogin() {
      return isLogin();
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      alert("로그아웃 했습니다.");
      location.reload();
    },
  }
}
</script>

<style scoped>
.wrap {
  width: 100%;
}

.container {
  width: 1024px;
  margin: 0 auto;
}

.container * {
  box-sizing: border-box;
}

.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
  margin-bottom: 40px;
}

.top .logo {
  display: block;
  width: 237px;
  height: 45px;
  background: url(@/images/top-logo.svg) 50% no-repeat;
}

.top ul {
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
}

.top ul a {
  display: inline-block;
  width: 86px;
  text-align: center;
  padding: .3em;
  font-size: 16px;
  border-radius: 30px;
}

.top ul li + li {
  margin-left: 1em;
}

.top ul a.join {
  color: #01CEB2;
  border: 1px solid #01CEB2;
}

.top ul a.login {
  color: #3376F6;
  border: 1px solid #3376F6;
}

.main-img {
  display: flex;
  align-items: center;
  padding: 70px;
  width: 100%;
  height: 480px;
  border-radius: 10px;
  margin-bottom: 40px;
  background: url(@/images/main-img.svg) 100% 50% no-repeat #3376F6;
}

.main-wrap {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.main-wrap h6 {
  color: #fff;
  font-size: 32px;
  font-weight: 400;
}

.main-img-logo {
  display: block;
  width: 446px;
  height: 172px;
  background: url(@/images/main-logo.svg) 50% no-repeat;
}

.codemap-btns {
  display: flex;
  justify-content: space-between;
}

.codemap-btn.btn01 {
  background: url(@/images/codemap-img1.svg) 50% 36px no-repeat;
}

.codemap-btn.btn02 {
  background: url(@/images/codemap-img2.svg) 50% 31px no-repeat;
}

.codemap-btn.btn03 {
  background: url(@/images/codemap-img3.svg) 50% 30px no-repeat;
}

.codemap-btns .codemap-btn {
  display: inline-flex;
  width: 320px;
  padding: 148px 34px 30px 34px;
  border-radius: 10px;
  border: 1px solid #3376F6;
  box-shadow: 0 5px 5px 0 rgba(0, 0, 0, .1);
}

.codemap-btns .codemap-btn ul {
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.codemap-btns .codemap-btn ul h5 {
  font-size: 20px;
  color: #3376F6;
  margin-bottom: 10px;
}

.codemap-btns .codemap-btn ul p {
  font-size: 16px;
  line-height: 19px;
  color: #666;
  font-weight: 300;
}

.codemap-btns .codemap-btn ul a {
  display: block;
  width: 42px;
  height: 60px;
  background: url(@/images/codemap-next.svg) 50% no-repeat;
}

.footer {
  margin-top: 60px;
  margin-bottom: 60px;
  padding-top: 30px;
  width: 100%;
  display: flex;
  border-top: 1px solid #ddd;
}

.footer .footer-logo {
  display: inline-flex;
  width: 187px;
  height: 35px;
  background: url(@/images/footer-logo.svg) 50% no-repeat;
}

.footer .footer-txt {
  margin-left: 3em;
}

.footer .footer-txt p {
  font-size: 14px;
  color: #999;
  font-weight: 300;
  line-height: 1.4
}

@media screen and (max-width: 1030px) {
  .container {
    width: calc(100% - 2em);
    padding-left: 1em;
    padding-right: 1em;
  }
  
  .codemap-btns .codemap-btn {
    width: 30%;
  }
}

@media screen and (max-width: 980px) {
  .main-img {
    padding: 40px;
  }
}

@media screen and (max-width: 950px) {
  .codemap-btns {
    flex-wrap: wrap;
  }
  
  .codemap-btns .codemap-btn {
    width: 100%;
  }
  
  .codemap-btns .codemap-btn + .codemap-btn {
    margin-top: 2em;
  }
  
  .main-img {
    height: 400px;
    align-items: baseline;
    background: url(@/images/main-img.svg) 100% 100% no-repeat #3376F6;
    background-size: 300px;
  }
  
  .main-img-logo {
    height: 122px;
  }
}

@media screen and (max-width: 750px) {
  .main-img {
    background-size: 200px;
  }
}

@media screen and (max-width: 560px) {
  .main-img-logo {
    width: 100%;
    background-size: contain;
  }
  
  .footer {
    align-items: center;
    flex-direction: column;
  }
  
  .footer .footer-txt {
    margin-left: 0;
    margin-top: 1em;
    flex-direction: column;
  }
  
  .footer .footer-txt p {
    text-align: center;
  }
}

@media screen and (max-width: 450px) {
  .top .logo {
    width: 50%;
    background-size: contain;
  }
}
</style>

<style scoped>
dl,ul,ol,menu,li {list-style:none}
a {color:#333;text-decoration:none}
a:active, a:hover {text-decoration:none}
</style>
