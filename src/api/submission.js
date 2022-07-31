import axios from "./localAxios";
import judgeResults from "@/constants/JudgeResults";

const refineSubmissions = (result, contestId) =>
	result.map(obj => {
		obj.submitDate = new Date(obj.submitDate);
		obj.result = judgeResults[obj.result];
		if (obj.result === undefined) {
			return null;
		}
		if (contestId !== null && obj.contestId !== contestId) {
			return null;
		}
		return obj;
	}).filter(a => a !== null).sort((a, b) => a.submitDate < b.submitDate ? 1 : -1);

const getSubmissionsByProblemId = async (problem_id, contestId = null) =>
	refineSubmissions(await axios.get(`/submissions/problem/${problem_id}`, {
		headers: {},
	}), contestId);

const getSubmissionById = async (submission_id, contestId = null) =>
	refineSubmissions([await axios.get(`/submissions/problem/${submission_id}`, {
		headers: {},
	})], contestId)[0];

export default {getSubmissionsByProblemId, getSubmissionById};
