<template>
  <Navbar dropdown="문제" :title="`${ contestMode ? `${problemIndex + 1}. ` : '' }${currentProblem.title}`" title_desc="현재 문제"/>
  <div :class="$style['problem-solve-view-content']">
    <div :class="$style['problem-solve-view-content__sidebar']" v-if="contestMode">
      <div :class="$style['problem-solve-view-content__sidebar-expand-btn']">
        <span class="mdi mdi-view-headline"></span></div>
      <div v-for="(_, index) in problems" :key="index"
           :class="[$style['problem-solve-view-content__sidebar-menu'], {[$style['problem-solve-view-content__sidebar-menu-enabled']]: problemIndex === index}]"
           @click="problemIndex = index;">
        {{ index + 1 }}
      </div>
    </div>
    <div :class="$style['problem-solve-view-content__main']">
      <div :class="$style['problem-solve-view-content__main-problem']">
        <div :class="$style['problem-solve-view-content__main-problem-title']">
          {{ contestMode ? `${problemIndex + 1}. ` : "" }}{{ currentProblem.title }}
        </div>
        <div :class="$style['problem-solve-view-content__main-problem-info']">
          <div>
            <span :class="$style['problem-solve-view-content__main-problem-info-key']"><span class="mdi mdi-trending-up" style="margin-right: .5rem;"></span>획득 점수</span>
            <span><span :class="$style['problem-solve-view-content__main-problem-info-value']">{{ Math.max(...submissions.map(({score}) => score)) }}</span> / 100점</span>
          </div>
          <div style="margin-top: 1rem;">
            <span :class="$style['problem-solve-view-content__main-problem-info-key']"><span class="mdi mdi-clock-time-three-outline" style="margin-right: .5rem;"></span>시간 제한</span>
            <span :class="$style['problem-solve-view-content__main-problem-info-value']">{{ currentProblem.limits.seconds }}초</span>
          </div>
          <div style="margin-top: .5rem;">
            <span :class="$style['problem-solve-view-content__main-problem-info-key']"><span class="mdi mdi-memory" style="margin-right: .5rem;"></span>메모리 제한</span>
            <span :class="$style['problem-solve-view-content__main-problem-info-value']">{{ currentProblem.limits.memory.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}MiB</span>
          </div>
        </div>
        <div :class="$style['problem-solve-view-content__main-submission']">
          <div :class="$style['problem-solve-view-content__main-submission-header']">
            <div :class="$style['problem-solve-view-content__main-submission-header-text']">제출</div>
          </div>
          <div :class="$style['problem-solve-view-content__main-submission-list']">
            <div v-for="({submission_id, date, score, language}) in submissions" :key="submission_id" :class="$style['problem-solve-view-content__main-submission-list-element']">
              <div>{{ (new Date(date)).toLocaleString() }}</div>
              <div style="font-weight: 700;">{{ score }}점</div>
              <div>{{ language }}</div>
              <div :class="$style['problem-solve-view-content__main-submission-detail-btn']"><span class="mdi mdi-archive-outline"></span></div>
            </div>
          </div>
        </div>
        
        <vue3-markdown-it style="margin-top: 2rem;" :source="currentProblem.statement.body"/>
        
        <div :class="$style['problem-solve-view-content__main-statement-header']">입력</div>
        <vue3-markdown-it :class="$style['problem-solve-view-content__main-statement-body']" :source="currentProblem.statement.input"/>
        
        <div :class="$style['problem-solve-view-content__main-statement-header']">출력</div>
        <vue3-markdown-it :class="$style['problem-solve-view-content__main-statement-body']" :source="currentProblem.statement.output"/>
      </div>
      <div :class="[$style['problem-solve-view-content__main-editor'], {[['problem-solve-view-content__main-editor--contest-mode']]: contestMode}]">
        <monaco-editor class="editor" language="cpp" theme="vs-dark" :value="code" :options="{automaticLayout: true,}"/>
        <div :class="$style['problem-solve-view-content__main-editor-menu']">
          <div :class="$style['problem-solve-view-content__main-editor-menu-btn']" style="flex: 3;">C++17</div>
          <div :class="$style['problem-solve-view-content__main-editor-menu-btn']" style="flex: 1;" @click="submitCode">제출</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MonacoEditor from 'monaco-editor-vue3';
import Navbar from "@/components/Navbar";

export default {
  name: 'ProblemView',
  components: {
    Navbar,
    MonacoEditor
  },
  data() {
    return {
      intervalId: [],
      lockedForRender: false,
      
      contestMode: true,
      
      problemIndex: 0,
      problems: [],
      
      code: "#include <bits/stdc++.h>\n\nusing namespace std;\n\nint main() {\n\tcout << \"Hello, World\";\n}\n",
      submissions: [],
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
    async submitCode() {
      console.log(this.code);
    },
  },
  computed: {
    currentProblem() {
      return this.problems[this.problemIndex];
    },
  },
  created() {
    this.problems = [{
      title: "A + B",
      statement: {
        body: "두 정수 $A$와 $B$를 입력받은 다음, $A+B$를 출력하는 프로그램을 작성하시오.",
        input: "첫째 줄에 $A$와 $B$가 주어진다. ($0 \\lt A,\\ B \\lt 10$)",
        output: "첫째 줄에 $A+B$를 출력한다.",
      },
      limits: {
        seconds: 1,
        memory: 1024,
      },
    }];
    for (let i = 0; i < 7; i++) {
      this.submissions.push({
        submission_id: i,
        date: Date.now(),
        score: 100,
        language: "C++17",
      });
    }
    
    this.intervalId.push(setInterval(this.renderMathJax, 100));
  },
}
</script>

<style module scoped>
/* content body */
.problem-solve-view-content {
  display: flex;
  /*background: rgb(96, 109, 173, .1);*/
}

.problem-solve-view-content__sidebar {
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
  display: flex;
  justify-content: center;
  flex: 1;
}

.problem-solve-view-content__main-problem {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

.problem-solve-view-content__main-problem-title {
  font-weight: 600;
  font-size: 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  padding-bottom: .5rem;
}

.problem-solve-view-content__main-problem-info {
  color: rgba(0, 0, 0, .6);
  margin-top: 1.5rem;
}

.problem-solve-view-content__main-problem-info-key {
  display: inline-block;
  width: 10rem;
  text-align: left;
}

.problem-solve-view-content__main-problem-info-value {
  font-weight: 700;
  color: black;
}

.problem-solve-view-content__main-submission {
  margin-top: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
}

.problem-solve-view-content__main-submission-header {
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
}

.problem-solve-view-content__main-submission-header-text {
  border-bottom: 3px solid rgba(0, 0, 0, 1);
  padding: .5rem .9rem;
  font-weight: 600;
}

.problem-solve-view-content__main-submission-list {
  display: flex;
  flex-direction: column;
  max-height: 11rem;
  overflow-y: auto;
}

.problem-solve-view-content__main-submission-list-element {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .7rem .7rem .7rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
}

.problem-solve-view-content__main-submission-list-element:nth-last-child(1) {
  border-bottom: none;
}

.problem-solve-view-content__main-submission-detail-btn {
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

.problem-solve-view-content__main-submission-detail-btn:hover {
  background: rgba(0, 0, 0, .1);
}

.problem-solve-view-content__main-statement-header {
  font-weight: 600;
  font-size: 1.3rem;
  margin-top: 2rem;
  padding-bottom: .4rem;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
}

.problem-solve-view-content__main-statement-body {
  margin-top: 0;
}

/**
 3.5rem + 1px는 sidebar의 width와 border 크기
 */
.problem-solve-view-content__main-editor {
  position: relative;
  width: calc(50vw);
  height: calc(100vh - 3.5rem - 1px);
  padding: 2.5rem 0 5rem 0;
  background: rgb(30, 30, 30);
}

.problem-solve-view-content__main-editor--contest-mode {
  width: calc((100vw - 3.5rem - 1px) / 2);
}

.problem-solve-view-content__main-editor-menu {
  position: absolute;
  display: flex;
  justify-content: space-between;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
}

.problem-solve-view-content__main-editor-menu-btn {
  display: flex;
  justify-content: center;
  background: white;
  padding: 1rem;
  margin-right: 1rem;
  cursor: pointer;
}

.problem-solve-view-content__main-editor-menu-btn:nth-last-child(1) {
  margin-right: 0;
}

</style>
