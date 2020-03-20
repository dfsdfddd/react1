withRouter的作用和一个简单应用

1,把不是通过路由切换过来的组件中，将react-router 的 history、location、match 三个对象传入props对象上
2,可以根据路由切换浏览器的title属性，对props.history进行监听，切换路由的时候获取当前的路由路径，同时可以根据不同的路由设置不同的浏览器title标题。

example:
import {withRouter} from 'react-router-dom' //引入withRouter
export default withRouter(App);  //这里要执行一下WithRouter