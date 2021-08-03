// hooks
// 函数经过 useState后可以返回数据


//useProductData.jsx
 
import React from "react";
import { getProductList } from "../../module/product";
import {useState,useEffect} from "react";


//use
// import useProductData from './components/ProductListHooks/useProductData'
import AdminProductList from "./components/AdminProductList";
import FrontProductList from "./components/FrontProductList";
 
export default function useProductData(){
	const [proList,setProductList] = useState([]);
	useEffect(()=>{
		getProductList().then(list => {
			setProductList(list);
		});
	},[]);
 
	return proList; //返回列表数据
};
 
 
function App(){
	const prolist = useProductData();
	return <AdminProductList proList={prolist}/>;
}

// effect 第二个参数为数组，支持多个参数且第二个参数为浅比较 ，支持函数
// []的时候  数组只执行一次
// 有return的时候 相当于组件卸载的时候执行

// useCallback 了解hooks看下面两个就可以了
// hooks 使用规范 https://www.cnblogs.com/vicky24k/p/11371771.html   比较重要
// hooks 相对比较总的一个链接 https://www.cnblogs.com/cckui/p/13371534.html 比较重要

// 1.组件里有默认参数而且需要根据入参的变化而变化时使用函数 ()=>{} 传参：

// function App(props) {
//   const [count, setCount] = useState(() => {
//     return props.defaultCount || 0;
//   })
// }


// 2.useMemo(() => fn) 等价于 useCallback(fn)

// 复制代码
// const double = useMemo(() => {
//   return count * 2;
// }, [count === 3]);

// const onClick = useCallback(() => {
//   setClickCount(clickCount => clickCount + 1)
// }, []);

// 3.useRef的两种使用场景：
//（1）相当于class component里的createRef
//（2）想当于class component里的常量
// 4.函数作为参数传递时加useCallback


// （4）强制更新
// 定义一个额外变量,让函数依赖这个额外变量，这个额外变量变化时会执行更新

// react hooks 父子组件通信总结 https://www.cnblogs.com/shine1234/p/13223391.html 比较重要 https://blog.csdn.net/qq_39770065/article/details/110424964
// react hooks 父子之间的通信  https://www.yuque.com/senkita/reviews/gbipsa




// react hooks:简单原理： 
// 1、React hooks中的state和props,在每次渲染的过程中都是重新生成和独立的
// 2、我们可以使用useRef，创建一个“常量”，该常量在组件的渲染期内始终指向同一个引用地址
// 3、每一渲染都会生成不同的render函数，并且每一次渲染通过useEffect会生成一个不同的Effects，Effects在每次渲染后声效
// 4、渲染render中，effect位于同步执行队列的最后面，在dom更新或者函数返回后在执行。


// http://www.zyiz.net/tech/detail-143281.html  react hook 的一些总结


// react hook出现的原因和作用
// 用于在函数组件中引入状态管理和生命周期方法
// 取代高阶组件和render props来实现抽象和可重用性


// react 总结全面的2:https://blog.csdn.net/kellywong/article/details/106430977    

// useState实现原理 https://codepen.io/kellywang/pen/GRjvbEQ

// https://www.jianshu.com/p/58c04356e433  props hooks hoc 重点比较清晰的

// https://blog.csdn.net/sinat_17775997/article/details/96476696  全面解析 react hooks


// react-hook useState 和 setState 的区别 https://segmentfault.com/a/1190000022414432

// useState({name:'',age:''}) 是一个对象的时候 当重新setState 的时候没有immunitable 没有合并