import axios from "./localAxios";

const save = async (problemId, contestId, code) =>
	await axios.post(`/code/save`, JSON.stringify({
		problemId,
		contestId,
		code,
	}), {
		headers: {
			"Content-Type": "application/json",
		},
	});

const load = async (problemId, contestId) =>
	await axios.post(`/code/load`, JSON.stringify({
		problemId,
		contestId,
	}), {
		headers: {
			"Content-Type": "application/json",
		},
	});

export default {load, save};
