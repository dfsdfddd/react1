import React, { Component, Fragment } from 'react';
import { Cascader, Table, Form, Input, Button, Row, Col, Card, message, Select, DatePicker, Modal, Upload } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';

// https://www.jianshu.com/p/8a04823ab900  表单校验rules 方法
// https://blog.csdn.net/nameisyaya/article/details/82189485 // 父子组件传值
// https://www.cnblogs.com/cazj/p/11126625.html
// 父子组件传值
import {
  uploadFile,
  popupAdsAdd,
  popupAdsDown,
  getDataDicTionary,
  popupAdsQuery,
  popupAdsModify,
  getOrgList
} from "../api/advertManage.js";
import {getParents,findObj} from '../utils/index';
import moment from 'moment';
//需要的接口

// 定义的属性必须放在 import之后 否者报错
const { Option } = Select
const { RangePicker } = DatePicker;

class ModelAdd extends Component {
  constructor(props) {
    super(props)
    this.formRef = React.createRef()
    this.state = {
      adsType: '',
      actionType: '',
      fileList: [],
      fileList2: [],
    }
  }
  addResetForm(){
    this.setState({
      adsType: '',
      actionType: '',
      fileList: [],
      fileList2: [],
    })
  }
  componentDidMount() {
    this._getOrgList()
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.addChangeTitle === '修改'&&nextProps.visible){
      console.log('in xiugai1')
      const row = nextProps.modifyData
      //机构
      let orgNolist = []
      if(row.actionType === '04'){
        let listarr = getParents(this.optionsList, row.actionOrgNo)
        listarr.push(row.actionOrgNo)
        orgNolist = listarr
      }
      // 保存图片和文件链接
      this.keepImagePath=row.imgPath;
      this.keepactionStoragePath= row.actionStoragePath;
      console.log(row)
      this.setState({
        adsType:row.adsType,
        actionType:row.actionType,
      })
      // 这个setTimeout是为了获取dom
      setTimeout(() => {
        this.formRef.current.setFieldsValue({
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
        })
        if(row.adsType === '01'){
          this.setState({
            fileList:[{
              uid: '-1',
              name: row.imgPath,
              status: 'done',
              url: popupAdsDown(row.imgPath),
              thumbUrl: popupAdsDown(row.imgPath),
            }],
          })
        }
        if(row.actionType==='02'||row.actionType==='03'){
          this.setState({
            fileList2:[{
              uid: '-1',
              name: row.actionStoragePath,
              status: 'done',
              url: popupAdsDown(row.actionStoragePath),
              thumbUrl: popupAdsDown(row.actionStoragePath),
            }],
          })
        }
        console.log(this.formRef.current.getFieldsValue())
      }, 5);
    }
  }
  _getOrgList() {
    getOrgList().then((result) => {
      const res = result.data
      if (res.code !== 200) return message.warning(res.msg)
      this.optionsList = res.data.orgList
      this.defaultOrg = [res.data.orgNo]
    }).catch((err) => {
      console.log("查询机构报错：" + err)
    });
  }
  onChange(value) {
    console.log(value)
  }
  adsTypeChange = (value) => {
    this.setState({
      adsType: value
    })
  }
  actionTypeChange = (value) => {
    this.setState({
      actionType: value
    })
  }
  render() {
    const { visible, onCancel, onCreate, self,addChangeTitle } = this.props
    const layouts = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };
    const _this = this
    const uploadCommonUp = {
      name: 'file',
      action: 'http://10.213.50.13:10000/mabaseMan/popupAds/uploadFile',
      headers: {
        token: sessionStorage.getItem('theToken'),
      },
    }
    const uploadOption = {
      ...uploadCommonUp,
      fileList: this.state.fileList,
      listType: 'picture',
      beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('上传格式只能是 jpg、png、gif 格式');
        }
        const isLt3M = file.size / 1024 / 1024 < 3
        if (!isLt3M) {
          message.error('上传图片大小不能超过 3MB!')
        }
        return isJpgOrPng && isLt3M
      },
      onChange(info) {
        console.log('info', info)
        let fileList = [...info.fileList];
        // 只留列表的最后一个，之前的都删除
        fileList = fileList.slice(-1);
        fileList = fileList.map(file => {
          if (file.response) {
            const res = file.response
            if (res.status === 'success') {
              file.url = res.url;
              _this.formRef.current.setFieldsValue({ imgPath: res.data.groupName + "," + res.data.remoteFileName })
            } else {
              _this.formRef.current.setFieldsValue({ imgPath: '' })
              file.status = 'error'
              message.error(res.msg)
            }
            _this.formRef.current.validateFields(['imgPath'])
          }
          return file;
        });
        console.log(fileList)
        _this.setState({ fileList });
      },
    }
    const uploadOption2 = {
      ...uploadCommonUp,
      fileList: this.state.fileList2,
      beforeUpload(file) {
        const extension = file.name.split('.')[1] === 'txt'
        if (!extension) {
          message.error('上传格式只能是 txt 格式')
        }
        const isLt3M = file.size / 1024 / 1024 < 10
        if (!isLt3M) {
          message.error('上传文件大小不能超过 10MB!')
        }
        if(!extension && isLt3M){
          file.status = 'error'
        }
        return extension && isLt3M
      },
      onChange(info) {
        console.log(info)
        let fileList = [...info.fileList];
        // 只留列表的最后一个，之前的都删除
        fileList = fileList.slice(-1);
        fileList = fileList.map(file => {
          if (file.response) {
            const res = file.response
            if (res.status === 'success') {
              file.url = res.url;
              _this.formRef.current.setFieldsValue({ actionStoragePath: res.data.groupName + "," + res.data.remoteFileName })
            } else {
              _this.formRef.current.setFieldsValue({ actionStoragePath: '' })
              file.status = 'error'
              message.error(res.msg)
            }
            _this.formRef.current.validateFields(['actionStoragePath'])
          }
          return file;
        });
        console.log(fileList)
        _this.setState({ fileList2: fileList });
      },
    }
    return (
      <Modal
        visible={visible}
        title={addChangeTitle}
        okText="确定"
        cancelText="取消"
        onCancel={onCancel}
        onOk={() => {
          this.formRef.current.validateFields().then(values => {
            console.log(values)
            onCreate(values)
          })
        }}
      >
        <Form
          ref={this.formRef}
          layout={layouts}
          name="form_in_model"
          initialValues={{adsId:"",
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
          state: "00", //状态
          testValue1:"",
          testValue2:"",
        }}
        >
        <Form.Item noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.adsType !== currentValues.adsType}
        >
          {({ getFieldValue }) => {
            return getFieldValue('adsType') === '01' ? (
              <Form.Item name="testValue1" label="测试1" hasFeedback rules={[{
                required: true,
                message: '请输入广告名称'
              }]}
              >
                <Input />
              </Form.Item>
            ) : null;
          }}
        </Form.Item>
          
          <Form.Item name="testValue2" label="测试2" hasFeedback rules={[{
            required: true,
            message: '请输入广告名称'
          }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="adsName" label="广告名称" hasFeedback rules={[{
            required: true,
            message: '请输入广告名称'
          }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="adsType" label="广告方式" hasFeedback rules={[{
            required: true,
            message: '请选择广告方式'
          }]}
          >
            <Select onChange={this.adsTypeChange} style={{ width: 200 }} placeholder="请选择" allowClear={true}>
              {self.state.adsTypeOption && Object.keys(self.state.adsTypeOption).map((key) => (<Option value={key} key={key}>{self.state.adsTypeOption[key]}</Option>))}
            </Select>
          </Form.Item>
          {this.state.adsType === '01' ? (<Fragment>
            <Form.Item name="imgPath" label="上传图片" hasFeedback rules={[{
              required: true,
              message: '请输入图片链接'
            }]}
            >
              <Upload {...uploadOption} >
                <Button>点击上传</Button>
              </Upload>
            </Form.Item>
            <Form.Item name="imgClickUrl" label="图片链接" hasFeedback rules={[{
              required: true,
              message: '请输入图片链接'
            }]}
            >
              <Input />
            </Form.Item>
          </Fragment>) : ''}
          {this.state.adsType === '02' ? (<Fragment>
            <Form.Item name="adsTitle" label="广告标题" hasFeedback rules={[{
              required: true,
              message: '请输入广告标题'
            }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="adsContent" label="广告内容" hasFeedback rules={[{
              required: true,
              message: '请输入广告内容'
            }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="btnText" label="按钮文字" hasFeedback rules={[{
              required: true,
              message: '请输入按钮文字'
            }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="btnClickUrl" label="按钮链接" hasFeedback rules={[{
              required: true,
              message: '请输入按钮链接'
            }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
          </Fragment>) : ''}
          <Form.Item name="actionType" label="弹窗对象" hasFeedback rules={[{
            required: true,
            message: '请选择弹窗对象'
          }]}
          >
            <Select onChange={this.actionTypeChange} style={{ width: 200 }} placeholder='请选择' allowClear={true}>
              {self.state.actionTypeOption && Object.keys(self.state.actionTypeOption).map(key => <Option value={key} key={key}>{self.state.actionTypeOption[key]}</Option>)}

            </Select>
          </Form.Item>
          {this.state.actionType === '04' ? (<Form.Item name="actionOrgNo" label="所属机构" hasFeedback rules={[{
            required: true,
            message: '请输入内容1'
          }]}
          >
            <Cascader options={this.optionsList} onChange={this.onChange} fieldNames={{
              value: 'orgNo',
              label: 'orgNm',
              children: 'lowList'
            }} placeholder="请选择" changeOnSelect={true} showSearch={true} />
          </Form.Item>) : ''}
          
          {this.state.actionType === '02' || this.state.actionType === '03' ? (<Form.Item name="actionStoragePath" label={this.state.actionType === '02' ? '上传商户列表' : '上传代理商列表'} hasFeedback rules={[{
            required: true,
            message: '请上传商户列表'
          }]}
          >
            <Upload {...uploadOption2} >
              <Button>点击上传</Button>
            </Upload>
          </Form.Item>) : ""}


          <Form.Item name="actionFrequency" label="弹窗频率" hasFeedback rules={[{
            required: true,
            message: '请选择弹窗频率'
          }]}
          >
            <Select
              style={{ width: 200 }}
              placeholder="请选择"
              allowClear={true}
            >
              {self.state.actionFrequencyOption && Object.keys(self.state.actionFrequencyOption).map(key => <Option value={key} key={key}>{self.state.actionFrequencyOption[key]}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="startDate" label="开始日期" hasFeedback rules={[{
            required: true,
            message: '请输入开始日期',
          }, ({ getFieldValue }) => ({
            validator(rule, value) {
              if (value && getFieldValue('endDate') && value * 1 > getFieldValue('endDate') * 1) {
                return Promise.reject('开始日期应小于结束日期')
              }
              return Promise.resolve()
            }
          })]}
          >
            <DatePicker format="YYYYMMDD" />
          </Form.Item>
          <Form.Item name="endDate" label="结束日期" hasFeedback rules={[{
            required: true,
            message: '请输入结束日期'
          }, ({ getFieldValue }) => ({
            validator(rule, value) {
              if (value && getFieldValue("startDate") && value * 1 < getFieldValue('startDate') * 1) {
                return Promise.reject('结束日期应大于开始日期')
              }
              return Promise.resolve()
            }
          })]}
          >
            <DatePicker format="YYYYMMDD" />
          </Form.Item>
          <Form.Item name="state" label="状态" hasFeedback rules={[{
            required: true,
            message: '请选择状态'
          }]}
          >
            <Select
              allowClear={true}
              style={{ width: 200 }}
              placeholder="请选择"
            >
              {self.state.stateOption && Object.keys(self.state.stateOption).map(key => <Option value={key} key={key}>{self.state.stateOption[key]}</Option>)}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

class Buttons extends Component {
  state = {
    visible: false,
    pageSize: 10,
    pageNum: 1,
    dataList: [],
    total: 0,
    form: {
      adsId: "", // 广告编号
      adsType: "", // 广告方式
      adsName: "", // 广告名称
      state: "" // 状态
    },
    actionFrequencyOption: {},
    actionTypeOption: {},
    adsTypeOption: {},
    stateOption: {},
    modifyData:{}, // 点击编辑修改的内容
    addChangeTitle:'新增'// 
  }
  componentDidMount() {
    this._getDataDicTionary()
  }
  _getDataDicTionary = () => {
    getDataDicTionary({}).then(result => {
      const res = result.data
      if (res.status === 'success') {
        this.setState({
          actionFrequencyOption: res.data.actionFrequency,
          actionTypeOption: res.data.actionType,
          adsTypeOption: res.data.adsType,
          stateOption: res.data.state,
        })
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
  _popupAdsQuery(type) {
    if (type === "1") {
      this.pageSize = 20;
      this.pageNum = 1;
      this.total = 0;
    }
    const data = {
      adsId: this.state.form.adsId,
      adsType: this.state.form.adsType,
      state: this.state.form.state,
      adsName: this.state.form.adsName,
      queryStartDate: moment(this.state.form.times[0]).format("YYYYMMDD"),
      queryEndDate: moment(this.state.form.times[1]).format("YYYYMMDD"),
      pageSize: this.pageSize,
      pageNum: this.pageNum
    };
    this.loading = true;
    popupAdsQuery(data).then(result => {
      this.loading = false;
      const res = result.data;
      if (res.status === 'success') {
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
   // 新增
   popupAdsAdd(values) {
    const data = { ...values };
    // 处理机构号和机构名称
    if(data.actionType === '04'){
      data.actionOrgNo = values.actionOrgNo.slice(-1)[0]
      const optionsList = this.refs.modelAdd.optionsList
      const orgObj = findObj(optionsList,data.actionOrgNo)
      data.actionOrgName = orgObj.orgNm
    }else{
      data.actionOrgNo = ''
    }
    data.startDate = values.startDate.format('YYYYMMDD')
    data.endDate = values.endDate.format('YYYYMMDD')
    console.log(data)
    // this.goformbtn = true
    popupAdsAdd(data).then(result => {
        // this.goformbtn = false
        const res = result.data;
        if (res.status === 'success') {
          message.success(res.msg);
          this._popupAdsQuery();
          this.clearAndHideModel()
        } else {
          message.error(res.msg);
        }
      })
  }
  addNew = ()=>{
    this.setState({
      visible:true,
      addChangeTitle:'新增'
    })

  }
  handleClick(row, flag){
      this.setState({
        visible:true,
        addChangeTitle:'修改',
        modifyData:row
    })
    // 具体修改的逻辑在 组件ModelAdd里面的componentWillReceiveProps 里面进行的判断处理
  }

  onCreate = values => {
    this.popupAdsAdd(values)
  }
  _searchBar() {
    // 定义布局样式
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
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
        form: {
          ...this.state.form,
          ...values
        }
      }, () => {
        console.log(this.state.form)
        this._popupAdsQuery('1')
      })
    };
    // 表单提交失败
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);

    };


    return (
      <Form
        className="adsClass"
        {...layout}
        layout={'vertical'}
        name="basic"
        initialValues={{ adsId: '', adsType: '', adsName: '', state: '', times: [moment(new Date().getTime()),moment(new Date().getTime())] }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Row>
          <Col span={6}>
            <Form.Item
              label="广告编号"
              name="adsId"
            >
              <Input placeholder="请输入内容" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="广告方式"
              name="adsType"
            >
              <Select
                style={{ width: 200 }}
                placeholder="请选择"
                onChange={onChange}
                allowClear={true}
              >
                {this.state.adsTypeOption && Object.keys(this.state.adsTypeOption).map((key) => (<Option value={key} key={key}>{this.state.adsTypeOption[key]}</Option>))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="广告名称"
              name="adsName"
            >
              <Input placeholder="请输入内容" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="状态" name="state" >
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
                {this.state.stateOption && Object.keys(this.state.stateOption).map((key) => (<Option key={key} value={key}>{this.state.stateOption[key]}</Option>))}
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
              <Button type="primary" htmlType="submit">查询</Button>
              <Button onClick={this.addNew} style={{ marginLeft: 20 }} type="primary">新增</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    )
  }
  changePage = (page) => {
    console.log(page)
    this.setState({
      pageNum: page,
    }, () => {
      this._popupAdsQuery()
    })
  }
  render() {
    const dataSource = this.state.dataList

    const columns = [
      {
        title: '广告编号',
        dataIndex: 'adsId',
        key: 'adsId',
      },
      {
        title: '广告名称',
        dataIndex: 'adsName',
        key: 'adsName',
      },
      {
        title: '广告方式',
        dataIndex: 'adsType',
        key: 'adsType',
        render: (text, record) => (
          <span>{this.adsTypeOption[record.adsType] || ''}</span>
        )
      },
      {
        title: '弹窗对象',
        dataIndex: 'actionType',
        key: 'actionType',
        render: (text, record) => (
          <span>{this.state.actionTypeOption[record.actionType] || ''}</span>
        )
      },
      {
        title: '对象列表',
        dataIndex: 'actionStoragePath',
        key: 'actionStoragePath',
        render: (text, record) => (
          record.actionStoragePath ? <a style={{ color: '#409EFF', textDecoration: "underline" }} href={popupAdsDown(record.actionStoragePath)} target="_blank">下载</a> : ''
        )
      },
      {
        title: '弹窗频率',
        dataIndex: 'actionFrequency',
        key: 'actionFrequency',
        render: (text, record) => (
          <span>{this.state.actionFrequencyOption[record.actionFrequency] || ''}</span>
        )
      },
      {
        title: '状态',
        dataIndex: 'state',
        key: 'state',
        render: (text, record) => (
          <span>{this.state.stateOption[text] || ''}</span>
        )
      },
      {
        title: '开始日期',
        dataIndex: 'startDate',
        key: 'startDate',
      },
      {
        title: '操作',
        key: 'action',
        dataIndex: 'action',
        render: (text, record) => (
            <Button size='small' type='primary' onClick={()=>this.handleClick(record,true)} style={{ marginRight: 16 }}>修改 {record.state}</Button>
        ),
      },
    ];
    return (
      <Fragment>
        <Card style={{ marginBottom: 20 }}>
          {this._searchBar()}
        </Card>
        <Card >
          <Table className="tableClass" bordered={true} dataSource={dataSource} columns={columns} rowKey={(record, index) => index}
            pagination={{
              showTotal: total => `Total ${total} items`,
              showQuickJumper: true,
              total: this.state.total,
              onChange: this.changePage,
              current: this.state.pageNum,
              pageSize: this.state.pageSize
            }}
          />
        </Card>
        <ModelAdd self={this} ref="modelAdd" modifyData={this.state.modifyData} addChangeTitle={this.state.addChangeTitle} visible={this.state.visible} onCreate={this.onCreate} onCancel={() => {
          console.log('in console')
          // 清除子组件表单数据
          this.refs.modelAdd.formRef.current.resetFields()
          // 隐藏model
          this.setState({
            visible: false
          })
          // 清除state状态
          this.refs.modelAdd.addResetForm()
        }} />
      </Fragment>

    )
  }
}
// https://www.cnblogs.com/crazycode2/p/9704382.html  table 分页
export default Buttons