/*
 * @Author: your name
 * @Date: 2020-04-28 14:09:15
 * @LastEditTime: 2020-07-02 16:49:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react1/src/components/RoutePage.js
 */ 
import React,{Component} from 'react';
import {Route,Switch} from 'react-router-dom';

// 路由相关
import routeConfig from '../router/config';
import allComponent from '../pages/index';
const {menus} = routeConfig;


class RoutePage extends Component {

  showRoute(menuss){
    const routers = menuss.map((item ,idx)=>{
      if(!item.children&&item.component){
      // console.log(item)
       return  <Route key={item.path} exact path={item.path} render={(props)=>{
         //  这个render里面可以加很多的权限判断 例如是否登录 是否有权限访问这个路由
         const Components = allComponent[item.component] 
          return <Components {...props} />
        }}></Route>
      } else {
        return this.showRoute(item.children)
      }
    })
    return routers
  }

  render(){
    return (
      <Switch>
        {this.showRoute(menus)}
      </Switch>
    )
  }
}

export default RoutePage