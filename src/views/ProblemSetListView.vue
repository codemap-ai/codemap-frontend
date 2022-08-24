<template>
  <Navbar/>
  <div v-if="!isLoading" style="padding: 2rem;">
    <div
        style="border-bottom: 1px solid rgba(0, 0, 0, .1); padding-bottom: .7rem; margin-bottom: .7rem; display: flex; align-self: center; align-content: center; align-items: center;">
      <div style="font-weight: 500; font-size: 1.7rem;">
        전체 문제집 목록
      </div>
    </div>
    <Table :headers="['문제집 번호', '문제집 이름', '모의고사 시간']" :links="problemSets.map(({problemSetId}) => `/problem_set/${problemSetId}`)" :ratio="[1, 1, 1]" :values="problemSets.map(({problemSetId, title, duration}) => [
        problemSetId,
        title,
        `${duration}분`,
    ])"/>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import api from "@/api";
import Table from "@/components/Table";

export default {
  name: "ProblemSetListView",
  components: {Table, Navbar},
  data() {
    return {
      isLoading: true,
      title: "",
      problemSets: [],
    };
  },
  async created() {
    this.problemSets = await api.problemset.getAll();
    
    this.isLoading = false;
  },
}
</script>

<style scoped>

</style>
