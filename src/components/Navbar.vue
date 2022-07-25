<template>
  <div :class="$style['navbar']">
    <div :class="$style['navbar__logo']">
      <div :class="$style['navbar__logo-text']">C</div>
    </div>
    <div :class="$style['navbar__dropdown-value']" @click="toggleDropdown" style="position: relative;">
      {{ dropdown }}<span style="margin-left: .5rem;" :class="['mdi', dropdownOpened ? 'mdi-chevron-up' : 'mdi-chevron-down']"></span>
      <div v-if="dropdownOpened" :class="$style['navbar__dropdown-expand']">
        <div v-for="([display, link]) in dropdownOptions" :class="[$style['navbar__dropdown-value'], $style['navbar__dropdown-menu']]" @click="$router.push(link);">
          {{ display }}
        </div>
      </div>
    </div>
    <div :class="$style['navbar__detail']">
      <span :class="$style['navbar__current-lecture']">{{ title_desc }}</span>
      <span>{{ title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: ['dropdown', 'title_desc', 'title'],
  data() {
    return {
      dropdownOptions: [["문제", "/problem/"], ["강의", "/lecture/"]],
      dropdownOpened: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpened = !this.dropdownOpened;
    },
  },
}
</script>

<style scoped module>
/* navbar */
.navbar {
  display: flex;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
}

.navbar__logo {
  padding: 0.7rem;
  border-right: 1px solid rgba(0, 0, 0, .1);
}

.navbar__logo-text {
  width: 2.1rem;
  height: 2.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  background: rgba(52, 118, 246, .2);
  border-radius: .5rem;
  font-size: 1.5rem;
  font-weight: 900;
  color: #3476f6;
}

.navbar__dropdown-value {
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

.navbar__detail {
  padding: 0.5rem 1.5rem;
  display: flex;
  align-items: center;
  font-weight: 500;
  color: rgba(0, 0, 0, .6);
}

.navbar__current-lecture {
  background: rgba(0, 0, 0, .15);
  border-radius: 5rem;
  padding: .3rem .7rem;
  font-size: .8rem;
  color: black;
  margin-right: .5rem;
}

.navbar__dropdown-expand {
  position: absolute;
  top: calc(3.5rem + 1px);
  width: 100%;
  z-index: 999;
}

.navbar__dropdown-menu {
  font-weight: normal;
  width: 100%;
  height: 3.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  background: white;
  margin-left: 1px;
}
</style>
