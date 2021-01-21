import request from './requestOther'

// 1.上传图片或弹窗对象列表文件
export function uploadFile(data) {
  return request({
    url: '/mabaseMan/popupAds/uploadFile',
    method: 'post',
    data
  })
}
// 2.新增弹窗广告
export function popupAdsAdd(data) {
  return request({
    url: '/mabaseMan/popupAds/add',
    method: 'post',
    data
  })
}
// 3.下载图片或弹窗对象列表文件
export function popupAdsDown(data) {
  return `http://op.eptok.com/mabaseMan/popupAds/down?groupName=${data.split(',')[0]}&remoteFileName=${data.split(',')[1]}`
}
// 获取数据字典
export function getDataDicTionary(data) {
  return request({
    url: '/mabaseMan/popupAds/getDataDicTionary',
    method: 'post',
    data
  })
}
// 弹屏广告查询
export function popupAdsQuery(data) {
  return request({
    url: '/mabaseMan/popupAds/query',
    method: 'post',
    data
  })
}
// 弹屏广告修改
export function popupAdsModify(data) {
  return request({
    url: '/mabaseMan/popupAds/modify',
    method: 'post',
    data
  })
}
export function getOrgList(data) {
  return request({
    url: '/mabaseMan/common/getOrgList',
    method: 'post',
    data
  })
}
