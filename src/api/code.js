import axios from "./localAxios";

const save = async (problemId, contestId, code, language) =>
	await axios.post(`/code/save`, JSON.stringify({
		problemId,
		contestId,
		code,
		language,
	}), {
		headers: {
			"Content-Type": "application/json",
		},
	});

const load = async (problemId, contestId, language) =>
	await axios.post(`/code/load`, JSON.stringify({
		problemId,
		contestId,
		language,
	}), {
		headers: {
			"Content-Type": "application/json",
		},
	});

export default {load, save};
