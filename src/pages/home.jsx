import React,{ Component } from "react";
import {Layout,Menu} from 'antd';
import SiderCustom from '../components/SiderCustom';

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
const { Header, Sider, Content } = Layout;




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
        {/* <Sider style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }} trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <UserOutlined />
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <VideoCameraOutlined />
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <UploadOutlined />
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider> */}
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
            Content
            <div style={{height:'1000px'}}></div>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default Home
