<template>
  <Navbar v-if="problemIndex > -1" dropdown="문제" :title="`${ contestMode ? `${problemIndex + 1}. ` : '' }${currentProblem.title}`" title_desc="현재 문제"/>
  <div v-if="problemIndex === -1"></div>
  <div v-else :class="$style['problem-solve-view-content']">
    <div :class="$style['problem-solve-view-content__sidebar']" v-if="contestMode">
      <div :class="$style['problem-solve-view-content__sidebar-expand-btn']">
        <span class="mdi mdi-view-headline"></span></div>
      <div v-for="(_, index) in problems" :key="index"
           :class="[$style['problem-solve-view-content__sidebar-menu'], {[$style['problem-solve-view-content__sidebar-menu-enabled']]: problemIndex === index}]"
           @click="moveProblem(index);">
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
            <span><span :class="$style['problem-solve-view-content__main-problem-info-value']">{{ Math.max(...submissions.map(({score}) => score), 0) }}</span> / 100점</span>
          </div>
          <div style="margin-top: 1rem;">
            <span :class="$style['problem-solve-view-content__main-problem-info-key']"><span class="mdi mdi-clock-time-three-outline" style="margin-right: .5rem;"></span>시간 제한</span>
            <span :class="$style['problem-solve-view-content__main-problem-info-value']">{{ Math.floor(currentProblem.timeLimit * 100) / 100 }}초</span>
          </div>
          <div style="margin-top: .5rem;">
            <span :class="$style['problem-solve-view-content__main-problem-info-key']"><span class="mdi mdi-memory" style="margin-right: .5rem;"></span>메모리 제한</span>
            <span :class="$style['problem-solve-view-content__main-problem-info-value']">{{ Math.floor(currentProblem.memoryLimit / 1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}MiB</span>
          </div>
        </div>
        <div :class="$style['problem-solve-view-content__main-submission']">
          <div :class="$style['problem-solve-view-content__main-submission-header']">
            <div :class="$style['problem-solve-view-content__main-submission-header-text']">제출</div>
          </div>
          <div :class="$style['problem-solve-view-content__main-submission-list']">
            <div v-if="submissions.length > 0" v-for="({submissionId, submitDate, score, usedLanguage, result}, index) in submissions" :key="submissionId"
                 :class="$style['problem-solve-view-content__main-submission-list-element']">
              <div style="flex: 5;">{{ submitDate.toLocaleString() }}</div>
              <div v-if="result !== 'WAITING'" style="font-weight: 700; flex: 3;">{{ score }}점</div>
              <div v-else style="flex: 3;">채점 중</div>
              <div style="flex: 3;">{{ usedLanguage }}</div>
              <div :class="$style['problem-solve-view-content__main-submission-detail-btn']" @click="submissionIndex = index;"><span class="mdi mdi-archive-outline"></span></div>
            </div>
            <div v-else :class="$style['problem-solve-view-content__main-submission-list-element']" style="color: rgba(0, 0, 0, .6); font-style: italic; font-size: .9rem; margin: .5rem 0;">
              제출 기록 없음
            </div>
          </div>
        </div>
        
        <vue3-markdown-it style="margin-top: 2rem;" :source="currentProblem.body"/>
        
<!--        <div :class="$style['problem-solve-view-content__main-statement-header']">입력</div>
        <vue3-markdown-it :class="$style['problem-solve-view-content__main-statement-body']" :source="currentProblem.statement.input"/>
        
        <div :class="$style['problem-solve-view-content__main-statement-header']">출력</div>
        <vue3-markdown-it :class="$style['problem-solve-view-content__main-statement-body']" :source="currentProblem.statement.output"/>-->
      </div>
      <div :class="[$style['problem-solve-view-content__main-editor'], {[['problem-solve-view-content__main-editor--contest-mode']]: contestMode}]">
        <MonacoEditor class="editor" language="cpp" theme="vs-dark" :value="code" :options="{automaticLayout: true, scrollBeyondLastLine: false,}" @change="onChangeCode"/>
        <div :class="$style['problem-solve-view-content__main-editor-menu']">
          <Dropdown :class="$style['problem-solve-view-content__main-editor-menu-btn']" style="flex: 3;" :options="[['C++17'], ['Java'], ['Python']]" :direction="true" :default_value="language"
                    @change="changeLanguage"/>
          <!--          <div :class="$style['problem-solve-view-content__main-editor-menu-btn']" style="flex: 3;">C++17</div>-->
          <div
              :class="[$style['problem-solve-view-content__main-editor-menu-btn'], $style['problem-solve-view-content__main-editor-menu-btn-submit'], {[$style['problem-solve-view-content__main-editor-menu-btn-submit--disabled']]: submitDisabled}]"
              style="flex: 1;" @click="submitCode">제출
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="currentSubmission !== null"
       style="position: fixed; top: 0; bottom: 0; left: 0; right: 0; z-index: 1000; background: rgba(0, 0, 0, .2); backdrop-filter: blur(2px); width: 100vw; height: 100vh; display: flex; justify-content: center; align-content: center; align-items: center;"
       @click.stop="submissionIndex = -1">
    <div style="width: 80vw; height: 70vh; background: white; padding: 1.5rem; overflow-y: auto; box-shadow: 0 0 13px -20px #000000;" @click.stop="">
      <div style="display: flex; justify-content: space-between;">
        <div style="flex: 1;">
          <div style="font-weight: 500; font-size: 1.8rem; margin-top: .3rem;">제출 결과</div>
          <div style="margin-top: .5rem;">제출 시간 : {{ currentSubmission.submitDate.toLocaleString() }}</div>
          <div style="margin-top: 2rem; color: rgba(0, 0, 0, .7);">
            <span :class="$style['problem-solve-view-content__main-problem-info-key']"><span class="mdi mdi-trending-up" style="margin-right: .5rem;"></span>획득 점수</span>
            <span><span :class="$style['problem-solve-view-content__main-problem-info-value']">{{ currentSubmission.score }}</span> / 100점</span>
          </div>
          <div style="margin-top: 1rem; color: rgba(0, 0, 0, .7)">
            <span :class="$style['problem-solve-view-content__main-problem-info-key']"><span class="mdi mdi-clock-time-three-outline" style="margin-right: .5rem;"></span>실행 시간</span>
            <span :class="$style['problem-solve-view-content__main-problem-info-value']">{{ Math.floor(currentSubmission.executeTime * 1000) / 1000 }}초</span>
          </div>
          <div style="margin-top: .5rem; color: rgba(0, 0, 0, .7)">
            <span :class="$style['problem-solve-view-content__main-problem-info-key']"><span class="mdi mdi-memory" style="margin-right: .5rem;"></span>사용 메모리</span>
            <span :class="$style['problem-solve-view-content__main-problem-info-value']">{{ Math.floor(currentSubmission.usedMemory / 1024 * 1000) / 1000 }}MiB</span>
          </div>
          <div style="font-weight: 500; font-size: 1.2rem; margin-top: 3rem;">코드 ({{ currentSubmission.usedLanguage }})</div>
        </div>
        <div @click="submissionIndex = -1" style="color: rgba(0, 0, 0, .8); cursor: pointer; font-size: 2rem;">
          <span class="mdi mdi-close"></span>
        </div>
      </div>
      <monaco-editor :value="currentSubmission.submitCode" theme="vs-dark" class="editor" language="cpp" style="width: calc(80vw - 4.2rem); margin: 1rem 0 2rem 0;"
                     :options="{automaticLayout: true, readOnly: true, scrollBeyondLastLine: false, minimap: {enabled: false},}"></monaco-editor>
    </div>
  </div>
</template>

<script>
import MonacoEditor from 'monaco-editor-vue3';
import {Stomp} from '@stomp/stompjs';
import SockJS from 'sockjs-client';

import Navbar from "@/components/Navbar";
import Dropdown from "@/components/Dropdown";
import api from "@/api";
import axios from "axios";

export default {
  name: 'ProblemView',
  components: {
    Dropdown,
    Navbar,
    MonacoEditor
  },
  data() {
    return {
      intervalId: [],
      lockedForRender: false,
      
      contestMode: true,
      problemSetId: 1,
      contestId: -1,
      
      problemIndex: -1,
      problemId: -1,
      problems: [],
  
      defaultCode: "#include <bits/stdc++.h>\n\nusing namespace std;\n\nint main() {\n\tcout << \"Hello, World\";\n}\n",
      code: "",
      language: "C++17",
      
      submitDisabled: true,
      subscribeIds: null,
      
      submissions: [],
      submissionIndex: -1,
      
      socket: null,
      sockedConnected: false,
    };
  },
  methods: {
    onChangeCode(value) {
      this.code = value;
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
    async submitCode() {
      if (this.submitDisabled) {
        return;
      }
      this.submitDisabled = true;
      
      let submissionId = (await api.submit(3, -1, "c++17", this.code)).submissionId;
      let {id} = this.socket.subscribe("/topic/chat/room/" + submissionId, message => {
        this.socket.unsubscribe(id);
        this.subscribeIds.delete(id);
        
        this.loadSubmissions(); // 채점 완료
        this.submitDisabled = false;
      });
      this.subscribeIds.add(id);
      await this.loadSubmissions(); // 채점 중
    },
    changeLanguage(value) {
      this.language = value;
    },
    async loadSubmissions() {
      this.submissions = await api.submission.getSubmissionsByProblemId(this.currentProblem.problemId);
    },
    async moveProblem(index) {
      if (index === this.problemIndex) {
        return;
      }
      
      // TODO: save code
      this.code = this.defaultCode;
      
      this.problemIndex = index;
      this.submissionIndex = -1;
      this.submitDisabled = true;
      
      if (this.socket !== null) {
        for (let id of this.subscribeIds) {
          this.socket.unsubscribe(id);
        }
      }
      this.subscribeIds = new Set();
      
      this.submissions = [];
      await this.loadSubmissions();
      this.submitDisabled = false;
    },
  },
  computed: {
    currentProblem() {
      return this.problems[this.problemIndex];
    },
    currentSubmission() {
      return this.submissions[this.submissionIndex] ?? null;
    },
  },
  async created() {
    let problemIds = [];
    if (this.contestMode) {
      let problemSetId;
      try {
        problemSetId = (await api.contests.getContestById(this.contestId)).problemSetId;
      } catch (e) {
        this.contestId = await api.contests.startContest(this.problemSetId);
        problemSetId = (await api.contests.getContestById(this.contestId)).problemSetId;
      }
      
      for (let id of (await api.problemset.getProblemSetById(problemSetId)).problem_list.split(",")) { // TODO: remove split
        problemIds.push(id);
      }
    } else {
      problemIds = [this.problemId];
    }
    for (let id of problemIds) {
      this.problems.push(await api.problem.getProblemById(id));
    }
    
    this.intervalId.push(setInterval(this.renderMathJax, 100));
    this.socket = Stomp.over(new SockJS("http://43.200.180.31:8081/ws/chat"));
    this.socket.connect({}, () => {
      this.sockedConnected = true;
    }, () => {
    });
    
    this.subscribeIds = new Set();
    await this.moveProblem(0);
  },
  beforeUnmount() {
    this.socket.disconnect();
  },
}
</script>

<style module scoped>
/* content body */
.problem-solve-view-content {
  display: flex;
  height: calc(100vh - 3.5rem - 1px);
  overflow: hidden;
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

.problem-solve-view-content__main-submission-list-element > * {
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
}

.problem-solve-view-content__main-submission-list-element > *:nth-child(1) {
  display: block;
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

.problem-solve-view-content__main-editor-menu-btn-submit {
  background: rgba(62, 87, 181, 1);
  color: white;
}

.problem-solve-view-content__main-editor-menu-btn-submit--disabled {
  background: rgba(62, 87, 181, .6);
  cursor: not-allowed;
}

.problem-solve-view-content__main-editor-menu-btn:nth-last-child(1) {
  margin-right: 0;
}

</style>
