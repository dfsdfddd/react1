/*
 * @Author: your name
 * @Date: 2020-03-20 14:41:04
 * @LastEditTime: 2020-07-02 17:20:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react1/src/pages/Icons.js
 */ 
import React,{Component,Fragment} from "react";
import { Card } from "antd";

import { createtext } from "../api/eggapi";
class Icons extends Component{
	componentDidMount(){
		const data = {
			name:"ajlsdjljf",
			weight:"802384px"
		};
		createtext(data).then((result) => {
			const res = result.data;
			console.log(res);
		}).catch((err) => {
			console.log(err);
		});
	}
	render(){
		return (
			<Fragment>
				<Card title={"表单提交"}>

				</Card>
			</Fragment>
		);
	}
}

export default Icons;