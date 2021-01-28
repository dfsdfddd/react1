import React, { Component } from "react";

class Demo extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			//定义state
		};
	}
	componentWillMount() {}
	componentDidMount() {}
	componentWillReceiveProps(nextProps) {}
	shouldComponentUpdate(nextProps, nextState) {}
	componentWillUpdate(nextProps, nextState) {}
	componentDidUpdate(prevProps, prevState) {}
	componentWillUnmount() {}
	yourMethoed1() {}
	yourMethoed2() {}
	render() {
		return <div></div>;
	}
}
export default Demo;
