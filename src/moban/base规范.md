11.eslint,基础代码规范-https://www.jianshu.com/p/46baf3b24ade
代码规范 - typeScript -prettier

1.1异步代码规范
  async function fn() {
    await promise...
  }

2.hoc的使用

4.禁用 componentWillReceiveProps, UNSAFE_componentWillReceiveProps()
componentWillReceiveProps 易引发 bug，增加代码复杂度，react 17 中将会被移除。以下替代方案使组件可预测、可维护：

props 改变时，执行副作用(数据提取)，使用 componentDidUpdate
props 改变时，重新计算某些数据，使用 memoize
props 改变时，重置 state，使组件完全受控或使用 key 使组件完全不受控

5.传递给组件的 props 不要冗余，只传递必要的 props；不可把父组件实例传递给子组件。

6.避免数据突变 直接修改 redux 中的数据，容易导致不易察觉的 bug。对于复杂数据，推荐使用immer

7.单个 JS 文件不超过 800 行 ,超过 800 行，要考虑组件拆分。

8.render方法内尽量少申明变量

9.数据遍历组件的时候要有key属性，但是不要用数组下标作为key

10.简单展示类型，不涉及到state的组件，用function 函数声明式的无状态组件。



一、最最基本的规范 http://www.taoweng.site/index.php/archives/314/
每个文件只包含的一个 React 组件：
联系紧密的组件可以使用「命名空间」的形式；
每个文件中可包含多个纯函数组件。
始终使用 JSX 语法，不要使用 React.createElement 创建 ReactElement，以提高编写速度、可读性、可维护性（没有 JSX 转换的特殊场景例外，如在 console 中测试组件）。

二、
1.文件规范 要么js/要么jsx
2.每个存放组件的目录使用一个index.js/index.jsx以命名导出的形式暴露所有组件。同目录内的组件相互引用使用import Foo from './Foo';进行。引用其它目录的组件使用import {Foo} from '../component'进行。

三、命名规范
1.文件名：使用大驼峰命名法（PascalCase），如 MyComponent.jsx；
2.组件命名：组件名称和文件名一致，如 MyComponent.jsx 里的组件名应该是 MyComponent；一个目录的根组件使用 index.jsx 命名，以目录名称为组件名称；
3.引用命名：React 组件使用大驼峰命名法（PascalCase）；
4.高阶组件使用camelCase命名。高阶组件事实上并非一个组件，而是一个“生成组件类型”的函数，因此遵守JavaScript函数命名的规范，使用camelCase命名。
5.使用onXxx形式作为props中用于回调的属性名称。使用统一的命名规则用以区分props中回调和非回调部分的属性，在JSX上可以清晰地看到一个组件向上和向下的逻辑交互。
6.使用withXxx或xxxable形式的词作为高阶组件的名称。高阶组件是为组件添加行为和功能的函数，因此使用如上形式的词有助于对其功能进行理解。

四、带命名空间的组件

class Form extends React.Component {  
  // ...
}

class Row extends React.Component {}
class Label extends React.Component {}
class Input extends React.Component {}

Form.Row = Row;
Form.Label = Label;
Form.Input = Input;

export default Form;

// refence Form component
import Form from './Form';

const App = (
  <Form>
    <Form.Row>
      <Form.Label />


五、
1.属性JS 使用单引号；
2.属性 = 前后不要添加空格
3.JSX 中的花括号前后不要添加空格。
4.JSX 的属性都采用双引号，其他的 JS 都使用单引号 
<Foo bar="bar" />
<Foo style={{ left: '20px' }} />

六、事件函数用这种
class Foo extends React.Component {
  handleClick = () => {
    this.setState({ xxx: aaa })
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    )
  }
}

七.state是异步的时候需要这么写
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));

八.使用高阶函数
使用高阶组件解决横切关注点问题，而不是使用 mixins ，mixins 导致的相关问题可以参照文档

九.避免不必要 render 的写法
1.shouldComponentUpdate 钩子函数和 React.PureComponent 类都是用来当 state 和 props 变化时，避免不必要的 render 的方法。shouldComponentUpdate 钩子函数需要自己手动实现浅比较的逻辑，React.PureComponent 类则默认对 props 和 state 进行浅层比较，并减少了跳过必要更新的可能性。 我们推荐使用 React.PureComponent 避免不要的 render。

十.状态提升
如果多个组件需要反映相同的变化数据，建议将共享状态提升到最近的共同父组件中去；从而依靠自上而下的数据流，而不是尝试在不同组件间同步 state。

十一.推荐使用 Context
如果某个属性在组件树的不同层级的组件之间需要用到，我们应该使用 Context 提供在组件之间共享此属性的方式，而不不是显式地通过组件树的逐层传递 props。

十二.Refs写法
Refs 提供了一种方式，允许我们访问 DOM 节点或在 render 方法中创建的 React 元素 。我们推荐使用 createRef API 的方式 或者 回调函数的方式使用 Refs ，而不是使用 this.refs.textInput 这种过时的方式访问 refs ，因为它存在一些问题。

十三.路由懒加载