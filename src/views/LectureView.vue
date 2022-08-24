<template>
  <Navbar :title="title" dropdown="강의" title_desc="현재 강의"/>
  <div v-if="!isLoading" :class="$style['lecture-view-content']">
    <div :class="$style['lecture-view-content__sidebar']">
      <div :class="$style['lecture-view-content__sidebar-expand-btn']">
        <span class="mdi mdi-view-headline"></span></div>
      <div v-for="(_, index) in chapters" :key="index" :class="[$style['lecture-view-content__sidebar-menu'], {[$style['lecture-view-content__sidebar-menu-enabled']]: chapterIndex === index}]"
           @click="chapterIndex = index; pageIndex = 0;">
        {{ index + 1 }}
      </div>
    </div>
    <div :class="$style['lecture-view-content__main']">
      <div :class="$style['lecture-view-content__main-header-text']">{{ chapterIndex + 1 }}. {{ chapters[chapterIndex].title }}</div>
      <div :class="$style['lecture-view-content__slide']">
        <div :class="$style['lecture-view-content__slide-content']" style="line-height: 1.5rem;">
          <vue3-markdown-it :class="$style['lecture-view-content__slide-markdown']" :source="chapters[chapterIndex].pages[pageIndex][0]"/>
        </div>
        <div v-if="chapters[chapterIndex].pages[pageIndex].length > 1 || true" :class="[$style['lecture-view-content__slide-content'], $style['lecture-view-content__slide-content-right']]"
             style="padding: 0; overflow: hidden; position: relative;">
          <!--          <vue3-markdown-it :class="$style['lecture-view-content__slide-markdown']" :source="chapters[chapterIndex].pages[pageIndex][1]"/>-->
          <div style="height: 3rem;background: white; color: black; display: flex; padding-left: 1rem; align-content: center; align-items: center; border-radius: 0 1rem 0 0;">
            <span class="mdi mdi-chevron-right" style="display: inline-block; margin-right: .5rem;"></span>코드 테스트
          </div>
          <MonacoEditor :options="{automaticLayout: true, scrollBeyondLastLine: false,}" :value="currentCode"
                        class="editor" @change="onChangeCode"
                        language="cpp" style="height: 50vh;" theme="vs-dark"/>
          <div style="height: 3rem;background: white; color: black; display: flex; padding-left: 1rem; align-content: center; align-items: center;">
            <div style="flex: 1;">
              <span class="mdi mdi-chevron-right" style="display: inline-block; margin-right: .5rem;"></span>표준 입력 (stdin)
            </div>
            <div style="flex: 1;">
              <span class="mdi mdi-chevron-right" style="display: inline-block; margin-right: .5rem;"></span>출력 결과 (stdout)
            </div>
          </div>
          <div style="display: flex; justify-content: space-between; height: 24vh;">
            <MonacoEditor :options="{automaticLayout: true, scrollBeyondLastLine: false,}"
                          class="editor" @change="onChangeTestInput"
                          language="plaintext" theme="vs-dark" :value="currentInput"/>
            <MonacoEditor :options="{automaticLayout: true, scrollBeyondLastLine: false, readOnly: true,}"
                          class="editor"
                          language="plaintext" theme="vs-dark" :value="currentOutput"/>
          </div>
          <div
              style="position: absolute; right: 1rem; bottom: 1rem; background: #3476f6; color: white; padding: 1rem 2rem; display: flex; justify-content: center; align-items: center; border-radius: 2rem; cursor: pointer;"
              @click="submitTestCode">
            테스트
          </div>
        </div>
        <div v-if="canPrevPage" :class="[$style['lecture-view-content__slide-page-btn'], $style['lecture-view-content__slide-page-btn-left']]">
          <div :class="$style['lecture-view-content__slide-page-btn-circle']" @click="prevPage">
            <span :class="['mdi', 'mdi-chevron-left', $style['lecture-view-content__slide-page-btn-icon']]"></span>
          </div>
        </div>
        <div v-if="canNextPage" :class="[$style['lecture-view-content__slide-page-btn'], $style['lecture-view-content__slide-page-btn-right']]">
          <div :class="$style['lecture-view-content__slide-page-btn-circle']" @click="nextPage">
            <span :class="['mdi', 'mdi-chevron-right', $style['lecture-view-content__slide-page-btn-icon']]"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import api from "@/api";
import MonacoEditor from "monaco-editor-vue3";

