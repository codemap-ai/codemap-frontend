<template>
  <Navbar dropdown="강의"/>
  <div v-if="!isLoading" style="display: flex; flex-direction: column; justify-content: center; align-items: center; margin-top: 2rem;">
    <div v-for="{algorithmId, title, description, disabled} of categoryList"
         style="position: relative; margin: 1rem 0; padding: 1.5rem; width: 80vw; min-height: 9rem; box-shadow: 0px 0px 20px 1px rgba(0,0,0,0.15); border-radius: 1rem;">
      <div style="font-size: 1.2rem; font-weight: 500; width: 100%; padding-bottom: .5rem; border-bottom: 1px solid rgba(0, 0, 0, .2);">
        {{ title }}
      </div>
      <div style="margin-top: 1rem;">
        {{ description }}
      </div>
      <router-link
          :to="disabled ? '#' : `/lecture/${algorithmId}`"
          :style="` color: #3476f6; ${disabled ? 'cursor: not-allowed; color: grey;' : ''} position: absolute; bottom: 1.5rem; right: 1.5rem; display: flex; align-items: center; align-content: center; align-self: center; font-size: .9rem; text-decoration: inherit;`"
      >
        학습하기<span class="mdi mdi-arrow-right" style="margin-left: .2rem;"></span>
      </router-link>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import Navbar from "@/components/Navbar";

export default {
  name: "LectureCategoryDetailView",
  components: {Navbar},
  data() {
    return {
      isLoading: true,
      categoryList: [],
    };
  },
  computed: {
    category_id() {
      return this.$route.params.category_id;
    },
  },
  async created() {
    this.categoryList = await api.algorithms.getCategory(this.category_id);
    if (!Array.isArray(this.categoryList)) {
      alert("오류 발생");
      return;
    }
    this.isLoading = false;
    
    for (let obj of this.categoryList) {
      api.algorithms.getAlgorithm(obj.algorithmId).then(ret => {
        if (ret.body.length === 0) {
          obj.disabled = true;
          // this.categoryList = this.categoryList;
          this.$forceUpdate();
        }
      });
    }
  },
}
</script>

<style scoped>

</style>
