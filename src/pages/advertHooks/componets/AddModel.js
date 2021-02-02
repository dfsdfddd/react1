import React, { Fragment,useRef,useState,useEffect, useCallback,forwardRef,useImperativeHandle, useMemo } from "react";
import { Cascader, Form, Input, Button, message, Select, DatePicker, Modal, Upload } from "antd";
import moment from "moment";

import {getOrgList,popupAdsAdd,popupAdsDown} from "../../../api/advertManage.js";
import {getParents,findObj} from "../../../utils/index";

const {Option} = Select;

const layouts = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 16,
	},
};
const initValues = {
	adsId:"",
	adsName: "", // 广告名称
	adsType: "", // 广告方式
	imgPath:"",// 图片存放路径
	imgClickUrl: "", //图片url
	adsTitle: "", // 广告标题
	adsContent: "", //广告内容
	btnText: "", // 按钮文字
	btnClickUrl: "", // 按钮链接
	actionType: "", //弹窗对象
	actionOrgNo:[], // 机构号
	actionOrgName:"",// 机构名称
	actionStoragePath:"",//弹窗对象列表文件存放路径
	actionFrequency: "", //弹窗频率
	startDate: "", //开始时间
	endDate: "", //结束时间
	state: "00" //状态
};
const uploadCommonUp = {
	name: "file",
	action: "http://op.eptok.com/mabaseMan/popupAds/uploadFile",
	headers: {
		token: sessionStorage.getItem("theToken")||"b307cac1-c56f-4851-962e-1cafef5d18ed",
	},
};

const FormRefWraper = forwardRef((props,ref)=>{
	return (<Form ref={ref} {...props}>{props.children}</Form>);
});

