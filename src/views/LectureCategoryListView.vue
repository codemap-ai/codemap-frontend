<template>
  <Navbar dropdown="강의"/>
  <div v-if="!isLoading" style="display: flex; flex-direction: column; justify-content: center; align-items: center; margin-top: 2rem;">
    <div v-for="{categoryId, title, description} of categoryList"
         style="position: relative; margin: 1rem 0; padding: 1.5rem; width: 80vw; min-height: 9rem; box-shadow: 0px 0px 20px 1px rgba(0,0,0,0.15); border-radius: 1rem;">
      <div style="font-size: 1.2rem; font-weight: 500; width: 100%; padding-bottom: .5rem; border-bottom: 1px solid rgba(0, 0, 0, .2);">
        {{ title }}
      </div>
      <div style="margin-top: 1rem;">
        {{ description }}
      </div>
      <router-link
          :to="`/curriculum/${categoryId}`"
          style="position: absolute; bottom: 1.5rem; right: 1.5rem; display: flex; align-items: center; align-content: center; align-self: center; font-size: .9rem; color: #3476f6; text-decoration: inherit;">
        커리큘럼 보기<span class="mdi mdi-arrow-right" style="margin-left: .2rem;"></span>
      </router-link>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import Navbar from "@/components/Navbar";

export default {
  name: "LectureCategoryListView",
  components: {Navbar},
  data() {
    return {
      isLoading: true,
      categoryList: [],
    };
  },
  async created() {
    this.categoryList = await api.algorithms.getAllCategories();
    this.isLoading = false;
  },
}
</script>

<style scoped>

</style>
