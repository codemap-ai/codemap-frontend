<template>

</template>

<script>
export default {
  name: "JwtProcess",
  created() {
    let {jwt} = this.$route.params;
    if (jwt === undefined || jwt.trim() === "") {
      alert("회원가입 후 [내 정보]에서 카카오 계정을 연동한 후 이용할 수 있어요.");
      this.$router.push("/");
      return;
    }
    localStorage.setItem("token", jwt);
    location = "/";
  },
}
</script>

<style scoped>

</style>
