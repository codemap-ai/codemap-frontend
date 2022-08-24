import axios from "./localAxios";

const problem = (problemId, contestId, language, source, testMode = false, input = null) =>
	axios.post("/submit", JSON.stringify({
		problemId,
		contestId,
		language,
		source,
		testMode,
		input,
	}), {
		headers: {
			"Content-Type": "application/json",
		},
	});

const test = (source, input, language) =>
	axios.post("/submit/test", JSON.stringify({
		language,
		source,
		input,
	}), {
		headers: {
			"Content-Type": "application/json",
		},
	});

export default {problem, test};
