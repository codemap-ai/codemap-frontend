import axios from "axios";

const refineSubmissions = result =>
	result.map(obj => {
		obj.submitDate = new Date(obj.submitDate);
		return obj;
	}).sort((a, b) => a.submitDate < b.submitDate ? 1 : -1);

const getSubmissionsByProblemId = async (problem_id) =>
	refineSubmissions((await axios.get(`http://43.200.180.31:8081/submissions/problem/${problem_id}`, {
		headers: {},
	})).data);

const getSubmissionById = async (submission_id) =>
	refineSubmissions((await axios.get(`http://43.200.180.31:8081/submissions/problem/${submission_id}`, {
		headers: {},
	})).data);

export default {getSubmissionsByProblemId, getSubmissionById};
