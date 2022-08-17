<template>
  <Navbar/>
  <div v-if="!isLoading" style="padding: 2rem;">
    <div
        style="border-bottom: 1px solid rgba(0, 0, 0, .1); padding-bottom: .7rem; margin-bottom: .7rem; display: flex; align-self: center; align-content: center; align-items: center;">
      <div style="font-weight: 500; font-size: 1.7rem;">
        전체 문제 목록
      </div>
    </div>
    <Table :headers="['문제 번호', '문제 이름']" :values="problems.map(({title, problemId}) => [
        problemId,
        title,
    ])" :links="problems.map(({problemId}) => `/problem/${problemId}`)" :ratio="[1, 3]"/>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import api from "@/api";
import Table from "@/components/Table";

export default {
  name: "ProblemListView",
  components: {Table, Navbar},
  data() {
    return {
      isLoading: true,

      problems: [],
    };
  },
  async created() {
    this.problems = await api.problem.getAll();
    
    this.isLoading = false;
  },
}
</script>

<style scoped>

</style>
