import React,{Fragment} from 'react';
import { HashRouter as Router,Route,Switch,Redirect } from "react-router-dom";
import Home from './pages/home.js';
import Login from './pages/login';
import NoFind from './pages/noFind';



export default () => (
  <Fragment>
      <Router>
          <Switch>
              <Route exact path="/" render={()=><Redirect to='/home/dashboard/index' push />} />
              <Route path="/home" component={Home} />
              <Route path="/404" component={NoFind} />
              <Route path="/login" component={Login} />
              <Route component={NoFind} />
          </Switch>
      </Router>
  </Fragment>
 )