import axios from "./localAxios";

const getContestById = async (contest_id) =>
	await axios.get(`/contests/${contest_id}`, {
		headers: {},
	});

const startContest = async (problemSetId) =>
	await axios.post(`/contests/start/`, JSON.stringify({
		problemSetId,
	}), {
		headers: {
			"Content-Type": "application/json",
		},
	});

const finishContest = async (contestId) => await axios.post(`/contests/finish/`, JSON.stringify({
	contestId,
}), {
	headers: {
		"Content-Type": "application/json",
	},
});

export default {getContestById, startContest, finishContest};
