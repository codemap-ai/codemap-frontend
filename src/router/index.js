import {createRouter, createWebHistory} from 'vue-router'
import LectureView from "@/views/LectureView";
import HomeView from "@/views/HomeView";
import ProblemSolveView from "@/views/ProblemSolveView";
import LectureCategoryListView from "@/views/LectureCategoryListView";
import LectureCategoryDetailView from "@/views/LectureCategoryDetailView";
import ProblemSetDetailView from "@/views/ProblemSetDetailView";
import ProblemSetListView from "@/views/ProblemSetListView";
import ProblemListView from "@/views/ProblemListView";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import ResetPasswordView from "@/views/ResetPasswordView.vue";
import MyPageView from "@/views/MyPageView.vue";
import JwtProcess from "@/views/auth/JwtProcess.vue";
import KakaoProcess from "@/views/auth/KakaoProcess.vue";

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
		path: '/problem/',
		name: 'Problem',
		component: ProblemListView,
	},
	{
		path: '/problem/:problem_id',
		name: 'ProblemSolve',
		component: ProblemSolveView,
	},
	{
		path: '/contest/:contest_id',
		name: 'Contest',
		component: ProblemSolveView,
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
	{
		path: '/login',
		name: 'LoginView',
		component: LoginView,
	},
	{
		path: '/register',
		name: 'RegisterView',
		component: RegisterView,
	},
	{
		path: '/reset',
		name: 'ResetPasswordView',
		component: ResetPasswordView,
	},
	{
		path: '/info',
		name: 'MyPageView',
		component: MyPageView,
	},
	{
		path: '/jwt/:jwt',
		name: 'JWT',
		component: JwtProcess,
	},
	{
		path: '/jwt',
		name: 'JWTFail',
		component: JwtProcess,
	},
	{
		path: '/id/:id',
		name: 'ID',
		component: KakaoProcess,
	},
	{
		path: '/id',
		name: 'IDFail',
		component: KakaoProcess,
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
