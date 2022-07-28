import axios from "./localAxios";
import judgeResults from "@/constants/judgeResults";

const refineSubmissions = result =>
	result.map(obj => {
		obj.submitDate = new Date(obj.submitDate);
		obj.result = judgeResults[obj.result];
		return obj;
	}).sort((a, b) => a.submitDate < b.submitDate ? 1 : -1);

const getSubmissionsByProblemId = async (problem_id) =>
	refineSubmissions(await axios.get(`/submissions/problem/${problem_id}`, {
		headers: {},
	}));

const getSubmissionById = async (submission_id) =>
	refineSubmissions([await axios.get(`/submissions/problem/${submission_id}`, {
		headers: {},
	})])[0];

export default {getSubmissionsByProblemId, getSubmissionById};
