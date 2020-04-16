import React,{ Component } from "react";
import {browserParameters,ranKey,getImg} from '../api/common';
// import {passGuardInit, pgeInit} from '../../public/passGuard/PassGuardCtrl';
import {initPassPlug} from '../utils/index';

import { message } from 'antd';


class Login extends Component{
  state = {
    imageCode:''
  }
  constructor(props){
    super(props);
    this._getImg =this._getImg.bind(this)
  }
  componentDidMount(){
    // passGuardInit()
    console.log('this is init')
    this._browserParameters()
  }
  _getImg(){
    getImg().then(result => {
          const res = result.data
          if (res.code === 200) {
            message.success(res.message)
            const imageCode = 'data:image/png;base64,' + res.data.kaptcha
            console.log(imageCode)
            this.setState({
              imageCode
            })
          } else {
            message.error(res.message)
          }
        })
        .catch(err => {
          console.log(err)
        })
  }
  _browserParameters(){
    browserParameters().then((result) => {
      const res = result.data
      if (res.code === 200) {
        this._getimg()
        var skey_enstr = res.data.browserParameters.split(',')
        this.pgeditor = initPassPlug('login_pass', skey_enstr, '密码')
        this.passBox = this.pgeditor.load()
        // setTimeout(() => {
        //   // pgeInit()
        // }, 200)
      } else {
        this.$message.error(res.message)
      }
    }).catch((err) => {
      console.log(err)
    })
  }
  render(){
    return(
      <div id="login" className='pagehome'>
        <div className="login_box">
          <div className="login_title"></div>
          <div className="login_main">
            <div className="login_cell">
              <input type="text" placeholder="用户名" />
            </div>
            <div className="login_cell">
              <input type="text" placeholder="密码" />
            </div>
            <div className="login_cell half_cell">
              <input type="text" placeholder="验证码" />
              <img onClick={this._getImg}  src={this.state.imageCode} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
