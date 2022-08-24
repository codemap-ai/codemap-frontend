<template>
  <Navbar/>
  <div v-if="!isLoading" style="padding: 2rem;">
    <div
        style="border-bottom: 1px solid rgba(0, 0, 0, .1); padding-bottom: .7rem; margin-bottom: .7rem; display: flex; justify-content: space-between; align-self: center; align-content: center; align-items: center;">
      <div style="font-weight: 500; font-size: 1.7rem;">
        {{ title }}
      </div>
      <div
          style="bottom: 1.5rem; right: 1.5rem; display: flex; align-items: center; align-content: center; align-self: center; font-size: .9rem; color: #3476f6; text-decoration: inherit; cursor:pointer;"
          @click="startContest"
      >
        모의고사 시작<span class="mdi mdi-arrow-right" style="margin-left: .2rem;"></span>
      </div>
    </div>
    <Table :headers="['대회 번호', '문제 번호', '문제 이름']" :ratio="[1, 1, 3]" :values="problems.map(({problemId, title}, index) => [
        String.fromCharCode('A'.charCodeAt(0) + index),
        problemId,
        title
    ])"/>
  </div>
</template>

<script>
import StartContest from "@/components/StartContest";
import Navbar from "@/components/Navbar";
import api from "@/api";
import Table from "@/components/Table";

export default {
  name: "ProblemSetDetailView",
  components: {Table, Navbar, StartContest},
  data() {
    return {
      isLoading: true,
      title: "",
      problems: [],
    };
  },
  async created() {
    let ret = await api.problemset.getProblemSetById(this.problem_set_id);
    this.title = ret.title;
    this.problems = ret.problemList;
    
    this.isLoading = false;
  },
  methods: {
    async startContest() {
      let contestId = await api.contests.startContest(this.problem_set_id);
      this.$router.push(`/contest/${contestId}`);
    },
  },
  computed: {
    problem_set_id() {
      return this.$route.params.problem_set_id;
    },
  },
}
</script>

<style scoped>

</style>
