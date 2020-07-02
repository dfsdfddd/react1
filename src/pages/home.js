/*
 * @Author: your name
 * @Date: 2020-04-28 14:09:15
 * @LastEditTime: 2020-07-02 17:03:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react1/src/pages/home.js
 */ 
import React,{ Component } from "react";
import {Layout} from 'antd';
import SiderCustom from '../components/SiderCustom';

import RoutePage from '../components/RoutePage';

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
const { Header, Content } = Layout;





class Home extends Component{
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render(){
    return(
      <Layout>
        <SiderCustom collapsed={this.state.collapsed
        }></SiderCustom>
        <Layout id="layout-trigger" className="site-layout" style={{ marginLeft: this.state.collapsed?80:200 }}>
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <RoutePage />
            <div style={{height:'1000px'}}></div>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default Home