export default {
  name: 'LectureView',
  components: {Navbar, MonacoEditor},
  data() {
    return {
      intervalId: [],
      isLoading: true,
      
      title: "",
      chapterIndex: 0,
      pageIndex: 0,
      lockedForRender: false,
      chapters: [],
      
      currentCode: "",
      currentInput: "",
      currentOutput: "",
    };
  },
  methods: {
    onChangeCode(value) {
      this.currentCode = value;
    },
    onChangeTestInput(value) {
      this.currentInput = value;
    },
    movePage() {
      this.currentCode = this.chapters[this.chapterIndex].pages[this.pageIndex][1] ?? '';
      this.currentInput = "";
      this.currentOutput = "";
    },
    prevPage() {
      if (this.pageIndex === 0) {
        if (this.chapterIndex === 0) {
          return;
        }
        this.chapterIndex--;
        this.pageIndex = this.chapters[this.chapterIndex].pages.length - 1;
      } else {
        this.pageIndex--;
      }
      
      this.movePage();
    },
    nextPage() {
      if (this.pageIndex + 1 === this.chapters[this.chapterIndex].pages.length) {
        if (this.chapterIndex + 1 === this.chapters.length) {
          return;
        }
        this.chapterIndex++;
        this.pageIndex = 0;
      } else {
        this.pageIndex++;
      }
      
      this.movePage();
    },
    async renderMathJax() {
      if (this.lockedForRender) {
        return;
      }
      this.lockedForRender = true;
      while (typeof MathJax?.typeset !== "function") {
        await new Promise(r => setTimeout(r, 50));
      }
      MathJax.typeset();
      this.lockedForRender = false;
    },
    async submitTestCode() {
      this.currentOutput = String(await api.submit.test(this.currentCode, this.currentInput, "cpp"));
    },
  },
  computed: {
    canPrevPage() {
      if (this.pageIndex === 0 && this.chapterIndex === 0) {
        return false;
      }
      return true;
    },
    canNextPage() {
      if (this.pageIndex + 1 === this.chapters[this.chapterIndex].pages.length && this.chapterIndex + 1 === this.chapters.length) {
        return false;
      }
      return true;
    },
    algorithm_id() {
      return this.$route.params.algorithm_id;
    },
  },
  async created() {
    let ret = await api.algorithms.getAlgorithm(this.algorithm_id);
    this.chapters = ret.body;
    this.title = ret.title;
    // this.chapters = JSON.parse('');
    this.isLoading = false;
    
    this.intervalId.push(setInterval(this.renderMathJax, 100));
    this.movePage();
  },
}
</script>

<style module scoped>
/* content body */
.lecture-view-content {
  display: flex;
  background: rgb(96, 109, 173, .1);
}

.lecture-view-content__sidebar {
  height: calc(100vh - 3.5rem - 1px);
  border-right: 1px solid rgba(0, 0, 0, .1);
  background: white;
}

.lecture-view-content__sidebar-expand-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.5rem;
  height: 3.5rem;
  font-size: 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
}

.lecture-view-content__sidebar-menu {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.5rem;
  height: 3.5rem;
  font-size: 1.2rem;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  transition: .4s;
  cursor: pointer;
}

.lecture-view-content__sidebar-menu-enabled {
  border-left: 5px solid rgb(70, 116, 238);
  background: rgba(70, 116, 238, .2);
  color: rgba(70, 116, 238);
}


/* content main section */
.lecture-view-content__main {
  display: flex;
  flex-direction: column;
  margin: 1.5rem 2rem 2.5rem 2rem;
  width: 100%;
}

.lecture-view-content__main-header-text {
  color: rgba(0, 0, 0, .6);
}


/* content slide section */
.lecture-view-content__slide {
  margin-top: 1rem;
  background: rgba(32, 41, 83, .9);
  border-radius: 1rem;
  box-shadow: 0 0 13px -5px #000000;
  display: flex;
  justify-content: center;
  width: calc(100vw - 7.2rem);
  height: 100%;
  color: white;
  position: relative;
}

.lecture-view-content__slide-content {
  height: calc(100vh - 9.8rem);
  flex: 1;
  width: 100%;
  padding: 1rem 1.5rem;
  z-index: 998;
}

.lecture-view-content__slide-content-right {
  border-left: 1px solid white;
}

.lecture-view-content__slide-markdown {
  overflow: auto;
  width: calc((100vw - 13.2rem) / 2);
  height: 100%;
  padding: .2rem;
}

/* content page */
.lecture-view-content__slide-page-btn {
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
}

.lecture-view-content__slide-page-btn-left {
  margin-left: -2rem;
  justify-content: flex-start;
}

.lecture-view-content__slide-page-btn-right {
  justify-content: flex-end;
  margin-right: -2rem;
}

.lecture-view-content__slide-page-btn-circle {
  z-index: 999;
  background: white;
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 16px -5px #000000;
  cursor: pointer;
}

.lecture-view-content__slide-page-btn-icon {
  color: black;
  font-size: 1.2rem;
}

/* content scrollbar */
.lecture-view-content__slide ::-webkit-scrollbar {
  height: 5px;
  width: 5px;
}

/* Track */
.lecture-view-content__slide ::-webkit-scrollbar-track {
  background: none;
}

/* Handle */
.lecture-view-content__slide ::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, .7);
  border-radius: 1rem;
}

/* Handle on hover */
.lecture-view-content__slide ::-webkit-scrollbar-thumb:hover {
  /*background: #cccccc;*/
}
</style>
