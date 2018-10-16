import fetch from './config'


const qs = require('qs')

//核对宝贝
export function checkGoods(params) {
  return fetch({
    url: '/GfActive/check_item',
    method: 'post',
    data: params
  })
}
//提交申请
export function supply(params) {
  return fetch({
    url: '/GfActive/submit_apply',
    method: 'post',
    data: params
  })
}
//根据活动id，获取商品详情
export function getGood(params) {
  return fetch({
    url: '/GfActive/get_active_list',
    method: 'post',
    data: params
  })
}
//第一次申请加入购物车
export function firstJoin(params) {
  return fetch({
    url: '/GfActive/submit_apply',
    method: 'post',
    data: params
  })
}
//获取账号列表
export function getAccountList(params) {
  return fetch({
    url: '/UserAuth/get_account_list',
    method: 'post',
    data: params
  })
}

//认证账号
export function verityAccount(params) {
  return fetch({
    url: '/UserAuth/edit_account_info',
    method: 'post',
    data: params
  })
}
//添加认证
export function addAccount(params) {
  return fetch({
    url: '/UserAuth/edit_user_account',
    method: 'post',
    data: params
  })
}
//获取个人参与活动详情
export function getJoinInfo(params) {
  return fetch({
    url: '/GfActive/get_active_info',
    method: 'post',
    data: params
  })
}
//中奖用户提交下单任务
export function submitTask(params) {
  return fetch({
    url: '/GfActive/win_submit_order',
    method: 'post',
    data: params
  })
}
// 中奖用户提交报告
export function submitReport(params) {
  return fetch({
    url: '/GfActive/win_submit_report',
    method: 'post',
    data: params
  })
}

// 未中奖用户继续抽奖
export function reAddActivy(params) {
  return fetch({
    url: '/GfActive/fail_submit_task',
    method: 'post',
    data: params
  })
}
// 修改用户活动参与详情
export function editJoin(params) {
  return fetch({
    url: '/GfActive/edit_user_detail',
    method: 'post',
    data: params
  })
}
// 获取微信公众号参数配置
export function GfActive(params) {
  return fetch({
    url: '/GfActive/get_sign_package',
    method: 'get',
    params
  })
}

//上传图片
export function uploadImg(params){
  return fetch({
    url: 'UploadFile/getWeChatImages',
    method: 'post',
    data:params

  })
}




