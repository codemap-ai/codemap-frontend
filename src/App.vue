<template>
  <router-view v-if="renderRouter" />
</template>

<script>
import 'highlight.js/styles/darcula.css';
import {setToken} from "@/api/token";
import api from "@/api";

export default {
  name: 'App',
  data() {
    return {
      renderRouter: false,
    };
  },
  async created() {
    let token = localStorage.getItem("token");
    if (token !== null) {
      setToken(token);
      
      let ret = await api.users.me();
      if (typeof ret?.username !== "string") {
        setToken(null);
        localStorage.removeItem("token");
        console.log("clear token");
      } else {
        console.log(`logined as ${ret.username}`);
      }
    }
    
    this.renderRouter = true;
  },
  methods: {},
}
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css");
@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.5/dist/web/static/pretendard.css");
@import url("https://cdn.jsdelivr.net/npm/@mdi/font@6.9.96/css/materialdesignicons.min.css");
@import url("https://cdn.jsdelivr.net/gh/joungkyun/font-d2coding/d2coding.css");

*:not(.MJX-TEX, .MJX-TEX *, .editor, .editor *) {
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  box-sizing: border-box;
}

*:not(.MJX-TEX, .MJX-TEX *, .editor, .editor *) code {
  font-family: Consolas, serif;
  color: #ffbca2;
}

.editor .view-lines.monaco-mouse-cursor-text div span {
  width: auto !important;
}

.monaco-editor-overlaymessage.fadeIn.fadeOut {
  display: none !important;
}

.hljs, .hljs * {
  font-family: Consolas, D2Coding, 'D2 coding', monospace;
}
</style>
