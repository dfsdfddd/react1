import axios from "axios";
import { message } from "antd";
// import router from '../router'

const baseUrl = "/api";
const token = sessionStorage.getItem("theToken");
console.log("token",token);

const instance = axios.create({
	withCredentials:true,
	crossdomain: true,
	baseURL: baseUrl,
	timeout: 50000, // 请求超时时间
	headers:{
		"Content-Type":"application/json",
		"token":token || "dadba24e-67c9-4467-87a5-52861dc18e74"
	}
});

// 请求拦截器
instance.interceptors.request.use(config => {
	return config;
}, error => {
	Promise.reject(error);
});

// 返回拦截器
instance.interceptors.response.use(function (response) {
	return response;
}, function (error) {
	console.log(error.response);
	// 请求错误时做些事
	if (error.message.indexOf("timeout") >= 0) {
		message.error("请求超时");
	}else if (error.response) {
		message.error("错误码:"+error.response.status);
	}else{
		message.error("系统错误");
	}
	return Promise.reject(error);
});

export default instance;
