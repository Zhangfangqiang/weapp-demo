// miniprogram/pages/3.1/index.js
import loginWithCallback from '../../../lib/login'

Page({

  /**
   * 登陆开始
   * @param {*} e 
   */
  startLoginAndRequest4(e) {
    // 调用user/home接口
    const requestUserHome = (token) => {
      wx.request({
        url: 'http://localhost:3000/user/home',
        header: {
          'Authorization': `Bearer ${token}`
        },
        success(res) {
          if (res.errMsg === "request:ok") console.log("/user/home res", res)
        },
        fail(err) {
          if (err.errMsg === "request:fail") console.log("/user/home err", err)
        },
        complete(resOrErr) {
          console.log("/user/home resOrErr", resOrErr)
        }
      })
    }

    loginWithCallback(e, (token) => {
      requestUserHome(token)
    })
  },
})