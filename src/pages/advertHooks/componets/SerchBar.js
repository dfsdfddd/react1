import React, {  useRef, useCallback,forwardRef, } from "react";
import { Form, Input, Button, Row, Col, Select, DatePicker } from "antd";
import moment from "moment";
const { Option } = Select;
const { RangePicker } = DatePicker;

const formLayout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};
const initialValues = {
	adsId: "",
	adsType: "",
	adsName: "",
	state: "",
	times: [moment(new Date().getTime()), moment(new Date().getTime())],
};

const ButtonWraper = forwardRef((props,ref)=>{
	return(<Button ref={ref}  type="primary" htmlType="submit">查询</Button>);
});

const FormRefWraper = forwardRef((props,ref)=>{
	return (<Form ref={ref} {...props}>
		{props.children}
	</Form>);
});
const SerchBar = (props,ref) => {
	console.log("SerchBar");
	console.log(props);
	const { state: stateOption, adsType: adsTypeOption, addNewOrModi } = props;

	// useEffect(()=>{},[]);

	const formRefSerch = useRef(null);
	const serchBtn = useRef(null);
	// useImperativeHandle(ref,()=>formRefSerch?.current,[formRefSerch]);
  
	const onChange = (value) => {
		console.log(`selected ${value}`);
	};
	const onSearch = useCallback((val) => {
		console.log("search:", val);
	}, []);
	// 表单提交失败
	const onFinishFailed = useCallback((errorInfo) => {
		console.log("Failed:", errorInfo);
	}, []);
	// eslint-disable-next-line
	const clickSubmit = useCallback(() => {
		formRefSerch.current.submit();
	}, []);
	const onFinish = useCallback((values) => {
		console.log("Success:", values);
		props.adsQuery(values);
	},[props]);
	return (<FormRefWraper 
		ref={formRefSerch}
    		className="adsClass"
    		{...formLayout}
    		layout={"vertical"}
    		name="basic"
    		initialValues={initialValues}
    		onFinish={onFinish}
    		onFinishFailed={onFinishFailed}
	>
		<Row>
			<Col span={6}>
				<Form.Item label="广告编号" name="adsId">
					<Input placeholder="请输入内容" />
				</Form.Item>
			</Col>
			<Col span={6}>
				<Form.Item label="广告方式" name="adsType">
					<Select
						style={{ width: 200 }}
						placeholder="请选择"
						onChange={onChange}
						allowClear={true}
					>
						{adsTypeOption &&
	                              Object.keys(adsTypeOption).map((key) => (
	                              	<Option value={key} key={key}>
	                              		{adsTypeOption[key]}
	                              	</Option>
	                              ))}
					</Select>
				</Form.Item>
			</Col>
			<Col span={6}>
				<Form.Item label="广告名称" name="adsName">
					<Input placeholder="请输入内容" />
				</Form.Item>
			</Col>
			<Col span={6}>
				<Form.Item label="状态" name="state">
					<Select
						showSearch
						style={{ width: 200 }}
						placeholder="请选择"
						optionFilterProp="children"
						onChange={onChange}
						onSearch={onSearch}
						filterOption={(input, option) =>
							option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						}
					>
						{stateOption && Object.keys(stateOption).map((key) => (
							<Option key={key} value={key}>
								{stateOption[key]}
							</Option>
						))}
					</Select>
				</Form.Item>
			</Col>
			<Col span={8}>
				<Form.Item label="创建时间" name="times">
					<RangePicker />
				</Form.Item>
			</Col>
			<Col span={6}>
				<Form.Item style={{ marginTop: 35 }}>
					{<ButtonWraper ref={serchBtn} />}
					<Button
						onClick={() => addNewOrModi("新增")}
						style={{ marginLeft: 20 }}
						type="primary"
					>
	            新增
					</Button>
				</Form.Item>
			</Col>
		</Row>
	</FormRefWraper>);
};


export default forwardRef(SerchBar);
