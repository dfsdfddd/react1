import React,{Component} from 'react';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import {Layout,Menu} from 'antd';
import {withRouter} from 'react-router-dom';
import routes from '../router/config';
const {Sider} = Layout;
const {SubMenu} = Menu



class SiderCustom extends Component {
   render(){
     return(
      <Sider style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }} trigger={null} collapsible collapsed={this.props.collapsed}>
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
            <SubMenu key="4" title={'123123'}>
              
              <SubMenu key="5" title={'123123'}>
                <Menu.Item key="6">Option 1</Menu.Item>
              </SubMenu>
            </SubMenu>
          </Menu>
        </Sider>
     )
  }
}

export default withRouter(SiderCustom) 