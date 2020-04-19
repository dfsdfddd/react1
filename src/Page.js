import React,{Fragment} from 'react';
import { HashRouter as Router,Route,Switch,Redirect } from "react-router-dom";
import Home from './pages/home.js';
import Login from './pages/login';
import NoFind from './pages/noFind';



export default () => (
  <Fragment>
      <Router>
          <Switch>
              <Route exact path="/" render={(props)=>{
                console.log(props)
                const {userMap} = props.location.query
                return (<Redirect {...props} to={{pathname:'/home/dashboard/index',state:{userMap:userMap?userMap:''}}} push />)
              }} />
              <Route path="/home" component={Home} />
              <Route path="/404" component={NoFind} />
              <Route path="/login" component={Login} />
              <Route component={NoFind} />
          </Switch>
      </Router>
  </Fragment>
 )