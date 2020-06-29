import React,{Component,Fragment} from 'react';
import {Form, Input,Tooltip,
  Cascader,
  Select, Button, Checkbox,Row, Col,Card,AutoComplete, } from 'antd';

  import { createtext } from '../api/eggapi'
class Icons extends Component{
  componentDidMount(){
    const data = {
      name:'ajlsdjljf',
      weight:'802384px'
    }
    createtext(data).then((result) => {
      const res = result.data
      console.log(res)
    }).catch((err) => {
      console.log(err)
    });
  }
  render(){
    return (
      <Fragment>
        <Card title={'表单提交'}>

        </Card>
      </Fragment>
    )
  }
}

export default Icons