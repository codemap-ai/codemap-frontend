<template>
  <div :class="$style['dropdown__value']" :style="`position: relative; height: ${height};`" @click="toggleDropdown">
    {{ options.find(v => v[1] === value || v[0] === value)[0] }}<span :class="['mdi', (dropdownOpened ^ direction) ? 'mdi-chevron-up' : 'mdi-chevron-down']" style="margin: 0 .25rem;"></span>
    <div v-if="dropdownOpened" :class="[$style['dropdown__expand-section'], {[$style['dropdown__expand-section--reverse']]: direction}]">
      <div v-for="([display, value, cb], index) in options" :key="index" :class="[$style['dropdown__expand-value'], $style['dropdown__value']]" :style="`height: ${height};`"
           @click="click(value, cb);">
        {{ display }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dropdown",
  props: ['default_value', 'options', 'direction', 'height'],
  data() {
    return {
      dropdownOpened: false,
      value: "",
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpened = !this.dropdownOpened;
    },
    click(value, cb) {
      this.value = value;
      this.$emit("change", value);
      
      if (typeof cb === "function") {
        cb();
      }
    }
  },
  created() {
    this.value = this.default_value;
  },
}
</script>

<style module scoped>
.dropdown__value {
  font-weight: 700;
  padding: 0.5rem 2rem;
  border-right: 1px solid rgba(0, 0, 0, .1);
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  cursor: pointer;
  
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

.dropdown__expand-section {
  position: absolute;
  top: calc(3.5rem + 1px);
  left: 0;
  right: 0;
  
  width: 100%;
  z-index: 999;
  
  display: flex;
  flex-direction: column;
  
  margin: 0 auto;
}

.dropdown__expand-section--reverse {
  flex-direction: column-reverse;
  top: 0;
  bottom: calc(3.5rem + 1px);
}

.dropdown__expand-value {
  font-weight: normal;
  width: calc(100% + 1px);
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  background: white;
  /*margin-left: 1px;*/
}
</style>
