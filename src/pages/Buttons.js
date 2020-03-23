import React,{Component,Fragment} from 'react';
  import { Table,Form, Input, Button, Checkbox,Row, Col,Card } from 'antd';

class Buttons extends Component{
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
  render(){
    const dataSource = [
      {
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
    ];
    
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
        <Table bordered={true} dataSource={dataSource} columns={columns} />
       </Card>
      </Fragment>
    
    )
  }
}

export default Buttons