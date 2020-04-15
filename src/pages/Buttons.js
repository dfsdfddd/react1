import React,{Component,Fragment} from 'react';
  import { Table,Form, Input, Button, Checkbox,Row, Col,Card } from 'antd';

class Buttons extends Component{
  state={
    dataList:[],
    pageSize:2,
    pageNum:1
  }
  componentDidMount(){
    this.getData()
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
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    const tailLayout = {
      wrapperCol: { offset: 8, span: 16 },
    };

    const onFinish = values => {
      console.log('Success:', values);
      setTimeout(() => {
        this.setState({
          dataList: {
            list:[{
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
            }],
            total:2
          }
        })
      }, 2000);
    };
  
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };
    
    return (
      <Form
      {...layout}
      layout={'vertical'}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
       <Row>
        <Col span={6}>
          <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        </Col>
        <Col span={6}>
        <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
        </Col>
        <Col span={6}>
        <Form.Item style={{marginTop:40}} {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        </Col>
        <Col span={6}>
        <Form.Item {...tailLayout} style={{marginTop:40}}>
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
    // this.setState({
    //   current: page,
    // }, () => {
    //   let param = JSON.parse(JSON.stringify(this.state.param))
    //   param = {
    //     ...param,
    //     pageNum: this.state.current,
    //     pageSize: 10,
    //   }
    //   this.getActivityRestDetailList(param)
    // })
  }
  render(){
    const dataSource = this.state.dataList.list
    
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
      },
    ];
    return (
      <Fragment>
        <Card title="查询条件" style={{marginBottom:20}}>
        {this._searchBar()}
       </Card>
       <Card title="列表" >
        <Table bordered={true} dataSource={dataSource} columns={columns}
        pagination = {{
          simple:true,
          total:this.state.dataList.total,
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