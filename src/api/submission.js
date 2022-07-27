import axios from "./localAxios";

const refineSubmissions = result =>
	result.body.map(obj => {
		obj.submitDate = new Date(obj.submitDate);
		return obj;
	}).sort((a, b) => a.submitDate < b.submitDate ? 1 : -1);

const getSubmissionsByProblemId = async (problem_id) =>
	refineSubmissions(await axios.get(`/submissions/problem/${problem_id}`, {
		headers: {},
	}));

const getSubmissionById = async (submission_id) =>
	refineSubmissions(await axios.get(`/submissions/problem/${submission_id}`, {
		headers: {},
	}));

export default {getSubmissionsByProblemId, getSubmissionById};
