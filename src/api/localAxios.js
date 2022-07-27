import axios from "axios";

let instance = axios.create({
	baseURL: "http://43.200.180.31:8081",
});
instance.interceptors.response.use(ret => {
	if (typeof ret.data?.responseEntity !== "undefined") {
		ret.data = ret.data.responseEntity;
	}
	return ret.data.body;
}, err => err.response);

export default instance;
