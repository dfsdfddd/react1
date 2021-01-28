import React, { Component } from "react";
import {
	Form,
	Input,
	Button,
	Row,
	Col,
	Select,
	DatePicker,
} from "antd";
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
class SerchBar extends Component {
	constructor(props) {
		super(props);
		this.formRefSerch = React.createRef();
	}
	componentWillReceiveProps(nextProps){
		console.log("777777",nextProps);
	}
	onChange(value) {
		console.log(`selected ${value}`);
	}
	onSearch(val) {
		console.log("search:", val);
	}
    // 表单提交失败
    onFinishFailed = (errorInfo) => {
    	console.log("Failed:", errorInfo);
    }
    clickSubmit(){
    	this.formRefSerch.current.submit();
    }
    onFinish = (values) => {
    	console.log("Success:", values);
    	this.props.adsQuery(values);
    	// this.setState({
    	//         form: {
    	//             ...this.state.form,
    	//             ...values,
    	//         },
    	//     },
    	//     () => {
    	//         console.log(this.state.form);
    	//         this._popupAdsQuery('1');
    	//     }
    	// );
    };
    render() {
    	const {state:stateOption,adsType:adsTypeOption,addNewOrModi} = this.props;
    	console.log("8989898",this.props);
    	return (
    		<Form
    			ref={this.formRefSerch}
    			className="adsClass"
    			{...formLayout}
    			layout={"vertical"}
    			name="basic"
    			initialValues={initialValues}
    			onFinish={this.onFinish}
    			onFinishFailed={this.onFinishFailed}
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
    							onChange={this.onChange}
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
    							onChange={this.onChange}
    							onSearch={this.onSearch}
    							filterOption={(input, option) =>
    								option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    							}
    						>
    							{stateOption &&
                                    Object.keys(stateOption).map((key) => (
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
    						<Button ref='serchBtn' type="primary" htmlType="submit">
                                查询
    						</Button>
    						<Button onClick={()=>addNewOrModi("新增")} style={{ marginLeft: 20 }} type="primary">
                                新增
    						</Button>
    					</Form.Item>
    				</Col>
    			</Row>
    		</Form>
    	);
    }
}

export default SerchBar;
