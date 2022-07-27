import axios from "./localAxios";

const getAll = async () =>
	await axios.get(`/problem_sets`, {
		headers: {},
	});

const getProblemSetById = async (problem_set_id) =>
	await axios.get(`/problem_sets/${problem_set_id}`, {
		headers: {},
	});

export default {getAll, getProblemSetById};
