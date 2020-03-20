import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import {Layout,Menu} from 'antd';
import {withRouter} from 'react-router-dom';
import routes from '../router/config';
const {Sider} = Layout;
const {SubMenu,Item} = Menu;




class SiderCustom extends Component {
  theList(menus){
      let lists = menus.map((item,idx)=>{
        if(item.children){
           return <SubMenu key={item.path} title={item.name}>
             {this.theList(item.children)}
           </SubMenu>;
        } else{
           return <Item key={item.path}>
             <Link to={item.path}>{item.name}</Link>
            </Item>;
        }
      })

      return lists
  }

  Url(){
    return <div>这个是文字</div>
  }
   render(){
     const {menus} = routes
    
     return(
      <Sider style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }} trigger={null} collapsible collapsed={this.props.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          {this.theList(menus)}
          </Menu>
        </Sider>
     )
  }
}

export default withRouter(SiderCustom) 