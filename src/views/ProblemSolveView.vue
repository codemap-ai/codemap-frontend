<template>
  <Navbar v-if="problemIndex > -1" :contest-mode="contestMode" :dropdown="contestMode ? `대회` : `문제`" :finish-contest="finishContest"
          :remain-time="contestNavbarRemain" :title="`${ contestMode ? `[${contestTitle}] ${problemIndex + 1}. ` : '' }${currentProblem.title}`" title_desc="현재 문제"/>
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
            <span :class="$style['problem-solve-view-content__main-problem-info-value']">{{ currentProblem.timeLimit }}초</span>
          </div>
          <div style="margin-top: .5rem;">
            <span :class="$style['problem-solve-view-content__main-problem-info-key']"><span class="mdi mdi-memory" style="margin-right: .5rem;"></span>메모리 제한</span>
            <span :class="$style['problem-solve-view-content__main-problem-info-value']">{{ currentProblem.memoryLimit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}MiB</span>
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
              <div :class="$style['problem-solve-view-content__main-submission-detail-btn']" :style="`${result !== judgeResults.WAITING ? '' : 'cursor: not-allowed; background: inherit !important;'}`"
                   @click="result !== judgeResults.WAITING ? submissionIndex = index : 0;">
                <span class="mdi mdi-archive-outline"></span></div>
            </div>
            <div v-else :class="$style['problem-solve-view-content__main-submission-list-element']" style="color: rgba(0, 0, 0, .6); font-style: italic; font-size: .9rem; margin: .5rem 0;">
              제출 기록 없음
            </div>
          </div>
        </div>
        
        <vue3-markdown-it :source="currentProblem.legend" style="margin-top: 2rem; line-height: 1.5rem;"/>
        
        <div :class="$style['problem-solve-view-content__main-statement-header']">입력</div>
        <vue3-markdown-it :class="$style['problem-solve-view-content__main-statement-body']" :source="currentProblem.inputFormat" style="line-height: 1.5rem;"/>
        
        <div :class="$style['problem-solve-view-content__main-statement-header']">출력</div>
        <vue3-markdown-it :class="$style['problem-solve-view-content__main-statement-body']" :source="currentProblem.outputFormat" style="line-height: 1.5rem;"/>
        
        <div :class="$style['problem-solve-view-content__main-statement-header']" style="margin-bottom: 1rem;">예제</div>
        <div v-for="(_, index) in currentProblem.inputExamples">
          <span>예제 입력 {{ index + 1 }}</span>
          <CopiableTextarea :text="currentProblem.inputExamples[index].trim()"/>
          <span style="margin-top: .3rem; display: inline-block;">예제 출력 {{ index + 1 }}</span>
          <CopiableTextarea :text="currentProblem.outputExamples[index].trim()" style="margin-bottom: 2rem;"/>
        </div>
      </div>
      <div :class="[$style['problem-solve-view-content__main-editor']]">
        <MonacoEditor :class="{[$style['problem-solve-view-content__main-editor--contest-mode']]: contestMode, [$style['problem-solve-view-content__main-editor--test-mode']]: testMode}"
                      :options="{automaticLayout: true, scrollBeyondLastLine: false,}" :value="code"
                      class="editor" language="cpp" theme="vs-dark" @change="onChangeCode"/>
        <div v-if="testMode" :class="$style['problem-solve-view-content__main-editor--test-mode']">
          <div :class="$style['problem-solve-view-content__main-editor--test-input']">
            <span class="mdi mdi-chevron-right" style="display: inline-block; margin-right: .5rem;"></span>표준 입력 (stdin)
          </div>
          <MonacoEditor :class="[{[$style['problem-solve-view-content__main-editor--contest-mode']]: contestMode}, $style['problem-solve-view-content__main-editor--test-mode-second']]"
                        :options="{automaticLayout: true, scrollBeyondLastLine: false,}"
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
          <div style="font-weight: 500; font-size: 1.8rem; margin-top: .3rem;">{{ currentSubmission.testMode ? '테스트' : '제출' }} 결과</div>
          <div style="margin-top: .5rem;">제출 시간 : {{ currentSubmission.submitDate.toLocaleString() }}</div>
          <div style="margin-top: 1rem; color: rgba(0, 0, 0, .7)">
            <span :class="$style['problem-solve-view-content__main-problem-info-key']"><span class="mdi mdi-clock-time-three-outline" style="margin-right: .5rem;"></span>실행 시간</span>
            <span :class="$style['problem-solve-view-content__main-problem-info-value']">{{ Math.floor(currentSubmission.executeTime * 1000) / 1000 }}초</span>
          </div>
          <div style="margin-top: .5rem; color: rgba(0, 0, 0, .7)">
            <span :class="$style['problem-solve-view-content__main-problem-info-key']"><span class="mdi mdi-memory" style="margin-right: .5rem;"></span>사용 메모리</span>
            <span :class="$style['problem-solve-view-content__main-problem-info-value']">{{ Math.floor(currentSubmission.usedMemory / 1024 * 1000) / 1000 }}MiB</span>
          </div>
          <div v-if="!currentSubmission.testMode">
            <div style="margin-top: 2rem; color: rgba(0, 0, 0, .7);">
              <span :class="$style['problem-solve-view-content__main-problem-info-key']"><span class="mdi mdi-trending-up" style="margin-right: .5rem;"></span>획득 점수</span>
              <span><span :class="$style['problem-solve-view-content__main-problem-info-value']">{{ currentSubmission.score }}</span> / 100점</span>
            </div>
          </div>
          <div v-if="currentSubmission.result === judgeResults.COMPILATION_ERROR">
            <div style="font-weight: 500; font-size: 1.1rem; margin-top: 1rem;">컴파일 에러</div>
            <monaco-editor
                :options="{automaticLayout: true, readOnly: true, scrollBeyondLastLine: false, minimap: {enabled: false}, lineNumbers: 'off', folding: true, lineDecorationsWidth: 0, lineNumbersMinChars: 0}"
                :value="currentSubmission.compilerMessage" class="editor" language="plaintext"
                style="width: calc(80vw - 5rem); height: 5rem; margin: .5rem 0 2rem 0;"
                theme="vs-dark"></monaco-editor>
          </div>
          <div v-else>
            <div style="font-weight: 500; font-size: 1.1rem; margin-top: 1rem;">출력</div>
            <monaco-editor
                :options="{automaticLayout: true, readOnly: true, scrollBeyondLastLine: false, minimap: {enabled: false}, lineNumbers: 'off', folding: true, lineDecorationsWidth: 0, lineNumbersMinChars: 0}"
                :value="currentSubmission.output" class="editor" language="plaintext"
                style="width: calc(80vw - 5rem); height: 10rem; margin: .5rem 0 2rem 0;"
                theme="vs-dark"></monaco-editor>
            <div style="font-weight: 500; font-size: 1.1rem;">입력</div>
            <monaco-editor
                :options="{automaticLayout: true, readOnly: true, scrollBeyondLastLine: false, minimap: {enabled: false}, lineNumbers: 'off', folding: true, lineDecorationsWidth: 0, lineNumbersMinChars: 0}"
                :value="currentSubmission.input" class="editor" language="plaintext"
                style="width: calc(80vw - 5rem); height: 5rem; margin: .5rem 0 2rem 0;"
                theme="vs-dark"></monaco-editor>
          </div>
          <div style="font-weight: 500; font-size: 1.2rem; margin-top: 3rem;">코드 ({{ toDisplayText(currentSubmission.usedLanguage) }})</div>
        </div>
        <div style="color: rgba(0, 0, 0, .8); cursor: pointer; font-size: 2rem; height: fit-content;" @click="submissionIndex = -1">
          <span class="mdi mdi-close"></span>
        </div>
      </div>
      <monaco-editor :options="{automaticLayout: true, readOnly: true, scrollBeyondLastLine: false, minimap: {enabled: false},}" :value="currentSubmission.submitCode" class="editor" language="cpp"
                     style="width: calc(80vw - 5rem); margin: 1rem 0 2rem 0;"
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
import {getToken, isLogin} from "@/api/token";

import judgeResults from "@/constants/JudgeResults";
import CopiableTextarea from "@/components/CopiableTextarea";

export default {
  name: 'ProblemSolveView',
  components: {
    CopiableTextarea,
    Dropdown,
    Navbar,
    MonacoEditor
  },
  data() {
    return {
      judgeResults,
      
      intervalId: [],
      lockedForRender: false,
      
      problemSetId: null, // set value when created
      
      contestTitle: "",
      problemIndex: -1,
      problems: [],
      
      contestStart: 0,
      contestDuration: 0,
      contestNavbarRemain: 0,
      
      code: "",
      
      testMode: false,
      testInput: "",
      
      defaultCodes: [],
      languages: [],
      language: "",
      
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
      
      this.saveCode();
      
      let submissionId = (await api.submit.problem(this.currentProblem.problemId, this.contestId, this.language, this.code, this.testMode, this.testInput)).submissionId;
      let {id} = this.socket.subscribe("/topic/chat/room/" + submissionId, message => {
        this.socket.unsubscribe(id);
        this.subscribeIds.delete(id);
        
        this.loadSubmissions(); // 채점 완료
      });
      this.subscribeIds.add(id);
      await this.loadSubmissions(); // 채점 중
      
      this.submitDisabled = false;
    },
    async changeLanguage(value) {
      this.saveCode();
      try {
        this.language = value;
        let temp = await api.code.load(this.currentProblem.problemId, this.contestId, this.language);
        if (temp.trim() === "") temp = this.defaultCodes[this.language];
        this.code = temp;
      } catch (e) {
        this.code = this.defaultCodes[this.language];
      }
    },
    async loadSubmissions() {
      this.submissions = await api.submission.getSubmissionsByProblemId(this.currentProblem.problemId, this.contestId);
    },
    async saveCode() {
      if (this.problemIndex !== -1) {
        await api.code.save(this.currentProblem.problemId, this.contestId, this.code, this.language);
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
        let temp = await api.code.load(this.currentProblem.problemId, this.contestId, this.language);
        if (temp.trim() === "") temp = this.defaultCodes[this.language];
        this.code = temp;
      } catch (e) {
        this.code = this.defaultCodes[this.language];
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
    async finishContest() {
      await api.contests.finishContest(this.contestId);
      alert("대회를 종료했습니다.");
      // this.$router.push("/");
      location.assign(`https://scoreboard.codemap.ai/${this.problemSetId}`);
    },
  },
  computed: {
    contestMode() {
      return this.$route.path.startsWith("/contest");
    },
    contestId() {
      return this.contestMode ? parseInt(this.$route.params.contest_id) : -1;
    },
    problemId() {
      return parseInt(this.$route.params.problem_id) ?? -1;
    },
    currentProblem() {
      return this.problems[this.problemIndex];
    },
    currentSubmission() {
      return this.submissions[this.submissionIndex] ?? null;
    },
  },
  async created() {
    if (!isLogin()) {
      alert("로그인 후 이용하세요");
      this.$router.push("/login");
      return;
    }
    
    let problemIds = [];
    if (this.contestMode) {
      try {
        let contestInfo = await api.contests.getContestById(this.contestId);
        if (contestInfo.finishTime !== null) {
          alert("종료된 대회");
          this.$router.go(-1);
          return;
        }
        this.contestStart = Math.floor((new Date(contestInfo.createTime)).getTime() / 1000);
        this.problemSetId = contestInfo.problemSetId;
      } catch (e) {
        alert("존재하지 않는 대회");
        this.$router.go(-1);
        return;
      }
      
      let problemSetInfo = await api.problemset.getProblemSetById(this.problemSetId);
      this.contestTitle = problemSetInfo.title;
      this.contestDuration = problemSetInfo.duration * 60;
      for (let {problemId} of problemSetInfo.problemList) {
        problemIds.push(problemId);
      }
    } else {
      problemIds = [this.problemId];
    }
    for (let id of problemIds) {
      this.problems.push(await api.problem.getProblemById(id));
    }
    
    this.intervalId.push(setInterval(this.renderMathJax, 100));
    this.intervalId.push(setInterval(this.saveCode, 1000 * 10));
    if (this.contestMode) {
      this.intervalId.push(setInterval(() => {
        this.contestNavbarRemain = this.contestStart + this.contestDuration - Math.floor(Date.now() / 1000);
        if (this.contestNavbarRemain < 0) {
          alert("대회가 종료되었습니다.");
          // this.$router.push("/");
          location.assign(`https://scoreboard.codemap.ai/${this.problemSetId}`);
        }
      }, 1000));
    }
    
    this.socket = Stomp.over(() => new SockJS("https://api.codemap.ai/ws/chat"));
    let originalDebug = this.socket.debug;
    this.socket.debug = (...message) => {
      if (process.env.NODE_ENV === "development") {
        originalDebug(...message);
      }
    }; // 디버그 비활성화
    this.socket.connect({
      "Authorization": `Bearer ${getToken()}`,
    }, () => {
      this.sockedConnected = true;
    });
    
    this.languages = Array.from(Object.keys(Languages.values)).map(key => [Languages.values[key].display, key]); // [display text, language id]
    for (let key of Object.keys(Languages.values)) {
      this.defaultCodes[key] = Languages.values[key].defaultCode;
    }
    this.language = this.languages[0][1]; // c++17로 설정
    
    await this.moveProblem(0);
  },
  beforeUnmount() {
    this.saveCode();
    this.socket?.disconnect();
    
    for (let id of this.intervalId) {
      clearInterval(id);
    }
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
