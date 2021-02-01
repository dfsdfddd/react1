import React,{useEffect,useState,useCallback,Fragment,useRef,useMemo} from "react";
import {  Card, message} from "antd";
import { getDataDicTionary,popupAdsQuery} from "../../api/advertManage.js";
import moment from "moment";
//需要的接口

import SerchBar from "./componets/SerchBar";
import PageTable from "./componets/PageTable";
import AddModel from "./componets/AddModel";
// import TestCom from "./componets/TestCom";

const AdHooksPage = (props) =>{
	// ref
	const serchBar1 = useRef(null);
	const addModel1 = useRef(null);

	// state
	// eslint-disable-next-line no-unused-vars
	const [pageSize,setPageSize]  = useState(20);
	const [pageNum,setPageNum]  = useState(1);
	const [dataList,setDataList]  = useState([]);
	const [total,setTotal]  = useState(0);
	const [baseMap,setBaseMap]  = useState({});
  
	// useEffect
	useEffect(()=>{
		getDataDicTionary({}).then(result => {
  		const res = result.data;
  		if (res.status === "success") {
  			const {data} = res;
  			setBaseMap(data);
  		} else {
  			message.error(res.msg || res.message);
  		}
  	});
	},[]); 
  
	const adsQuery = (params) => {
  	const data = {
  		queryStartDate: moment(params.times[0]).format("YYYYMMDD"),
  		queryEndDate: moment(params.times[1]).format("YYYYMMDD"),
  		pageSize,
  		pageNum,
  		...params
  	};
  	if(data.times){delete data.times;}
  	popupAdsQuery(data).then(result => {
  		const res = result.data;
  		if (res.status === "success") {
				setDataList(res.list);
				setTotal(res.data.total);
  		} else {
  			message.error(res.msg);
  		}
  	});
	};
	const addNewOrModi = useCallback((title)=>{
		addModel1.current.isShowModel(title);
	},[]); 
	const handleClick = useCallback((row) => {
  	addModel1.modifyData("修改",row);
	},[]);

	const baseQuery = useCallback(()=>{
  	console.log("serchBar1",serchBar1);
  	serchBar1.clickSubmit();
	},[]);
	const changePage = useCallback((page) => {
		setPageNum(page);
  		serchBar1.clickSubmit();
  
	},[]);
  
	// const tableData = {
	// 	baseMap,
	// 	dataSource:dataList,
	// 	total:total,
	// 	current:pageNum,
	// 	changePage:changePage,
	// 	handleClick
	// };
  
	const tableData = useMemo(()=>{
		return {
			baseMap,
			dataSource:dataList,
			total:total,
			current:pageNum,
			changePage:changePage,
			handleClick
		};
	},[baseMap,dataList,total,pageNum]);
  
	const newBaseMap = useMemo(()=>{
		return {baseMap};
	},[baseMap]);
	// pageAssemble
	// const SerchBarWrap = forwardRef((props,ref)=>{
	// 	return(<SerchBar ref={ref} {...props} />);
	// });
  
	// const AddModelWrap = forwardRef(AddModel);
	return (
		<Fragment>
			<Card style={{ marginBottom: 20 }}>
				{<SerchBar ref={serchBar1} {...baseMap} adsQuery={adsQuery} addNewOrModi={addNewOrModi} />}
			</Card>
			<Card >
				{<PageTable {...tableData} />}
			</Card>
			{<AddModel ref={addModel1} {...newBaseMap} baseQuery={baseQuery} />}
			{/* {<TestCom {...newBaseMap} />} */}
		</Fragment>
	);
};

export default AdHooksPage;