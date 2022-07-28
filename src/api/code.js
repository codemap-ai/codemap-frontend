import axios from "./localAxios";

const save = async (problem_id, contest_id, code) =>
	await axios.post(`/code/save`, JSON.stringify({
		code,
		contestId: contest_id,
		problemId: problem_id
	}), {
		headers: {
			"Content-Type": "application/json",
		},
	});

const load = async (problem_id, contest_id) =>
	await axios.post(`/code/load`, JSON.stringify({
		contestId: contest_id,
		problemId: problem_id
	}), {
		headers: {
			"Content-Type": "application/json",
		},
	});

export default {load, save};
