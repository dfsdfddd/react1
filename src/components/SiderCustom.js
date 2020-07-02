/*
 * @Author: your name
 * @Date: 2020-03-19 13:57:35
 * @LastEditTime: 2020-07-02 16:51:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react1/src/components/SiderCustom.js
 */ 
import React,{Component,} from 'react';
import {Link,useLocation } from 'react-router-dom';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import {Layout,Menu} from 'antd';
import {withRouter} from 'react-router-dom'; // 可以把路由信息关联到props
import routes from '../router/config';
const {Sider} = Layout;
const {SubMenu,Item} = Menu;




class SiderCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {activeLink: props.location.pathname};
  }
  componentDidMount(){
    const {pathname} = this.props.location
     this.setState({
      activeLink:pathname
     })
     const {history} = this.props
     history.listen((event)=>{
       const {pathname} = event
      this.setState({
        activeLink:pathname
      })
     })

  }
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
     const {pathname} = this.props.location
     const activeLink = [this.state.activeLink]
     
     return(
      <Sider style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }} trigger={null} collapsible collapsed={this.props.collapsed}>
          <div className="logo" />
          {this.state.activeLink}
          <Menu selectedKeys={activeLink} theme="dark" mode="inline" >
          {this.theList(menus)}
          </Menu>
        </Sider>
     )
  }
}

export default withRouter(SiderCustom) // 这个可以看到路由信息
// export default SiderCustom // 这个只能看到一个传过来的参数