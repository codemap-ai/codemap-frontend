<template>
  <button @click='$router.push("/lecture/");'>lecture</button>
  <button @click='$router.push("/problem/1");'>problem 1</button>
  <button @click='$router.push("/contest/1");'>contest 1</button>
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
