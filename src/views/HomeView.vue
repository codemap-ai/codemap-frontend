<template>
  <button @click='this.$router.push("/lecture/");'>lecture</button>
  <button @click='this.$router.push("/problem/1");'>problem 1</button>
  <button @click='this.$router.push("/contest/1");'>contest 1</button>
  <StartContest/>
</template>

<script>
import StartContest from "@/components/StartContest";
export default {
  name: "HomeView",
  components: {StartContest},
  created() {
  },
}
</script>

<style scoped>

</style>
