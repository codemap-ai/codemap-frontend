<template>
  <pre style="width: 100%; padding: 1rem 1rem; background: rgba(0, 0, 0, .1); margin: .5rem 0; position: relative; font-family: Consolas, 'D2coding',sans-serif;">{{ text }}<div
      style="position: absolute; top: .7rem; right: .7rem; cursor: pointer; color: rgba(0, 0, 0, .7); font-size: .5rem;"
      @click="navigator.clipboard.writeText(text);"><span
      class="mdi mdi-content-copy"></span></div></pre>
</template>

<script>
export default {
  name: "CopiableTextarea",
  props: ["text"],
  data() {
    return {
      navigator,
    };
  },
}
</script>

<style scoped>

</style>
