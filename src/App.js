import React from "react";
import "./App.css";


// 测试路由组件
// import logo from "./logo.svg";
// import { Button } from "antd";
// import NestingExample from "./components/redireactAuth";
// import AuthExample from "./components/auth";
// import RouteConfigExample from "./components/routeConfig";



// redux
import { Provider } from "react-redux";
import store from "./store";
import Page from './Page';


import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <Page/>
      </ConfigProvider>
{/* // 测试路由组件 */}
      {/* <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <Button type="primary">Button</Button>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <div>
          {<NestingExample />}
          <hr />
          {<AuthExample />}
          <hr />
          {<RouteConfigExample />}
        </div>
      </div> */}
    </Provider>
  );
}

export default App;
