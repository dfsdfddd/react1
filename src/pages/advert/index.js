import React, { Component, Fragment } from 'react';
import {     Card, message} from 'antd';
import SerchBar from './components/SerchBar';
import PageTable from './components/PageTable';
import AddModel from './components/AddModel';


// https://www.jianshu.com/p/8a04823ab900  表单校验rules 方法
// https://blog.csdn.net/nameisyaya/article/details/82189485 // 父子组件传值
// https://www.cnblogs.com/cazj/p/11126625.html
// 父子组件传值
import {
  popupAdsDown,
  getDataDicTionary,
  popupAdsQuery,
  popupAdsModify,
  getOrgList
} from "../../api/advertManage.js";
import moment from 'moment';
//需要的接口

// 定义的属性必须放在 import之后 否者报错


class ModelAdd extends Component {
  
}


// 字典保存
class Advert extends Component {
  constructor(props){
    super(props)
    this.state = {
      visible: false,
      pageSize: 30,
      pageNum: 1,
      dataList: [],
      total: 0,
      modifyData:{}, // 点击编辑修改的内容
      baseMap:{} 
    }
  }
  
  componentDidMount() {
    this._getDataDicTionary()
  }
  _getDataDicTionary = () => {
    getDataDicTionary({}).then(result => {
      const res = result.data
      if (res.status === 'success') {
        const {data} = res
        this.setState({baseMap:data})
        this.actionFrequencyOption = res.data.actionFrequency
        this.actionTypeOption = res.data.actionType
        this.adsTypeOption = res.data.adsType
        this.stateOption = res.data.state
      } else {
        message.error(res.msg || res.message);
      }
    })
  }

  // 分页查询
  adsQuery = (params) => {
    const data = {
      queryStartDate: moment(params.times[0]).format("YYYYMMDD"),
      queryEndDate: moment(params.times[1]).format("YYYYMMDD"),
      pageSize: 30,
      pageNum: this.state.pageNum,
      ...params
    };
    if(data.times){delete data.times}
    popupAdsQuery(data).then(result => {
      const res = result.data;
      if (res.status === 'success') {
        console.log('dataaaaaaaa',JSON.stringify(res))
        this.setState({
          dataList: res.list,
          total: res.data.total,
        })
      } else {
        message.error(res.msg);
      }
    })
  }
  clearAndHideModel(){
    this.refs.modelAdd.formRef.current.resetFields() // 清空表单
    this.setState({visible:false})
  }
   
  addNewOrModi = (title)=>{
    this.refs.addModel.isShowModel(title)
  }
  handleClick = (row) => {
    this.refs.addModel.modifyData('修改',row)
    // 具体修改的逻辑在 组件ModelAdd里面的componentWillReceiveProps 里面进行的判断处理
  }

  
  baseQuery =()=>{
    this.refs.serchBar.clickSubmit()
  }
  changePage = (page) => {
    console.log(page)
    this.setState({
      pageNum: page,
    }, () => {
      this.refs.serchBar.clickSubmit()
    })
  }
  render() {
    // const dataSource = this.state.dataList
    const {state:stateOption,adsType:adsTypeOption,actionType,actionFrequency} = this.state.baseMap
    const {baseMap} = this.state
    const _this = this
    const tableData = {
      baseMap,
      dataSource:this.state.dataList,
      total:this.state.total,
      current:this.state.pageNum,
      changePage:_this.changePage,
    }
    return (
      <Fragment>
        <Card style={{ marginBottom: 20 }}>
          {<SerchBar ref='serchBar' {...baseMap} adsQuery={this.adsQuery} addNewOrModi={this.addNewOrModi} />}
        </Card>
        <Card >
         {<PageTable {...tableData} handleClick={this.handleClick} />}
        </Card>
        {<AddModel ref="addModel" {...baseMap} baseQuery={this.baseQuery} />}
        {/* <ModelAdd self={this} ref="modelAdd" modifyData={this.state.modifyData} addChangeTitle={this.state.addChangeTitle} visible={this.state.visible} onCreate={this.onCreate} onCancel={() => {
          console.log('in console')
          // 清除子组件表单数据
          this.refs.modelAdd.formRef.current.resetFields()
          // 隐藏model
          this.setState({
            visible: false
          })
          // 清除state状态
          this.refs.modelAdd.addResetForm()
        }} /> */}
      </Fragment>

    )
  }
}
// https://www.cnblogs.com/crazycode2/p/9704382.html  table 分页
export default Advert