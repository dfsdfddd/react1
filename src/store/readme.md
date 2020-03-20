typs 定义了要触发的名称

action 定义了一个 {type:Types.action,param:param}  type为触发名称， param 为该类型需要修改的参数
可以写一个方法暴露给要触发修改redux内存的地方   它是一个触发的动作

reducer 把触发的参数param 与之前默认的或者已有的参数进行合并生成一个新的值
多个reducer 可以保存到  combineReducers 中

然后在createStore中把combineReducers引用

最后在页面的组件中引用


redux中获取的具体的值
const mapStateToProps = (state) => ({
  toggle: state.toggle // reducer配置的那个toggle
})

###redux中触发某个事件改变对应的值
const mapDispatchToProps = (dispatch) => ({
  onToggle: (toggle) => dispatch(actions.onToggle(toggle)),
})


connect的作用：连接组件和redux建立与store.state和dispatch的映射关系
export default connect(mapStateToProps,mapDispatchToProps)(NestingExample)

最后组件的 参数中可以获取到 toggle 和 onToggle

ex：
const {toggle,onToggle} = params