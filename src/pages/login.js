import React, { Component } from 'react';
import { browserParameters, ranKey, getImg, login } from '../api/common';
import { passGuardInit, pgeInit } from '../common/js/PassGuardCtrl';
import { initPassPlug } from '../utils/index';

import { message } from 'antd';

class Login extends Component {
  state = {
    imageCode: '',
  };
  constructor(props) {
    super(props);
    console.log(this.props);
    this._getImg = this._getImg.bind(this);
  }
  componentWillUnmount = () => {
    this.setState = (state, callback) => {
      return;
    };
  };
  componentDidMount() {
    passGuardInit();
    this._browserParameters();
  }
  _ranKey() {
    ranKey()
      .then((result) => {
        const res = result.data;
        if (res.code === 200) {
          this.pgeditor.pwdSetSk(res.data.ranKey);
          this.PwdResult = this.pgeditor.pwdResultSM();
          this._login();
        } else {
          message.error(res.message);
        }
      })
  }
  _login = () => {
    var data = {
      username: this.username.value,
      password: this.PwdResult,
      verifyCode: this.usercode.value,
    };
    login(data)
      .then((result) => {
        const res = result.data;
        if (res.code === 200) {
          message.success(res.message);
          // 保存用户信息
          const userMap = {
            username: res.data.username,
            defaultSystemVos: res.data.systemVos[0].sysId,
          };
          sessionStorage.setItem('userMap', JSON.stringify(userMap));
          // 顺便保存在session
          sessionStorage.setItem('userSystemVos', JSON.stringify(res.data.systemVos));
          // 保存tokenid
          sessionStorage.setItem('theToken', result.headers.token);
          // setTokenCommon('tokenid', result.headers.token)

          this.props.history.push({
            pathname: '/',
            query: { userMap: JSON.stringify(userMap) },
          });
        } else {
          message.error(res.message);
        }
      })
  };
  _getImg() {
    getImg()
      .then((result) => {
        const res = result.data;
        if (res.code === 200) {
          message.success(res.message);
          const imageCode = 'data:image/png;base64,' + res.data.kaptcha;
          this.setState({
            imageCode,
          });
          this.imagecode = imageCode;
        } else {
          message.error(res.message);
        }
      })
  }
  _browserParameters() {
    browserParameters()
      .then((result) => {
        const res = result.data;
        this._getImg();
        if (res.code === 200) {
          var skey_enstr = res.data.browserParameters.split(',');
          this.pgeditor = initPassPlug('login_pass', skey_enstr, '密码');
          this.passBox = this.pgeditor.load();
          setTimeout(() => {
            pgeInit();
          }, 200);
        } else {
          this.$message.error(res.message);
        }
      })
  }
  render() {
    return (
      <div id="login" className="pagehome">
        <div className="login_box">
          <div className="login_title"></div>
          <div className="login_main">
            <div className="login_cell">
              <input
                ref={(el) => (this.username = el)}
                type="text"
                placeholder="用户名"
                tabIndex="1"
              />
            </div>
            <div className="login_cell">
              {/* <input type="text" placeholder="密码" /> */}
              <div dangerouslySetInnerHTML={{ __html: this.passBox }}></div>
            </div>
            <div className="login_cell half_cell">
              <input
                ref={(el) => (this.usercode = el)}
                type="text"
                placeholder="验证码"
                tabIndex="3"
              />
              <img onClick={this._getImg} src={this.state.imageCode} />
            </div>
            <div onClick={this._ranKey.bind(this)} className="login_cell">
              登录
                        </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
