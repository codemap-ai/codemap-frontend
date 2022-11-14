<template>
  <div :class="$style['navbar']">
    <div :class="$style['navbar__logo']" @click="$router.push('/')">
      <div :class="$style['navbar__logo-text']">C</div>
    </div>
    <!--    <Dropdown :default_value="dropdown" :direction="false" :options="dropdownOptions" height="3.5rem"/>-->
    <div style="display: flex; align-items: center; justify-content: center; padding: .5rem; border-right: 1px solid rgba(0, 0, 0, .1);">
      <div v-for="([display, value, callback]) of dropdownOptions" style="padding: 0 .5rem; margin: 0 1rem; cursor: pointer;" @click="callback">
        {{ display }}
      </div>
    </div>
    <div v-if="title_desc?.trim() !== undefined || title?.trim() !== undefined" :class="$style['navbar__detail']" style="display: flex; justify-content: space-between; flex: 1;">
      <div>
        <span :class="$style['navbar__current-lecture']">{{ title_desc }}</span>
        <span>{{ title }}</span>
      </div>
      <div v-if="contestMode === true" style="display: flex; align-items: center;">
        <div style="margin-right: 1rem;">
          모의고사 종료까지 {{ remainTimeString }}
        </div>
        <div style="padding: .5rem 1rem; border-radius: .5rem; color: #000000; background: #dae3fc; cursor: pointer" @click="finishContest">모의고사 종료</div>
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from "@/components/Dropdown";

export default {
  name: "Navbar",
  components: {Dropdown},
  props: ['dropdown', 'title_desc', 'title', "contestMode", "remainTime", "finishContest"],
  data() {
    return {
      dropdownOptions: [
        ["커리큘럼", "커리큘럼", () => this.$router.push("/curriculum/")],
        ["문제집", "문제집", () => this.$router.push("/problem_set")],
        ["문제", "문제", () => this.$router.push("/problem/")],
        ["내 정보", "내 정보", () => this.$router.push("/info/")],
      ],
    };
  },
  methods: {
    convert(num) {
      num = Math.floor(num);
      if (num < 10) return `0${num}`;
      else return `${num}`;
    }
  },
  computed: {
    remainTimeString() {
      let temp = this.remainTime;
      let ret = "";
      ret += this.convert(temp / 3600) + ":";
      temp %= 3600;
      ret += this.convert(temp / 60) + ":";
      temp %= 60;
      ret += this.convert(temp);
      return ret;
    },
  },
}
</script>

<style module scoped>
/* navbar */
.navbar {
  display: flex;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
}

.navbar__logo {
  padding: 0.7rem;
  border-right: 1px solid rgba(0, 0, 0, .1);
  cursor: pointer;
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
</style>
