import React,{Fragment} from 'react';
import { HashRouter as Router,Route,Switch } from "react-router-dom";
import Home from './pages/home.jsx';
import Login from './pages/login';
import NoFind from './pages/noFind';



export default () => (
  <Fragment>
      <Router>
          <Switch>
              {/* <Route exact path="/" /> */}
              <Route path="/home" component={Home} />
              <Route path="/404" component={NoFind} />
              <Route path="/login" component={Login} />
              <Route component={NoFind} />
          </Switch>
      </Router>
  </Fragment>
 )