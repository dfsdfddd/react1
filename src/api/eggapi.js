import request from "./requestOther";

// 查询操作员
export function createtext(data) {
	return request({
		url: "/create",
		method: "post",
		data
	});
}