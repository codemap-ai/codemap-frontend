<template>

</template>

<script>
import api from "@/api";

export default {
  name: "KakaoProcess",
  async created() {
    let {id} = this.$route.params;
    if (id === undefined || id.trim() === "") {
      alert("올바르지 않은 접근입니다.");
      this.$router.push("/");
      return;
    }
    id = parseInt(id);
    let ret = await api.users.registerKakaoInfo(id);
    if (ret.username !== undefined) {
      alert("카카오 계정과 연결했습니다.");
    } else {
      alert("카카오 계정과 연결하지 못했습니다.");
    }
    this.$router.push("/");
  },
}
</script>

<style scoped>

</style>
