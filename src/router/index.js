import {createRouter, createWebHistory} from 'vue-router'
import LectureView from "@/views/LectureView";
import HomeView from "@/views/HomeView";
import ProblemView from "@/views/ProblemView";

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
		path: '/problem/:problem_id',
		name: 'Problem',
		component: ProblemView,
	},
	{
		path: '/contest/:contest_id',
		name: 'Contest',
		component: ProblemView,
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
