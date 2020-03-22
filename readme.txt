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