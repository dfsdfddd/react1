import request from './request'

// 密码控件获取浏览器参数
export function browserParameters() {
  return request({
    url: '/authority/ysauthcommon/browserParameters',
    method: 'get'
  })
}
// 密码控件获取32随机因子
export function ranKey() {
  return request({
    url: '/authority/ysauthcommon/ranKey',
    method: 'get'
  })
}

export function getImg() {
  return request({
    url: '/authority/ysauthcommon/kaptcha',
    method: 'get'
  })
}