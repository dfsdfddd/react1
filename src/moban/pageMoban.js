import React, { Component } from "react";
import PropTypes from "prop-types";

class Demo extends Component {
    // 静态属性
    // static 属性
    // static 方法
    static defaultProps = {
    	name: "stranger"
    }

    // 构造方法
    constructor(props, context) {
    	super(props, context);
    	this.state = {
    		//定义state
    	};
    }
    getChildContext(){}
    // 生命周期相关
    componentWillMount() {}
    componentDidMount() {}
    componentWillReceiveProps(nextProps) {}
    shouldComponentUpdate(nextProps, nextState) {}
    componentWillUpdate(nextProps, nextState) {}
    componentDidUpdate(prevProps, prevState) {}
    componentWillUnmount() {}
    // 页面点击事件相关
    onclickSubmitOnchange = () => {}
    // 其他页面相关
    yourMethoed1() {}
    yourMethoed2() {}

    //render的getter 方法
    getSelectReason(){}
    getFooterContent(){}
    //可选的render方法
    renderNavigation(){}
    renderProfilePicture(){}
    render() {
    	return <div></div>;
    }
}

// 定义 propTypes, defaultProps, contextTypes ???

// 校验props
Demo.propTypes = {
	name: PropTypes.string
};

// 设置props的默认值
Demo.defaultProps = {
	bar: "",
	children: null,
};

export default Demo;
