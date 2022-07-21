<template>
  <div :class="$style['problem-solve-view-navbar']">
    <div :class="$style['problem-solve-view-navbar__logo']">
      <div :class="$style['problem-solve-view-navbar__logo-text']">C</div>
    </div>
    <div :class="$style['problem-solve-view-navbar__dropdown-value']">문제<span style="margin-left: .5rem;" class="mdi mdi-chevron-down"></span>
    </div>
    <div :class="$style['problem-solve-view-navbar__detail']">
      <span :class="$style['problem-solve-view-navbar__current-lecture']">현재 문제</span>
      <span>A + B</span>
    </div>
  </div>
  <div :class="$style['problem-solve-view-content']">
    <div :class="$style['problem-solve-view-content__sidebar']">
      <div :class="$style['problem-solve-view-content__sidebar-expand-btn']">
        <span class="mdi mdi-view-headline"></span></div>
      <div v-for="(_, index) in problems" :key="index"
           :class="[$style['problem-solve-view-content__sidebar-menu'], {[$style['problem-solve-view-content__sidebar-menu-enabled']]: problemIndex === index}]"
           @click="problemIndex = index;">
        {{ index + 1 }}
      </div>
    </div>
    <div style="display: flex; justify-content: center; flex: 1;">
      <div style="width: calc((100vw - 3.5rem - 1px) / 2); height: calc(100vh - 3.5rem - 1px); padding: 2rem; overflow-y: auto;">
        <div style="font-weight: 600; font-size: 2rem;">A + B</div>
        <div style="color: rgba(0, 0, 0, .6); margin-top: 1rem;">
          <div>
            <span style="display: inline-block; width: 10rem; text-align: left;"><span class="mdi mdi-trending-up" style="margin-right: .5rem;"></span>획득 점수</span>
            <span><span style="font-weight: 700; color: black;">100</span> / 100점</span>
          </div>
          <div style="margin-top: 1.5rem;">
            <span style="display: inline-block; width: 10rem; text-align: left;"><span class="mdi mdi-clock-time-three-outline" style="margin-right: .5rem;"></span>시간 제한</span>
            <span style="font-weight: 700; color: black;">1초</span>
          </div>
          <div style="margin-top: .5rem;">
            <span style="display: inline-block; width: 10rem; text-align: left;"><span class="mdi mdi-memory" style="margin-right: .5rem;"></span>메모리 제한</span>
            <span style="font-weight: 700; color: black;">1,024MiB</span>
          </div>
        </div>
        <div style="margin-top: 3rem; border-bottom: 1px solid rgba(0, 0, 0, .1);">
          <div style="display: flex; border-bottom: 1px solid rgba(0, 0, 0, .1);">
            <div style="border-bottom: 3px solid rgba(0, 0, 0, 1); padding: .5rem .9rem; font-weight: 600;">제출</div>
          </div>
          <div style="display: flex; flex-direction: column; max-height: 10rem; overflow-y: auto; padding-right: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-bottom: 1px solid rgba(0, 0, 0, .1);">
              <div>{{ (new Date()).toLocaleString() }}</div>
              <div style="font-weight: 700;">100점</div>
              <div>C++17</div>
              <div :class="$style.detail"><span class="mdi mdi-archive-outline"></span></div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-bottom: 1px solid rgba(0, 0, 0, .1);">
              <div>{{ (new Date()).toLocaleString() }}</div>
              <div style="font-weight: 700;">100점</div>
              <div>C++17</div>
              <div :class="$style.detail"><span class="mdi mdi-archive-outline"></span></div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-bottom: 1px solid rgba(0, 0, 0, .1);">
              <div>{{ (new Date()).toLocaleString() }}</div>
              <div style="font-weight: 700;">100점</div>
              <div>C++17</div>
              <div :class="$style.detail"><span class="mdi mdi-archive-outline"></span></div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-bottom: 1px solid rgba(0, 0, 0, .1);">
              <div>{{ (new Date()).toLocaleString() }}</div>
              <div style="font-weight: 700;">100점</div>
              <div>C++17</div>
              <div :class="$style.detail"><span class="mdi mdi-archive-outline"></span></div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-bottom: 1px solid rgba(0, 0, 0, .1);">
              <div>{{ (new Date()).toLocaleString() }}</div>
              <div style="font-weight: 700;">100점</div>
              <div>C++17</div>
              <div :class="$style.detail"><span class="mdi mdi-archive-outline"></span></div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 0;">
              <div>{{ (new Date()).toLocaleString() }}</div>
              <div style="font-weight: 700;">100점</div>
              <div>C++17</div>
              <div :class="$style.detail"><span class="mdi mdi-archive-outline"></span></div>
            </div>
          </div>
        </div>
        <vue3-markdown-it style="margin-top: 3rem;" :source="problems[problemIndex].statement.body"/>
        
        <div style="font-weight: 600; font-size: 1.3rem; margin-top: 2rem; padding-bottom: .4rem; width: 100%; border-bottom: 1px solid rgba(0, 0, 0, .1);">입력</div>
        <vue3-markdown-it style="margin-top: 0;" :source="problems[problemIndex].statement.input"/>
        
        <div style="font-weight: 600; font-size: 1.3rem; margin-top: 2rem; padding-bottom: .4rem; width: 100%; border-bottom: 1px solid rgba(0, 0, 0, .1);">출력</div>
        <vue3-markdown-it style="margin-top: 0;" :source="problems[problemIndex].statement.output"/>
      </div>
      <div style="position: relative; width: calc((100vw - 3.5rem - 1px) / 2); height: calc(100vh - 3.5rem - 1px); padding: 2.5rem 0 5rem 0; background: rgb(30, 30, 30);">
        <monaco-editor class="editor" language="cpp" v-model:value="code" theme="vs-dark" :options="{automaticLayout: true,}"/>
        <div style="position: absolute; display: flex; justify-content: space-between; bottom: 0; left: 0; right: 0; padding: 1rem;">
          <div style="flex: 3; display: flex; justify-content: center; background: white; padding: 1rem; margin-right: 1rem;">C++17</div>
          <!--          <div style="flex: 1; display: flex; justify-content: center; background: white; padding: 1rem; margin-right: 1rem;">테스트하기</div>-->
          <div style="flex: 1; display: flex; justify-content: center; background: white; padding: 1rem;">제출</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MonacoEditor from 'monaco-editor-vue3';


