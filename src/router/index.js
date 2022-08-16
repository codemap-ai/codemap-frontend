import {createRouter, createWebHistory} from 'vue-router'
import LectureView from "@/views/LectureView";
import HomeView from "@/views/HomeView";
import ProblemView from "@/views/ProblemView";
import LectureCategoryListView from "@/views/LectureCategoryListView";
import LectureCategoryDetailView from "@/views/LectureCategoryDetailView";

const routes = [
	{
		path: '/',
		name: 'Home',
		component: HomeView,
	},
	{
		path: '/lecture/:algorithm_id',
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
	{
		path: '/curriculum/',
		name: 'CurriculumList',
		component: LectureCategoryListView,
	},
	{
		path: '/curriculum/:category_id',
		name: 'CurriculumDetail',
		component: LectureCategoryDetailView,
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
