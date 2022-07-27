import axios from "./localAxios";

const getContestById = async (contest_id) =>
	await axios.get(`/contests/${contest_id}`, {
		headers: {},
	});

const startContest = async (problem_set_id) =>
	await axios.post(`/contests/start/`, JSON.stringify({
		problemSetId: problem_set_id,
	}), {
		headers: {
			"Content-Type": "application/json",
		},
	})

export default {getContestById, startContest};
