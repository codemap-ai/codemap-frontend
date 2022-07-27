import axios from "./localAxios";

const getAll = async () =>
	await axios.get(`/problems`, {
		headers: {},
	});

const getProblemById = async (problem_id) =>
	await axios.get(`/problems/${problem_id}`, {
		headers: {},
	});

export default {getAll, getProblemById};
