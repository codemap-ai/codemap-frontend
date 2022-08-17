<template>
  <div>
    <div style="display: flex; font-size: 1.1rem; font-weight: 500; margin-top: 1rem; padding-bottom: 1rem; margin-bottom: .7rem; border-bottom: 1px solid rgba(0, 0, 0, .1);">
      <div v-for="(value, index) of headers" :style="`flex: ${ratio[index]}; text-align: center;`">{{ value }}</div>
    </div>
    <div style="display: flex; padding-bottom: .7rem; margin-bottom: .7rem; border-bottom: 1px solid rgba(0, 0, 0, .1);" v-for="value of values">
      <div v-for="(text, index) of value" :style="`flex: ${ratio[index]}; text-align: center; ${(links ?? [])[index] === undefined ? '' : 'cursor: pointer; text-decoration: underline; color: #4674ee;'}`" @click="(links ?? [])[index] === undefined ? '' : this.$router.push(links[index]);">{{ text }}</div>
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