export default {
  name: 'ContestSolveView',
  components: {
    MonacoEditor
  },
  data() {
    return {
      intervalId: [],
      problemIndex: 0,
      lockedForRender: false,
      problems: [],
      code: "#include <bits/stdc++.h>\n\nusing namespace std;\n\nint main() {\n\tcout << \"Hello, World\";\n}\n",
    };
  },
  methods: {
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
  computed: {},
  created() {
    this.problems = [{
      title: "A + B",
      statement: {
        body: "두 정수 $A$와 $B$를 입력받은 다음, $A+B$를 출력하는 프로그램을 작성하시오.",
        input: "첫째 줄에 $A$와 $B$가 주어진다. ($0 \\lt A,\\ B \\lt 10$)",
        output: "첫째 줄에 $A+B$를 출력한다.",
      }
    }];
    this.intervalId.push(setInterval(this.renderMathJax, 100));
  },
}
</script>

<style module scoped>
/* navbar */
.problem-solve-view-navbar {
  display: flex;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
}

.problem-solve-view-navbar__logo {
  padding: 0.7rem;
  border-right: 1px solid rgba(0, 0, 0, .1);
}

.problem-solve-view-navbar__logo-text {
  width: 2.1rem;
  height: 2.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  background: rgba(52, 118, 246, .2);
  border-radius: .5rem;
  font-size: 1.5rem;
  font-weight: 900;
  color: #3476f6;
}

.problem-solve-view-navbar__dropdown-value {
  font-weight: 700;
  padding: 0.5rem 2rem;
  border-right: 1px solid rgba(0, 0, 0, .1);
  display: flex;
  justify-content: center;
  align-items: center;
}

.problem-solve-view-navbar__detail {
  padding: 0.5rem 1.5rem;
  display: flex;
  align-items: center;
  font-weight: 500;
  color: rgba(0, 0, 0, .6);
}

.problem-solve-view-navbar__current-lecture {
  background: rgba(0, 0, 0, .15);
  border-radius: 5rem;
  padding: .3rem .7rem;
  font-size: .8rem;
  color: black;
  margin-right: .5rem;
}

/* content body */
.problem-solve-view-content {
  display: flex;
  /*background: rgb(96, 109, 173, .1);*/
}

.problem-solve-view-content__sidebar {
  width: 3.6rem;
  height: calc(100vh - 3.5rem - 1px);
  border-right: 1px solid rgba(0, 0, 0, .1);
  background: white;
}

.problem-solve-view-content__sidebar-expand-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.5rem;
  height: 3.5rem;
  font-size: 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
}

.problem-solve-view-content__sidebar-menu {
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

.problem-solve-view-content__sidebar-menu-enabled {
  border-left: 5px solid rgb(70, 116, 238);
  background: rgba(70, 116, 238, .2);
  color: rgba(70, 116, 238);
}


/* content main */
.problem-solve-view-content__main {
  padding: 2rem;
}

.detail {
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  
  width: 1.9rem;
  height: 1.9rem;
  
  transition: .4s;
  border-radius: 10rem;
  padding: .4rem;
  cursor: pointer;
  font-size: 1.1rem;
}

.detail:hover {
  background: rgba(0, 0, 0, .1);
}

</style>
