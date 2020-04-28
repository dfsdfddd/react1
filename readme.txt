1, 关联了 ant-design
2, 支持less并且可以自定义配置
3, 添加了redux redux-think


添加axios

配置侧边栏菜单 并且路由跳转


学习1
条件渲染的时候在 render里面要用 {this.someUI} 里面， 不能直接用标签
如果要用标签的 是那种直接return 的那种 组件

学习2
在jsx 语法里面不能使用if else 一般用三目表达式

学习3
this.state 之后并没有立即改变值，一般在render里面才是真的值，如果要获取真的值需要用到setstate里面的回调函数
this.setState({count: this.state.count + 1},()=>{
  console.log(this.state.count);//该是啥就是是啥
}）);

如果在construct 里面没有用 bind(this)
在一个方法里面直接调用另外一个方法是掉不到的。详情可看login.js


记录1 在login页面 进页面的时候调用了方法并且设置了 this.state ,当从另外当页面进入当前页面当时候，有报错信息：Can't perform a React state update on an unmounted component.

1，react为了防止内存泄漏，不能在组件销毁后设置state
2，关于react中切换路由时报以上错误，实际的原因是因为在组件挂载（mounted）之后进行了异步操作，比如ajax请求或者设置了定时器等，而你在callback中进行了setState操作。当你切换路由时，组件已经被卸载（unmounted）了，此时异步操作中callback还在执行，因此setState没有得到值

解决方案：
1，在组件卸载当时候清除请求
2，设置flag
3，componentWillUnmount = () => {
    this.setState = (state,callback)=>{
      return;
    };
}

记录2 组件之间当路由跳转  在 this.props.location.push/redirect({pathname:'',state:{},query:{}})
      一般在 route  render(props)的时候把 props 传到组件里面去  这个每个组件都会带有路由都信息
      或者把组件记录成一个路由组件


表单优化 https://www.jianshu.com/p/fc59cb61f7cc