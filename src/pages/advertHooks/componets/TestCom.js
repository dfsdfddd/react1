import React,{useEffect} from "react";


const TestCom = (props)=>{
	console.log("this is in TestCom");
	useEffect(()=>{
		console.log("test []");
	},[]);
	useEffect(()=>{
		console.log("test props");
	},[props]);
	return (<div>{JSON.stringify(props.baseMap)}</div>);
};


export default TestCom;