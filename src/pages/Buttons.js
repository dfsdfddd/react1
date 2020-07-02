import React,{Component,Fragment} from 'react';
import { Table,Form, Input, Button,Row, Col,Card,message,Select } from 'antd';
import {  queryUsers,queryRoleList } from '../api/oporate'
//需要的接口

const {Option} = Select

class Buttons extends Component{
  state={
    pageSize:20,
    pageNum:1,
    dataList:[],
    total:0,
    form:{
      usercode:'',
      username:'',
      rolename:'',
      state:''
    }
  }
  componentDidMount(){
    this._queryRoleList()
  }
  _queryRoleList = ()=> {
    queryRoleList().then(result => {
      if (result.status === 200) {
        this.optionRole = result.data
      } else {
        message.error('系统错误')
      }
    })
      .catch(err => {
        console.log(err)
      })
  }
  
  // 分页查询
  _queryUsers(type) {
    if (type === '1') {
      this.setState({
        pageSize:20,
        pageNum:1,
        total:0
      })
    }
    setTimeout(() => {
      const data = {
        orgNoBean:{orgNo5: "0000100000", orgNo1: "1", orgNo2: "1", orgNo3: "1", orgNo4: "1"},
        usercode: this.state.form.usercode,
        username: this.state.form.username,
        rolename: this.state.form.rolename,
        state: this.state.form.state,
        pageSize: this.state.pageSize,
        pageNum: this.state.pageNum
      }
      console.log(data)
      queryUsers(data)
        .then(result => {
          const res = result.data
          if (res.code === 200) {
            console.log(res)
            this.setState({
              dataList:res.data.data,
              total:res.data.maxRowCount
            })
          } else {
            message.error(res.message)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }, 0);
    
  }
  getData(){
    const list = [{
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
    {
      key: '3',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '4',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    }]
    setTimeout(() => {
      this.setState({
        dataList: {
          list,
          total:4
        }
      })
    }, 2000);
  }
  _searchBar(){
    // 定义布局样式
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    // const tailLayout = {
    //   wrapperCol: { offset: 8, span: 16 },
    // };
    // select 事件
    function onChange(value) {
      console.log(`selected ${value}`);
    }
    
    function onSearch(val) {
      console.log('search:', val);
    }
    // 表单提交完成成功
    const onFinish = values => {
      console.log('Success:', values);
      this.setState({
        form:{
          ...this.state.form,
          ...values
        }
      },()=>{
        console.log(this.state.form)
        this._queryUsers('1')
      })
    };
    // 表单提交失败
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
      
    };
    
    const stateOption = {
      '00': '正常',
      '01': '冻结',
      '02': '禁用',
      '03': '注销'
    }
    
    return (
      <Form
      {...layout}
      layout={'vertical'}
      name="basic"
      initialValues={{ usercode:'',username:'', rolename:'', state:'',  }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
       <Row>
        <Col span={6}>
          <Form.Item
          label="登录用户名"
          name="usercode"
        >
          <Input placeholder="请输入内容" />
        </Form.Item>
        </Col>
        <Col span={6}>
        <Form.Item
            label="用户名称"
            name="username"
          >
            <Input placeholder="请输入内容" />
          </Form.Item>
        </Col>
        <Col span={6}>
        <Form.Item label="用户角色" name="rolename">
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
            {this.optionRole && this.optionRole.map((item,idx)=>(<Option key={idx} value={item.rolename}>{item.rolename}</Option>))}
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>
        </Form.Item>
        </Col>
        <Col span={6}>
        <Form.Item label="用户状态" name="state">
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
            {Object.keys(stateOption).map((key)=>(<Option key={key} value={key}>{stateOption[key]}</Option>))}
          </Select>
        </Form.Item>
        </Col>
        
      </Row>
      <Row>
      <Col span={6}>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        </Col>
      </Row>
    </Form>
    )
  }
  changePage = (page) =>{
    console.log(page)
    this.setState({
      pageNum:page,
    },()=>{
      this._queryUsers()
    })
  }
  render(){
    const dataSource = this.state.dataList
    
    const columns = [
      {
        title: '用户名',
        dataIndex: 'usercode',
        key: 'usercode',
      },
      {
        title: '用户名称',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: '用户角色',
        dataIndex: 'rolename',
        key: 'rolename',
      },
      {
        title: '所属内部机构',
        dataIndex: 'orgNm',
        key: 'orgNm',
      },
      {
        title: '用户状态',
        dataIndex: 'state',
        key: 'state',
      },
      {
        title: '操作',
        key: 'action',
        dataIndex: 'action',
        render: (text, record) => (
          <span>
            <a  href="/#" style={{ marginRight: 16 }}>重发邮件 {record.state}</a>
            <a  href="/#">赋角色</a>
            <a  href="/#">修改</a>
            <a  href="/#">重置密码</a>
            <a  href="/#">注销</a>
          </span>
        ),
      },
    ];
    return (
      <Fragment>
        <Card style={{marginBottom:20}}>
        {this._searchBar()}
       </Card>
       <Card >
        <Table bordered={true} dataSource={dataSource} columns={columns} rowKey={(record, index) => index}
        pagination = {{
          showTotal:total => `Total ${total} items`,
          showQuickJumper:true,
          total:this.state.total,
          onChange:this.changePage,
          current:this.state.pageNum,
          pageSize:this.state.pageSize
        }}
         />
       </Card>
      </Fragment>
    
    )
  }
}
// https://www.cnblogs.com/crazycode2/p/9704382.html  table 分页
export default Buttons