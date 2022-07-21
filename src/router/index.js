import { createRouter, createWebHistory } from 'vue-router'
import LectureView from "@/views/LectureView";
import HomeView from "@/views/HomeView";
import ContestSolveView from "@/views/ContestSolveView";

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
  {
    path: '/contest/',
    name: 'ContestSolve',
    component: ContestSolveView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
