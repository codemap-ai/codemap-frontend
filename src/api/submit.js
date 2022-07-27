import axios from "./localAxios";

export default async (problemId, contestId, language, source) => {
	return await axios.post("/submit", JSON.stringify({
		userId: 1,
		problemId,
		contestId,
		language,
		source,
	}), {
		headers: {
			"Content-Type": "application/json",
		},
	});
};
