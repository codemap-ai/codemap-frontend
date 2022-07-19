<template>
  <div style="display: flex; width: 100%; border-bottom: 1px solid rgba(0, 0, 0, .1);">
    <div style="padding: 0.7rem; border-right: 1px solid rgba(0, 0, 0, .1);">
      <div
          style="width: 2.1rem; height: 2.1em; display: flex; justify-content: center; align-items: center; align-content: center; background: rgba(52, 118, 246, .2); border-radius: .5rem;">
        <div style="font-size: 1.5rem; font-weight: 900; color: #3476f6;">
          C
        </div>
      </div>
    </div>
    <div
        style="font-weight: 700; padding: 0.5rem 2rem; border-right: 1px solid rgba(0, 0, 0, .1); display: flex; justify-content: center; align-items: center;">
      강의<span style="margin-left: .5rem;" class="mdi mdi-chevron-down"></span>
    </div>
    <div style="padding: 0.5rem 1.5rem; display: flex; align-items: center; font-weight: 500;">
      <span
          style="background: rgba(0, 0, 0, .15); border-radius: 5rem; padding: .3rem .7rem; font-size: .8rem; color: black; margin-right: .5rem;">현재 강의</span>
      <span style="color: rgba(0, 0, 0, .6);">정렬</span>
    </div>
  </div>
  <div style="display: flex; background: rgb(96, 109, 173, .1);">
    <div
        style="width: 3.6rem; height: calc(100vh - 3.5rem - 1px); border-right: 1px solid rgba(0, 0, 0, .1); background: white;">
      <div
          style="display: flex; justify-content: center; align-items: center; width: 3.5rem; height: 3.5rem; font-size: 1.5rem; border-bottom: 1px solid rgba(0, 0, 0, .1);">
        <span class="mdi mdi-view-headline"></span></div>
      <div
          style="display: flex; justify-content: center; align-items: center; width: 3.5rem; height: 3.5rem; font-size: 1.2rem; border-bottom: 1px solid rgba(0, 0, 0, .1);">
        1
      </div>
      <div
          style="display: flex; justify-content: center; align-items: center; width: 3.5rem; height: 3.5rem; font-size: 1.2rem; border-bottom: 1px solid rgba(0, 0, 0, .1);">
        2
      </div>
      <div
          style="display: flex; justify-content: center; align-items: center; width: 3.5rem; height: 3.5rem; font-size: 1.2rem; border-bottom: 1px solid rgba(0, 0, 0, .1);">
        3
      </div>
    </div>
    <div style="display: flex; flex-direction: column; margin: 1.5rem 2rem 2.5rem 2rem; width: 100%;;">
      <div style="color: rgba(0, 0, 0, .6);">{{ chapters[chapterIndex].title }}</div>
      <div
          style="margin-top: 1rem; background: rgba(32, 41, 83, .9); width: 100%; height: 100%; border-radius: 1rem; box-shadow: 0 0 13px -5px #000000;">
        <div
            style="display: flex; justify-content: center; width: 100%; height: 100%; color: white; position: relative;">
          <vue3-markdown-it
              style="height: 100%; width: 100%; padding: 1rem 2rem; flex: 1; z-index: 999;"
              :source="chapters[chapterIndex].pages[pageIndex][0]"></vue3-markdown-it>
          <vue3-markdown-it v-if="chapters[chapterIndex].pages[pageIndex].length === 2"
                            style="z-index: 998; height: 100%; width: 100%; border-left: 1px solid white;  padding: 1rem 2rem; flex: 1;"
                            :source="chapters[chapterIndex].pages[pageIndex][1]"></vue3-markdown-it>
          <div
              style="position: absolute; display: flex; width: 100%; height: 100%; align-items: center; justify-content: flex-start; margin-left: -2rem;">
            <div
                style="z-index: 999; background: white; width: 2rem; height: 2rem; border-radius: 1rem; display: flex; justify-content: center; align-items: center; box-shadow: 0 0 16px -5px #000000; cursor: pointer;"
                @click="prevPage">
              <span style="color: black; font-size: 1.2rem;" class="mdi mdi-chevron-left"></span>
            </div>
          </div>
          <div
              style="position: absolute; display: flex; width: 100%; height: 100%; align-items: center; justify-content: flex-end; margin-right: -2rem;">
            <div
                style="z-index: 999; background: white; width: 2rem; height: 2rem; border-radius: 1rem; display: flex; justify-content: center; align-items: center; box-shadow: 0 0 16px -5px #000000; cursor: pointer;"
                @click="nextPage">
              <span style="color: black; font-size: 1.2rem;" class="mdi mdi-chevron-right"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'highlight.js/styles/monokai.css';

export default {
  name: 'App',
  data() {
    return {
      intervalId: [],
      chapterIndex: 0,
      pageIndex: 0,
      chapters: [
        {
          title: "버블 정렬",
          pages: [
            ["## 버블 정렬\n\n거품 정렬 또는 버블 정렬( - 整列, 영어: bubble sort, sinking sort)은 두 인접한 원소를 검사하여 정렬하는 방법이다. 시간 복잡도가 $O(n^{2})$로 상당히 느리지만, 코드가 단순하기 때문에 자주 사용된다. 원소의 이동이 거품이 수면으로 올라오는 듯한 모습을 보이기 때문에 지어진 이름이다\n\n오름차순으로 정렬하는 버블 정렬의 과정은 다음과 같다.", "```\n" +
            "55 07 78 12 42  초기값[파란색은 sorting]\n" +
            "07 55 78 12 42  첫 번째 패스(pass)\n" +
            "07 55 78 12 42\n" +
            "07 55 12 78 42\n" +
            "07 55 12 42 78  두 번째 패스(pass)\n" +
            "07 55 12 42 78\n" +
            "07 12 55 42 78\n" +
            "07 12 42 55 78  세 번째 패스(pass)\n" +
            "07 12 42 55 78  네 번째 패스(pass)\n" +
            "07 12 42 55 78  다섯 번째 패스(pass)\n" +
            "07 12 42 55 78  정렬 끝\n" +
            "```"], // chapter 1
            ["test2"], // chapter 2
            ["test3", "asdfdasf"], // chapter 3
          ],
        },
      ],
    };
  },
  methods: {
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
    },
    async renderMathJax() {
      while (typeof MathJax?.typeset !== "function") {
        await new Promise(r => setTimeout(r, 50));
      }
      MathJax.typeset();
    },
  },
  updated() {
    // this.renderMathJax();
  },
  created() {
    // this.renderMathJax();
    this.intervalId.push(setInterval(this.renderMathJax, 100));
  },
  beforeMount() {
    for (let id of this.intervalId) {
      clearInterval(id);
    }
  },
  watch: {
    chapters() {
      // this.renderMathJax();
    },
  },
}
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css");
@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.5/dist/web/static/pretendard.css");
@import url("https://cdn.jsdelivr.net/npm/@mdi/font@6.9.96/css/materialdesignicons.min.css");

* {
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  box-sizing: border-box;
}
</style>
