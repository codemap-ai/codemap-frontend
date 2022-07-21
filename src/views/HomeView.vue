<template>
<div @click='this.$router.push("/lecture/");'>lecture</div>
<div @click='this.$router.push("/contest/");'>contest</div>
</template>

<script>
export default {
  name: "HomeView",
  created() {
  },
}
</script>

<style scoped>

</style>
