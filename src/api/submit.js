import axios from "./localAxios";

export default async (problemId, contestId, language, source, testMode = false, input = null) => {
	return await axios.post("/submit", JSON.stringify({
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
};
