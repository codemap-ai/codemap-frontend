import axios from "axios";

export default async (problemId, contestId, language, source) => {
	return (await axios.post("http://43.200.180.31:8081/submit", JSON.stringify({
		userId: 1,
		problemId,
		contestId,
		language,
		source,
	}), {
		headers: {
			"Content-Type": "application/json",
		},
	})).data;
};
