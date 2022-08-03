<template>
  <pre style="width: 100%; padding: 1rem 1rem; background: rgba(0, 0, 0, .1); margin: .5rem 0; position: relative; font-family: Consolas, 'D2coding',sans-serif;">{{ text }}<div
      style="position: absolute; top: 1rem; right: 1rem; cursor: pointer;"
      @click="navigator.clipboard.writeText(text);"><span
      class="mdi mdi-content-copy"></span></div></pre>
</template>

<script>
export default {
  name: "CopiableTextarea",
  props: ["text"],
  data() {
    return {
      navigator: navigator,
    };
  },
}
</script>

<style scoped>

</style>
