
import React,{Fragment,useState,useEffect,forwardRef,useRef} from "react";

const Child = forwardRef((props,ref)=> {
	useEffect(()=>{
		console.log("[]");
	},[]);
	return (<div>{JSON.stringify(props.count)}</div>);
});


const Loading = (props) =>{
	const ownRef = useRef(null);
	const [count,setCount] = useState({});
	useEffect(()=>{
		setTimeout(() => {

			console.log("1111",ownRef);
			setCount({a:1,b:2});
		}, 2000);
	},[]);
  
	useEffect(()=>{
		console.log("count change");
	},[count]);
	console.log(props);
	return (
		<Fragment>
			<Child ref={ownRef} count={count} /> 
			<button onClick={()=>{setCount(count+1);}}>{JSON.stringify(count)}</button>
		</Fragment>
    
	);
};

export default Loading;