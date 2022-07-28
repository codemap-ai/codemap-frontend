<template>
  <router-view/>
</template>

<script>
import 'highlight.js/styles/darcula.css';

export default {
  name: 'App',
  data() {
    return {};
  },
  methods: {},
}
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css");
@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.5/dist/web/static/pretendard.css");
@import url("https://cdn.jsdelivr.net/npm/@mdi/font@6.9.96/css/materialdesignicons.min.css");
@import url("http://cdn.jsdelivr.net/gh/joungkyun/font-d2coding/d2coding.css");

*:not(.MJX-TEX, .MJX-TEX *, .editor, .editor *) {
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  box-sizing: border-box;
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
