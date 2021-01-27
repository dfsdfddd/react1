import React, { Component } from 'react';
import { Table,Button } from 'antd';

import { popupAdsDown } from "../../../api/advertManage";


class PageTable extends Component {
  constructor(props) {
    super(props);
    console.log('table constructor',this.props)
  }
  handlecolumns = (baseMap) =>{
    const {state:stateOption,adsType:adsTypeOption,actionType,actionFrequency} = this.props.baseMap
    return [
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
          <span>{adsTypeOption[record.adsType] || ''}</span>
        )
      },
      {
        title: '弹窗对象',
        dataIndex: 'actionType',
        key: 'actionType',
        render: (text, record) => (
          <span>{actionType[record.actionType] || ''}</span>
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
          <span>{actionFrequency[record.actionFrequency] || ''}</span>
        )
      },
      {
        title: '状态',
        dataIndex: 'state',
        key: 'state',
        render: (text, record) => (
          <span>{stateOption[text] || ''}</span>
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
            <Button size='small' type='primary' onClick={()=>this.props.handleClick(record,true)} style={{ marginRight: 16 }}>修改 {record.state}</Button>
        ),
      },
    ];
  }

  render() {
    const {total,current,dataSource,baseMap,changePage} = this.props
    const columns = this.handlecolumns(baseMap)
    return (
      <Table className="tableClass" bordered={true} dataSource={dataSource} columns={columns} rowKey={(record, index) => index}
        pagination={{
          showTotal: total => `Total ${total} items`,
          showQuickJumper: true,
          total: total,
          onChange: changePage,
          current: current,
          pageSize: 10
        }}
      />
    );
  }
}

export default PageTable;