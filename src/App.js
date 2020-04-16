import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { Button } from "antd";
// import Button from 'antd/es/button';

// 测试路由组件
import NestingExample from "./components/redireactAuth";
import AuthExample from "./components/auth";
import RouteConfigExample from "./components/routeConfig";


// redux
import { Provider } from "react-redux";
import store from "./store";
import Page from './Page';

function App() {
  return (
    <Provider store={store}>
      <Page/>
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
