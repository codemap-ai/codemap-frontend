import {createRouter, createWebHistory} from 'vue-router'
import LectureView from "@/views/LectureView";
import HomeView from "@/views/HomeView";
import ProblemView from "@/views/ProblemView";
import LectureCategoryListView from "@/views/LectureCategoryListView";
import LectureCategoryDetailView from "@/views/LectureCategoryDetailView";
import ProblemSetDetailView from "@/views/ProblemSetDetailView";
import ProblemSetListView from "@/views/ProblemSetListView";

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
	{
		path: '/problem_set/',
		name: 'ProblemSetListView',
		component: ProblemSetListView,
	},
	{
		path: '/problem_set/:problem_set_id',
		name: 'ProblemSetDetailView',
		component: ProblemSetDetailView,
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
