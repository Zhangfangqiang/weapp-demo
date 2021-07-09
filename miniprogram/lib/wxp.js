import { promisifyAll } from 'miniprogram-api-promise';   //扩展微信小程序的api来支持promise。

const URL_BASE = ''
const wxp      = {URL_BASE}
promisifyAll(wx, wxp)                                     //扩展api

/**
 * 带token 的 request 请求
 * @param {*} args 
 */
wxp.requestT = function (args) {
  let token = wx.getStorageSync('token')
  if (token) {
    if (!args.header) { args.header = {} }
    args.header['Authorization'] = `Bearer ${token}`
  }
  if (args.url && URL_BASE) { 
    args.url = args.url.replace(/^http:\/\/localhost:3000/, URL_BASE) 
  }
  console.log(args.url)

  return wxp.request(args).catch(function (reason) {
    console.log('reason', reason)
  })
}

/**
 * 带登陆弹框的 request 请求
 * @param {*} args 
 */
wxp.requestL2 = function (args) {
  let token = wx.getStorageSync('token')
  if (!token) {
    return new Promise((resolve, reject) => {
      let pageStack = getCurrentPages()                       //获取当前页面栈。数组中第一个元素为首页，最后一个元素为当前页面。

      if (pageStack && pageStack.length > 0) {
        let currentPage = pageStack[pageStack.length - 1]      //获取最后一个页面 也就是当前页面, 索引从0开始计数
        currentPage.setData({ showLoginPanel2: true })        //设置页面变量为true

        getApp().globalEvent.once("loginSuccess", () => {
          wxp.requestT(args).then(res => {
            resolve(res)
          }, err => {
            console.log('err', err);
            reject(err)
          })
        })
      } else {
        reject('page valid err')
      }
    })
  }
  return wxp.requestT(args)
}

/**
 * 
 * 带登陆弹框的 request 请求
 * @param {*} args 
 */
wxp.requestL1 = function (args) {
  let token = wx.getStorageSync('token')
  if (!token) {
    let pages = getCurrentPages()
    let currentPage = pages[pages.length - 1]
    currentPage.setData({ showLoginPanel1: true })          // 展示登陆浮窗
    return new Promise((resolve, reject) => {
      getApp().globalEvent.once('loginSuccess', function (e) {
        wxp.requestT(args).then(function (result) {
          resolve(result)
        }).catch(function (reason) {
          console.log('reason', reason);
        })
      })
    })
  }
  return wxp.requestT(args).catch(function (reason) {
    console.log('reason', reason);
  })
}

export default wxp