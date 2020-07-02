<!--
 * @Author: your name
 * @Date: 2020-07-02 14:32:42
 * @LastEditTime: 2020-07-02 16:53:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react1/src/readme.md
--> 
加载顺序

1，index.js --> app.js -->page.js

1.index.js
ReactDOM.render(<App />, document.getElementById('root'));

2.app.js
<Page/> 渲染组件

3.Page.js
渲染路由
<Route exact path="/" render={(props)=>{ // 直接重定向到了 dashbaord页面
  return (<Redirect {...props} to={{pathname:'/home/dashboard/index',state:{userMap:userMap?userMap:''}}} push />)
}} />
<Route path="/home" component={Home} /> // home 为具体的路由页面
<Route path="/404" component={NoFind} />
<Route path="/login" component={Login} />
<Route component={NoFind} />

4.路由里面各个页面渲染
SiderCustom：根据config里面的数据，生成左侧的菜单，并且处理了默认高亮
RoutePage: 渲染route页面路径，也是根据config里面的数据
根据config里面的component 匹配所有的模版allComponent
并且可以做权限限制

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
