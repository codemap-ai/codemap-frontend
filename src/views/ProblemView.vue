<template>
  <Navbar v-if="problemIndex > -1" :title="`${ contestMode ? `${problemIndex + 1}. ` : '' }${currentProblem.title}`" dropdown="문제" title_desc="현재 문제"/>
  <div v-if="problemIndex === -1"></div>
  <div v-else :class="$style['problem-solve-view-content']">
    <div v-if="contestMode" :class="$style['problem-solve-view-content__sidebar']">
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
            <div v-for="({submissionId, submitDate, score, usedLanguage, result}, index) in submissions" v-if="submissions.length > 0" :key="submissionId"
                 :class="$style['problem-solve-view-content__main-submission-list-element']">
              <div style="flex: 5;">{{ submitDate.toLocaleString() }}</div>
              <div v-if="result.displayScore && score > 0" style="font-weight: 700; flex: 3;">
                {{ score }}점
                <span v-if="result.displayText !== null" :style="`color: ${result.color}; font-weight: normal; margin-left: .2rem;`">
                ({{ result.displayText }})
                </span>
              </div>
              <div v-else :style="`flex: 3; color: ${result.color}; font-weight: ${result.bold ? 600 : 400};`">{{ result.displayText }}</div>
              <div style="flex: 3;">{{ toDisplayText(usedLanguage) }}</div>
              <div :class="$style['problem-solve-view-content__main-submission-detail-btn']" @click="submissionIndex = index;"><span class="mdi mdi-archive-outline"></span></div>
            </div>
            <div v-else :class="$style['problem-solve-view-content__main-submission-list-element']" style="color: rgba(0, 0, 0, .6); font-style: italic; font-size: .9rem; margin: .5rem 0;">
              제출 기록 없음
            </div>
          </div>
        </div>
        
        <vue3-markdown-it :source="currentProblem.body" style="margin-top: 2rem;"/>
        
        <!--        <div :class="$style['problem-solve-view-content__main-statement-header']">입력</div>
                <vue3-markdown-it :class="$style['problem-solve-view-content__main-statement-body']" :source="currentProblem.statement.input"/>
                
                <div :class="$style['problem-solve-view-content__main-statement-header']">출력</div>
                <vue3-markdown-it :class="$style['problem-solve-view-content__main-statement-body']" :source="currentProblem.statement.output"/>-->
      </div>
      <div :class="[$style['problem-solve-view-content__main-editor']]">
        <MonacoEditor :options="{automaticLayout: true, scrollBeyondLastLine: false,}"
                      :class="{[$style['problem-solve-view-content__main-editor--contest-mode']]: contestMode, [$style['problem-solve-view-content__main-editor--test-mode']]: testMode}" :value="code"
                      class="editor" language="cpp" theme="vs-dark" @change="onChangeCode"/>
        <div v-if="testMode" :class="$style['problem-solve-view-content__main-editor--test-mode']">
          <div :class="$style['problem-solve-view-content__main-editor--test-input']">
            <span class="mdi mdi-chevron-right" style="display: inline-block; margin-right: .5rem;"></span>표준 입력 (stdin)
          </div>
          <MonacoEditor :options="{automaticLayout: true, scrollBeyondLastLine: false,}"
                        :class="[{[$style['problem-solve-view-content__main-editor--contest-mode']]: contestMode}, $style['problem-solve-view-content__main-editor--test-mode-second']]"
                        :value="testInput" class="editor" language="plaintext" theme="vs-dark" @change="onChangeTestInput"/>
        </div>
        <div :class="$style['problem-solve-view-content__main-editor-menu']">
          <Dropdown :class="$style['problem-solve-view-content__main-editor-menu-btn']" :default_value="language" :direction="true" :options="languages" style="flex: 3;"
                    @change="changeLanguage"/>
          <div
              :class="[$style['problem-solve-view-content__main-editor-menu-btn']]"
              style="flex: 1; background: lightgrey;" @click="testMode = !testMode">테스트 모드 {{ testMode ? "끄기" : "켜기" }}
          </div>
          <div
              :class="[$style['problem-solve-view-content__main-editor-menu-btn'], $style['problem-solve-view-content__main-editor-menu-btn-submit'], {[$style['problem-solve-view-content__main-editor-menu-btn-submit--disabled']]: submitDisabled}]"
              style="flex: 1;" @click="submitCode"> {{ testMode ? "테스트" : "제출" }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 테스트 제출에 대해서 인풋/아웃풋 보여주기 -->
  <div v-if="currentSubmission !== null"
       style="position: fixed; top: 0; bottom: 0; left: 0; right: 0; z-index: 1000; background: rgba(0, 0, 0, .2); backdrop-filter: blur(2px); width: 100vw; height: 100vh; display: flex; justify-content: center; align-content: center; align-items: center;"
       @click.stop="submissionIndex = -1">
    <div style="width: 80vw; height: 70vh; background: white; padding: 1.5rem; overflow-y: auto; box-shadow: 0 0 35px -20px #000000;" @click.stop="">
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
          <div style="font-weight: 500; font-size: 1.2rem; margin-top: 3rem;">코드 ({{ toDisplayText(currentSubmission.usedLanguage) }})</div>
        </div>
        <div style="color: rgba(0, 0, 0, .8); cursor: pointer; font-size: 2rem;" @click="submissionIndex = -1">
          <span class="mdi mdi-close"></span>
        </div>
      </div>
      <monaco-editor :options="{automaticLayout: true, readOnly: true, scrollBeyondLastLine: false, minimap: {enabled: false},}" :value="currentSubmission.submitCode" class="editor" language="cpp"
                     style="width: calc(80vw - 4.2rem); margin: 1rem 0 2rem 0;"
                     theme="vs-dark"></monaco-editor>
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
import Languages from "@/constants/Languages";

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
      
      problemSetId: null, // set value when created
      
      problemIndex: -1,
      problems: [],
      
      defaultCode: "#include <bits/stdc++.h>\n\nusing namespace std;\n\nint main() {\n\tcout << \"Hello, World\";\n}\n", // TODO: 언어별 default code, 별도 분리
      code: "",
      languages: [],
      language: "",
      testMode: false,
      testInput: "",
      
      submitDisabled: true,
      subscribeIds: new Set(),
      
      submissions: [],
      submissionIndex: -1,
      
      socket: null,
      sockedConnected: false,
    };
  },
  methods: {
    toDisplayText: Languages.toDisplayText,
    onChangeCode(value) {
      this.code = value;
    },
    onChangeTestInput(value) {
      this.testInput = value;
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
      
      let submissionId = (await api.submit(this.currentProblem.problemId, this.contestId, this.language, this.code, this.testMode, this.testInput)).submissionId;
      let {id} = this.socket.subscribe("/topic/chat/room/" + submissionId, message => {
        this.socket.unsubscribe(id);
        this.subscribeIds.delete(id);
        
        this.loadSubmissions(); // 채점 완료
      });
      this.subscribeIds.add(id);
      await this.loadSubmissions(); // 채점 중
      
      this.submitDisabled = false;
    },
    changeLanguage(value) {
      this.language = value;
    },
    async loadSubmissions() {
      this.submissions = await api.submission.getSubmissionsByProblemId(this.currentProblem.problemId, this.contestId);
    },
    async saveCode() {
      if (this.problemIndex !== -1) {
        await api.code.save(this.currentProblem.problemId, this.contestId, this.code);
      }
    },
    async moveProblem(index) {
      if (index === this.problemIndex) {
        return;
      }
      
      if (this.problemIndex !== -1) {
        this.saveCode(); // 코드 저장은 기다릴 필요(await)가 없음
      }
      
      this.problemIndex = index;
      this.submissionIndex = -1;
      this.submitDisabled = true;
      
      this.code = "";
      try {
        this.code = await api.code.load(this.currentProblem.problemId, this.contestId) ?? this.defaultCode;
      } catch (e) {
        this.code = this.defaultCode;
      }
      
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
    contestMode() {
      return this.$route.path.startsWith("/contest");
    },
    contestId() {
      return this.contestMode ? parseInt(this.$route.params.contest_id) : null;
    },
    problemId() {
      return parseInt(this.$route.params.problem_id);
    },
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
        // this.contestId = await api.contests.startContest(this.problemSetId);
        // problemSetId = (await api.contests.getContestById(this.contestId)).problemSetId;
        alert("존재하지 않는 대회");
        this.$router.go(-1);
        return;
      }
      
      for (let id of (await api.problemset.getProblemSetById(problemSetId)).problem_list) {
        problemIds.push(id);
      }
    } else {
      problemIds = [this.problemId];
    }
    for (let id of problemIds) {
      this.problems.push(await api.problem.getProblemById(id));
    }
    
    this.intervalId.push(setInterval(this.renderMathJax, 100));
    this.intervalId.push(setInterval(this.saveCode, 1000 * 10));
    
    this.socket = Stomp.over(new SockJS("http://43.200.180.31:8081/ws/chat"));
    let originalDebug = this.socket.debug;
    this.socket.debug = (...message) => {
      if (process.env.NODE_ENV === "development") {
        originalDebug(...message);
      }
    }; // 디버그 비활성화
    this.socket.connect({}, () => {
      this.sockedConnected = true;
    }, () => {
    });
    
    this.languages = Array.from(Object.keys(Languages.values)).map(key => [Languages.values[key], key]);
    this.language = this.languages[0][1];
    
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
  width: calc(50vw) !important;
  height: calc(100vh - 3.5rem - 1px) !important;
  padding: 2.5rem 0 5rem 0;
  background: rgb(30, 30, 30);
  
  display: flex;
  flex-direction: column;
}

.problem-solve-view-content__main-editor--contest-mode {
  height: calc(100vh - 3.5rem - 1px - 7.5rem) !important;
}

.problem-solve-view-content__main-editor--test-input {
  height: 3rem;
  background: white;
  
  display: flex;
  padding-left: 1rem;
  align-content: center;
  align-items: center;
}

.problem-solve-view-content__main-editor--test-mode {
  height: calc((100vh - 3.5rem - 1px - 7.5rem) / 2) !important;
}

.problem-solve-view-content__main-editor--test-mode-second {
  height: calc((100vh - 3.5rem - 1px - 7.5rem) / 2 - 3rem) !important;
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
