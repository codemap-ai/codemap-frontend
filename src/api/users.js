import axios from "./localAxios";

const signup = async (username, password, nickname) =>
	await axios.post("/users/signup", JSON.stringify({
		username,
		password,
		nickname,
	}), {
		headers: {
			"Content-Type": "application/json",
		},
	});

const signin = async (username, password) =>
	await axios.post("/users/signin", JSON.stringify({
		username,
		password,
	}), {
		headers: {
			"Content-Type": "application/json",
		},
	});

const me = async () =>
	await axios.get("/users/me", {
		headers: {
			"Content-Type": "application/json",
		},
	});

export default {signup, signin, me};
