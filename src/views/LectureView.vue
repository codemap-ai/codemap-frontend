<template>
  <Navbar dropdown="강의" title="정렬" title_desc="현재 강의"/>
  <div :class="$style['lecture-view-content']">
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
        <div :class="$style['lecture-view-content__slide-content']">
          <vue3-markdown-it :class="$style['lecture-view-content__slide-markdown']" :source="chapters[chapterIndex].pages[pageIndex][0]"/>
        </div>
        <div v-if="chapters[chapterIndex].pages[pageIndex].length > 1" :class="[$style['lecture-view-content__slide-content'], $style['lecture-view-content__slide-content-right']]">
          <vue3-markdown-it :class="$style['lecture-view-content__slide-markdown']" :source="chapters[chapterIndex].pages[pageIndex][1]"/>
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

export default {
  name: 'LectureView',
  components: {Navbar},
  data() {
    return {
      intervalId: [],
      chapterIndex: 0,
      pageIndex: 0,
      lockedForRender: false,
      chapters: [],
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
  },
  created() {
    this.chapters = JSON.parse('[{"title":"버블 정렬","pages":[["## 버블 정렬\\n\\n거품 정렬 또는 버블 정렬( - 整列, 영어: bubble sort, sinking sort)은 두 인접한 원소를 검사하여 정렬하는 방법이다. 시간 복잡도가 $O(n^{2})$로 상당히 느리지만, 코드가 단순하기 때문에 자주 사용된다. 원소의 이동이 거품이 수면으로 올라오는 듯한 모습을 보이기 때문에 지어진 이름이다\\n\\n오름차순으로 정렬하는 버블 정렬의 과정은 다음과 같다.","```\\n55 07 78 12 42  초기값[파란색은 sorting]\\n07 55 78 12 42  첫 번째 패스(pass)\\n07 55 78 12 42\\n07 55 12 78 42\\n07 55 12 42 78  두 번째 패스(pass)\\n07 55 12 42 78\\n07 12 55 42 78\\n07 12 42 55 78  세 번째 패스(pass)\\n07 12 42 55 78  네 번째 패스(pass)\\n07 12 42 55 78  다섯 번째 패스(pass)\\n07 12 42 55 78  정렬 끝\\n```"],["#### C++ 코드\\n\\n```cpp\\n#include <iostream>\\nusing namespace std;\\n#include <iomanip>\\nusing std::setw;\\n\\nvoid printBubbles(const int bubbles[], const int n);\\nvoid lineup(int& large, int& small);\\nint main()\\n{\\n\\tconst int n = 10;\\n\\tint bubbles[n] = { 2, 6, 4, 8, 10, 12, 89, 68, 45, 37 };\\n\\n\\tcout << \\"Data items in original order\\\\n\\";\\n\\tprintBubbles(bubbles, n);\\n\\tfor (int level = 0; level < n - 1; level++) {\\n\\t\\tfor (int i = 0; i < n - level - 1; i++) {\\n\\t\\t\\tif (bubbles[i] > bubbles[i + 1])\\n\\t\\t\\t\\tlineup(bubbles[i], bubbles[i + 1]);\\n\\t\\t}\\n\\t}\\n\\tcout << \\"\\\\nData items in ascending order\\\\n\\";\\n\\tprintBubbles(bubbles, n);\\n\\treturn 0;\\n}\\n\\nvoid printBubbles(const int bubbles[], const int n) {\\n\\tfor (int i = 0; i < n; i++)\\n\\t\\tcout << setw(4) << bubbles[i];\\n\\tcout << endl;\\n}\\nvoid lineup(int& large, int& small) {\\n\\tint save = large;\\n\\tlarge = small;\\n\\tsmall = save;\\n}\\n```","#### 파이썬 코드\\n\\n```python\\ndef bubbleSort(x):\\n\\tlength = len(x)-1\\n\\tfor i in range(length):\\n\\t\\tfor j in range(length-i):\\n\\t\\t\\tif x[j] > x[j+1]:\\n\\t\\t\\t\\tx[j], x[j+1] = x[j+1], x[j]\\n\\treturn x\\n```"],["test3","asdfdasf"]]},{"title":"병합 정렬","pages":[["## 병합 정렬\\n구간 $[1, N]$을 정렬하기 위해서, 구간 $[1, \\\\lfloor \\\\frac{N}{2} \\\\rfloor]$, $[\\\\lfloor \\\\frac{N}{2} \\\\rfloor + 1, N]$을 각각 정렬한 뒤, 이미 정렬된 두 하위 구간을 합쳐서 정렬된 배열을 만든다."]]}]');
    this.intervalId.push(setInterval(this.renderMathJax, 100));
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
  height: calc(100vh - 10rem - 1px);
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
