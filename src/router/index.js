import { createRouter, createWebHistory } from 'vue-router'
import LectureView from "@/views/LectureView";
import HomeView from "@/views/HomeView";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/lecture/',
    name: 'Lecture',
    component: LectureView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
