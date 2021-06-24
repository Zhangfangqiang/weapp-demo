// miniprogram/pages/2.18/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 新方法登陆
   * @param {*} e 
   */
  login0(e) {
    console.log(e)
    let { userInfo, encryptedData, iv } = e.detail

    /**
     * 检查wxSession这个数据在微信上
     */
    wx.checkSession({
      success() {
        console.log('在登陆中');
        let token = wx.getStorageSync('token')
        if (token) onUserLogin(token)
      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程
        wx.login({
          success(res0) {
            if (res0.code) {
              requestLoginApi(res0.code)
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      }
    })

    const requestLoginApi = (code) => {
      //发起网络请求
      wx.request({
        url: 'http://localhost:3000/user/wexin-login0',
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        data: {
          code: code,
          userInfo,
          encryptedData,
          iv
        },
        success(res) {
          console.log('请求成功', res.data)
          let token = res.data.data.authorizationToken
          wx.setStorageSync('token', token)
          onUserLogin(token)
          console.log('authorization', token)
        },
        fail(err) {
          console.log('请求异常', err)
        }
      })
    }

    /**
     * 提示登陆成功 保存token到全局数据中
     * @param {*} token 
     */
    const onUserLogin = (token) => {
      getApp().globalData.token = token
      wx.showToast({
        title: '登陆成功了',
      })
    }

  },

  /**
   * 旧方法登陆
   * @param {*} e 
   */
 
  /**
   * 分享按钮
   * @param {*} options 
   */
  onShareAppMessage: function (options) {
    return {
      title: '登陆',
      path: '/pages/2.22/index'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.showShareMenu({
    //   withShareTicket: true
    // })
  },


})