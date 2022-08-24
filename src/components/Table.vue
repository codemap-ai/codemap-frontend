<template>
  <div>
    <div style="display: flex; font-size: 1.1rem; font-weight: 500; margin-top: 1rem; padding-bottom: 1rem; margin-bottom: .7rem; border-bottom: 1px solid rgba(0, 0, 0, .1);">
      <div v-for="(value, index) of headers" :style="`flex: ${ratio[index]}; text-align: center;`">{{ value }}</div>
    </div>
    <div v-for="(value, idx1) of values" style="display: flex; padding-bottom: .7rem; margin-bottom: .7rem; border-bottom: 1px solid rgba(0, 0, 0, .1);">
      <div v-for="(text, idx2) of value" :style="`flex: ${ratio[idx2]}; text-align: center; ${(links ?? [])[idx1] === undefined ? '' : 'cursor: pointer; text-decoration: underline; color: #4674ee;'}`"
           @click="(links ?? [])[idx1] === undefined ? '' : this.$router.push(links[idx1]);">{{ text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: ["headers", "values", "ratio", "links"],
}
</script>

<style scoped>

</style>