const AddModel = (props,ref) =>{
  
	const formRef = useRef(null);
	const getOptionsList = useRef([]);

	const {baseMap,baseQuery} = props;
	const {state:stateOption,adsType:adsTypeOption,actionType,actionFrequency} = baseMap;


	const[visible,setVisible] = useState(false);
	const[addChangeTitle,setAddChangeTitle] = useState("新增");
	const[fileList,setFileList] = useState([]);
	const[fileList2,setFileList2] = useState([]);

	useImperativeHandle(ref, () => ({
		isShowModel(title){
			setVisible(!visible);
		  setAddChangeTitle(title);
		},
		modifyData(title,row){
			setVisible(true);
			setAddChangeTitle(title);
      
			//机构
			let orgNolist = [];
			if(row.actionType === "04"){
				let listarr = getParents(getOptionsList, row.actionOrgNo);
				listarr.push(row.actionOrgNo);
				orgNolist = listarr;
			}
			formRef&&formRef.current.setFieldsValue({
				adsId:row.adsId,
				adsName: row.adsName, // 广告名称
				adsType: row.adsType, // 广告方式
  
				imgPath:row.imgPath,// 图片存放路径
				imgClickUrl: row.imgClickUrl, //图片url
  
				adsTitle: row.adsTitle, // 广告标题
				adsContent: row.adsContent, //广告内容
				btnText: row.btnText, // 按钮文字
				btnClickUrl: row.btnClickUrl, // 按钮链接
				actionType: row.actionType, //弹窗对象
				actionOrgNo:orgNolist, // 机构号
				actionOrgName:row.actionOrgName,// 机构名称
				actionStoragePath:row.actionStoragePath,//弹窗对象列表文件存放路径
				actionFrequency: row.actionFrequency, //弹窗频率
				startDate: moment(row.startDate), //开始时间
				endDate: moment(row.endDate), //结束时间
				state: row.state, //状态
			});
			if(row.adsType === "01"){
				setFileList({
					fileList:[{
						uid: "-1",
						name: row.imgPath,
						status: "done",
						url: popupAdsDown(row.imgPath),
						thumbUrl: popupAdsDown(row.imgPath),
					}],
				});
			}
			if(row.actionType==="02"||row.actionType==="03"){
				setFileList2({
					fileList2:[{
						uid: "-1",
						name: row.actionStoragePath,
						status: "done",
						url: popupAdsDown(row.actionStoragePath),
						thumbUrl: popupAdsDown(row.actionStoragePath),
					}],
				});
			}
        
			formRef.current.validateFields();
		}
	}));
	useEffect(()=>{
		console.log("init add model");
		_getOrgList();
		// JSON.stringify(baseMap) !== "{}" && _getOrgList();
	},[]);
	useEffect(()=>{
		console.log("init add baseMap");
		// JSON.stringify(baseMap) !== "{}" && _getOrgList();
	},[baseMap]);
  

	const _getOrgList = () => {
		getOrgList().then((result) => {
			const res = result.data;
			if (res.code !== 200) return message.warning(res.msg);
			// eslint-disable-next-line no-const-assign
			getOptionsList = res.data.orgList;
		}).catch((err) => {
			console.log("查询机构报错：" + err);
		});
	};
	// 新增
	const popupAdsAddFuc = (values) => {
		const data = { ...values };
		// 处理机构号和机构名称
		if(data.actionType === "04"){
			data.actionOrgNo = values.actionOrgNo.slice(-1)[0];
			const orgObj = findObj(getOptionsList,data.actionOrgNo);
			data.actionOrgName = orgObj.orgNm;
		}else{
			data.actionOrgNo = "";
		}
		data.startDate = values.startDate.format("YYYYMMDD");
		data.endDate = values.endDate.format("YYYYMMDD");
		console.log("add--data",data);
		popupAdsAdd(data).then(result => {
			const res = result.data;
			if (res.status === "success") {
				message.success(res.msg);
				clearAndHideModel();
				baseQuery();
			} else {
				message.error(res.msg);
			}
		});
	};
	
	const clearAndHideModel =() =>{
		formRef.current.resetFields(); // 清空表单
		setVisible(false);
	};
  

	const onCreate = values => {
		popupAdsAddFuc(values);
	}; 

	const onChange = useCallback((value) => {
		console.log(value);
	},[]); 
  

  	const uploadOption = useMemo(()=>{
		return {
			...uploadCommonUp,
			fileList: fileList,
			listType: "picture",
			beforeUpload(file) {
				const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
				if (!isJpgOrPng) {
					message.error("上传格式只能是 jpg、png、gif 格式");
				}
				const isLt3M = file.size / 1024 / 1024 < 3;
				if (!isLt3M) {
					message.error("上传图片大小不能超过 3MB!");
				}
				return isJpgOrPng && isLt3M;
			},
			onChange(info) {
				if(info.file.status === "removed"){ // 点击删除文件的时候
					formRef.current.setFieldsValue({ imgPath: undefined });
					formRef.current.validateFields(["imgPath"]);
				}
				let fileList = [...info.fileList];
				// 只留列表的最后一个，之前的都删除
				fileList = fileList.slice(-1);
				fileList = fileList.map(file => {
					if (file.response) {
						const res = file.response;
						if (res.status === "success") {
							file.url = res.url;
							formRef.current.setFieldsValue({ imgPath: res.data.groupName + "," + res.data.remoteFileName });
						} else {
							formRef.current.setFieldsValue({ imgPath: "" });
							file.status = "error";
							message.error(res.msg);
						}
						formRef.current.validateFields(["imgPath"]);
					}
					return file;
				});
				setFileList(fileList);
			},
			onRemove(file){
				return true;
			}
		};
	},[fileList]);
	const uploadOption2 = useMemo(()=>{
		return {
			...uploadCommonUp,
			fileList: fileList2,
			beforeUpload(file) {
				const extension = file.name.split(".")[1] === "txt";
				if (!extension) {
					message.error("上传格式只能是 txt 格式");
				}
				const isLt3M = file.size / 1024 / 1024 < 10;
				if (!isLt3M) {
					message.error("上传文件大小不能超过 10MB!");
				}
				if(!extension && isLt3M){
					file.status = "error";
				}
				return extension && isLt3M;
			},
			onChange(info) {
				console.log(info);
				let fileList = [...info.fileList];
				// 只留列表的最后一个，之前的都删除
				fileList = fileList.slice(-1);
				fileList = fileList.map(file => {
					if (file.response) {
						const res = file.response;
						if (res.status === "success") {
							file.url = res.url;
							formRef.current.setFieldsValue({ actionStoragePath: res.data.groupName + "," + res.data.remoteFileName });
						} else {
							formRef.current.setFieldsValue({ actionStoragePath: "" });
							file.status = "error";
							message.error(res.msg);
						}
						formRef.current.validateFields(["actionStoragePath"]);
					}
					return file;
				});
				console.log(fileList);
				setFileList2(fileList);
			},
		};
	},[fileList2]);
  


	
    
	return (
		<Modal
			forceRender
			visible={visible}
			title={addChangeTitle}
			okText="确定"
			cancelText="取消"
			onCancel={()=>{
				formRef.current.resetFields(); // 清空表单
				setVisible(false);
			}}
			onOk={() => {
				formRef.current.validateFields().then(values => {
					onCreate(values);
				}).catch(err => {
					console.log("校验不通过",err);
				});
			}}
		>
			<FormRefWraper
				ref={formRef}
				layout={layouts}
				name="form_in_model"
				initialValues={initValues}
			>
				<Form.Item name="adsName" label="广告名称" hasFeedback rules={[{
					required: true,
					message: "请输入广告名称"
				}]}
				>
					<Input />
				</Form.Item>
				<Form.Item name="adsType" label="广告方式" hasFeedback rules={[{
					required: true,
					message: "请选择广告方式"
				}]}
				>
					<Select style={{ width: 200 }} placeholder="请选择" allowClear={true}>
						{adsTypeOption && Object.keys(adsTypeOption).map((key) => (<Option value={key} key={key}>{adsTypeOption[key]}</Option>))}
					</Select>
				</Form.Item>
				<Form.Item noStyle shouldUpdate={(prevValues, currentValues) => {
					return prevValues.adsType !== currentValues.adsType;
				}}>
					{({ getFieldValue }) => {
						return getFieldValue("adsType") === "01" ? (<Fragment>
							<Form.Item name="imgPath" label="上传图片" hasFeedback rules={[{
								required: true,
								message: "请输入图片链接"
							}]}
							>
								<Upload {...uploadOption} >
									<Button>点击上传</Button>
								</Upload>
							</Form.Item>
							<Form.Item name="imgClickUrl" label="图片链接" hasFeedback rules={[{
								required: true,
								message: "请输入图片链接"
							}]}
							>
								<Input />
							</Form.Item>
						</Fragment>) : null;
					}}
				</Form.Item>

				<Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.adsType !== currentValues.adsType}>
					{({ getFieldValue }) => {
						return getFieldValue("adsType") === "02" ? (<Fragment>
							<Form.Item name="adsTitle" label="广告标题" hasFeedback rules={[{
								required: true,
								message: "请输入广告标题"
							}]}
							>
								<Input />
							</Form.Item>
							<Form.Item name="adsContent" label="广告内容" hasFeedback rules={[{
								required: true,
								message: "请输入广告内容"
							}]}
							>
								<Input />
							</Form.Item>
							<Form.Item name="btnText" label="按钮文字" hasFeedback rules={[{
								required: true,
								message: "请输入按钮文字",
								validateTrigger: ["onChange"]
							}]}
							>
								<Input />
							</Form.Item>
							<Form.Item name="btnClickUrl" label="按钮链接" hasFeedback rules={[{
								required: true,
								message: "请输入按钮链接"
							}]}
							>
								<Input.TextArea rows={4} />
							</Form.Item>
						</Fragment>)  : null;
					}}
				</Form.Item>
				<Form.Item name="actionType" label="弹窗对象" hasFeedback rules={[{
					required: true,
					message: "请选择弹窗对象"
				}]}
				>
					<Select style={{ width: 200 }} placeholder='请选择' allowClear={true}>
						{actionType && Object.keys(actionType).map(key => <Option value={key} key={key}>{actionType[key]}</Option>)}

					</Select>
				</Form.Item>
				<Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.actionType !== currentValues.actionType}>
					{({getFieldValue})=>{
						return getFieldValue("actionType") === "04" ? (<Form.Item name="actionOrgNo" label="所属机构" hasFeedback rules={[{
							required: true,
							message: "请输入内容1"
						}]}
						>
							<Cascader options={getOptionsList} onChange={onChange} fieldNames={{
								value: "orgNo",
								label: "orgNm",
								children: "lowList"
							}} placeholder="请选择" changeOnSelect={true} showSearch={true} />
						</Form.Item>) : null;
					}}
				</Form.Item>
				<Form.Item noStyle shouldUpdate={(prevValues,currentValues) => prevValues.actionType !== currentValues.actionType}>
					{({getFieldValue})=>{
						const actionType = getFieldValue("actionType");
						return actionType === "02" || actionType === "03" ? (<Form.Item name="actionStoragePath" label={actionType === "02" ? "上传商户列表" : "上传代理商列表"} hasFeedback rules={[{
							required: true,
							message: "请上传商户列表"
						}]}
						>
							<Upload {...uploadOption2} >
								<Button>点击上传</Button>
							</Upload>
						</Form.Item>) : null;
					}}
				</Form.Item>
				<Form.Item name="actionFrequency" label="弹窗频率" hasFeedback rules={[{
					required: true,
					message: "请选择弹窗频率"
				}]}
				>
					<Select
						style={{ width: 200 }}
						placeholder="请选择"
						allowClear={true}
					>
						{actionFrequency && Object.keys(actionFrequency).map(key => <Option value={key} key={key}>{actionFrequency[key]}</Option>)}
					</Select>
				</Form.Item>
				<Form.Item name="startDate" label="开始日期" hasFeedback rules={[{
					required: true,
					message: "请输入开始日期",
				}, ({ getFieldValue }) => ({
					validator(rule, value) {
						if (value && getFieldValue("endDate") && value * 1 > getFieldValue("endDate") * 1) {
							return Promise.reject("开始日期应小于结束日期");
						}
						return Promise.resolve();
					}
				})]}
				>
					<DatePicker format="YYYYMMDD" />
				</Form.Item>
				<Form.Item name="endDate" label="结束日期" hasFeedback rules={[{
					required: true,
					message: "请输入结束日期"
				}, ({ getFieldValue }) => ({
					validator(rule, value) {
						if (value && getFieldValue("startDate") && value * 1 < getFieldValue("startDate") * 1) {
							return Promise.reject("结束日期应大于开始日期");
						}
						return Promise.resolve();
					}
				})]}
				>
					<DatePicker format="YYYYMMDD" />
				</Form.Item>
				<Form.Item name="state" label="状态" hasFeedback rules={[{
					required: true,
					message: "请选择状态"
				}]}
				>
					<Select
						allowClear={true}
						style={{ width: 200 }}
						placeholder="请选择"
					>
						{stateOption && Object.keys(stateOption).map(key => <Option value={key} key={key}>{stateOption[key]}</Option>)}
					</Select>
				</Form.Item>
			</FormRefWraper>
		</Modal>
	);
};

export default  forwardRef(AddModel);