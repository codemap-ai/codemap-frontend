import axios from "axios";
import {getToken} from "@/api/token";

let instance = axios.create({
	baseURL: "http://43.200.181.40:8081",
});
instance.interceptors.response.use(ret => {
	// if (typeof ret.data?.responseEntity !== "undefined") {
	// 	ret.data = ret.data.responseEntity;
	// }
	return ret.data;
}, err => err.response.data);

instance.interceptors.request.use(req => {
	let token = getToken();

	if (token !== null) {
		req.headers["Authorization"] = `Bearer ${token}`;
	}
	return req;
});

export default instance;
