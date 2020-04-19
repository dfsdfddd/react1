import request from './requestOther'

// 查询操作员
export function queryUsers(data) {
  return request({
    url: '/usermanage/user/queryUsers',
    method: 'post',
    data
  })
}
// 修改操作员
export function updateUser(data) {
  return request({
    url: '/usermanage/user/updateUser',
    method: 'post',
    data
  })
}
// 导出操作员
export function downUser(data) {
  return request({
    url: '/usermanage/down/users',
    method: 'post',
    data
  })
}
// 批量禁用
export function batchForbid(data) {
  return request({
    url: '/usermanage/user/batchForbid',
    method: 'post',
    data
  })
}
// 新增操作员
export function addUser(data) {
  return request({
    url: '/usermanage/user/addUser',
    method: 'post',
    data
  })
}
// 查询操作员拥有的角色详情信息
export function userRoleDetail(data) {
  return request({
    url: '/usermanage/user/userRoleDetail',
    method: 'post',
    data
  })
}
// 注销
export function userDelete(usercode) {
  return request({
    url: `/usermanage/user/deleteUser/${usercode}`,
    method: 'delete'
  })
}
// 赋给用户角色
export function delegateRole(data) {
  return request({
    url: '/usermanage/user/delegateRole',
    method: 'post',
    data
  })
}
// 重新发送邮件
export function reSendEmail(usercode) {
  return request({
    url: `/usermanage/user/reSendEmail/${usercode}`,
    method: 'get'
  })
}
// 重置密码
export function updatePassWord(data) {
  return request({
    url: '/usermanage/user/updatePassWord',
    method: 'post',
    data
  })
}
// 校验用户登录名是否存在
export function validateUsercode(userCode) {
  return request({
    url: `/usermanage/user/validateUsercode/${userCode}`,
    method: 'get'
  })
}
// 载导出操作员Excel
export function oprateDownUser(data) {
  return request({
    url: `/usermanage/down/users`,
    method: 'post',
    data
  })
}

// 查询下拉框所有角色
export function queryRoleList() {
  return request({
    url: `/usermanage/role/queryRoleList`,
    method: 'get'
  })
}