<template>
  <button @click="start">
    start contest
  </button>
</template>

<script>
import api from "@/api";

export default {
  name: "StartContest",
  methods: {
    async start() {
      let contestId = await api.contests.startContest(1);
      this.$router.push(`/contest/${contestId}`);
    },
  },
}
</script>

<style scoped>

</style>
