// miniprogram/pages/3.1/index.js
import loginWithCallback from '../../lib/login'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showLoginPanel: false,
    showLoginPanel2: false
  },

  /**
   * 3.1 测试一个网络请求,以及返回
   */
  startOneRequest() {
    let reqTask = wx.request({
      url: 'http://localhost:3000/web/index/index',
      /*成功调用这里*/
      success(res) {
        if (res.errMsg === "request:ok") {
          console.log("success-3.1", res)
        }
      },
      /*失败调用这里*/
      fail(err) {
        if (err.errMsg === "request:fail") {
          console.log("fail-3.1", err)
        }
      },
      /*不管成功失败调用这里*/
      complete(resOrErr) {
        console.log("complete-3.1", resOrErr)
      }
    })

    const headersReceivedCallback = function (headers) {
      reqTask.offHeadersReceived(headersReceivedCallback)     //取消监听 HTTP Response Header 事件
      console.log('headers', headers);
      if (~~headers.header['Content-Length'] < 19) {          //如果返回的Content-Length小于19
        reqTask.abort()                                       //中断请求任务
      }
    }

    reqTask.onHeadersReceived(headersReceivedCallback)        //监听 HTTP Response Header 事件。会比请求完成事件更早
  },

  /**
   * 3.1 测试一个网络请求,以及返回
   */
  startLoginAndRequest(e) {
    /*访问user/home的箭头函数*/
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
    /*获取用户信息*/
    let { userInfo, encryptedData, iv } = e.detail
    console.log('userInfo', userInfo);

    /*登陆箭头函数方法*/
    const requestLoginApi = (code) => {
      wx.request({
        url: 'http://localhost:3000/user/wexin-login2',
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

    const onUserLogin = (token) => {
      getApp().globalData.token = token
      wx.showToast({
        title: '登陆成功了',
      })
      requestUserHome(token)
    }

    /*微信登陆主要实现小程序的登陆*/
    const login = () => {
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

    wx.checkSession({
      success() {
        let token = wx.getStorageSync('token')
        if (token) {
          onUserLogin(token)
        } else {
          // session会重复，需要处理
          login()
        }
      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程
        login()
      }
    })
  },

  /**
   * 3.1 测试一个网络请求,以及返回
   */
  startLoginAndRequest2(e) {
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

    // 先判断
    if (wx.getStorageSync('token')) {
      let token = wx.getStorageSync('token')
      requestUserHome(token)
      return
    }

    let {
      userInfo,
      encryptedData,
      iv
    } = e.detail
    console.log('userInfo', userInfo);

    const requestLoginApi = (code) => {
      //发起网络请求
      wx.request({
        url: 'http://localhost:3000/user/wexin-login2',
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

    const onUserLogin = (token) => {
      getApp().globalData.token = token
      wx.showToast({
        title: '登陆成功了',
      })
      requestUserHome(token)
    }

    const login = () => {
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

    wx.checkSession({
      success() {
        let token = wx.getStorageSync('token')
        if (token) {
          onUserLogin(token)
        } else {
          // session会重复，需要处理
          login()
        }
      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程
        login()
      }
    })
  },

  /**
   * 3.1 在登陆之后，发起网络请求
   */
  startLoginAndRequest3(e) {
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

    this.loginWithCallback(e, (token) => {
      requestUserHome(token)
    })
  },







  // 3.5 
  startLoginAndRequestWithPromise(e) {
    // 调用user/home接口
    const requestUserHome = (token) => {
      wx.request({
        url: 'http://localhost:3000/user/home?name=ly',
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

    loginWithCallback(e).then((token) => {
      requestUserHome(token)
    })
  },

  // 3.5
  async startLoginAndRequestWithPromise2(e) {
    // 调用user/home接口
    let token = await loginWithCallback(e)
    let res = await getApp().wxp.request({
      url: 'http://localhost:3000/user/home?name=ly',
      header: {
        'Authorization': `Bearer ${token}`
      }
    }).catch(err => {
      console.log('err', err);
    })
    console.log('res', res);
  },

  // 3.5
  async startLoginAndRequestWithPromise3(e) {
    // 调用user/home接口
    let token = await loginWithCallback(e)
    let res = await getApp().wxp.request2({
      url: 'http://localhost:3000/user/home?name=ly'
    })
    console.log('res', res)
  },

  // 3.4 any
  any(e) {
    const app = getApp()
    let promise1 = app.wxp.request({ url: 'http://localhost:30001/' }).catch(err => {
      console.log(err)
      throw err
    }),
      promise2 = app.wxp.request({ url: 'http://localhost:3000/hi' }).catch(console.log),
      promise3 = app.wxp.request({ url: 'http://localhost:3000/user/home' }).catch(console.log)
    let promise = Promise.any([promise1, promise2, promise3])
    promise.then(res => {
      console.log('any promise res', res);
    }, err => {
      console.log('any promise err', err);
    })
  },

  all(e) {
    const app = getApp()
    let promise1 = app.wxp.request({ url: 'http://localhost:3000/' }),
      promise2 = app.wxp.request({ url: 'http://localhost:3000/hi' }),
      promise3 = app.wxp.request({ url: 'http://localhost:3000/user/home' });
    let promise = Promise.all([promise1, promise2, promise3])
    promise.then(res => {
      console.log('all promise res', res);
    }, err => {
      console.log('all promise err', err);
    })
  },

  race(e) {
    const app = getApp()
    let promise1 = app.wxp.request({ url: 'http://localhost:3000/' }),
      promise2 = app.wxp.request({ url: 'http://localhost:3000/hi' }),
      promise3 = app.wxp.request({ url: 'http://localhost:3000/user/home' });
    let promise = Promise.race([promise1, promise2, promise3])
    promise.then(res => {
      console.log('race promise res', res);
    }, err => {
      console.log('race promise err', err);
    })
  },




  startLoginAndRequestOther(e) {
    // 调用user/home接口
    const requestUserHome = (token) => {
      wx.request({
        url: 'http://localhost:3000/user/home?name=ly',
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

    this.loginWithCallback(e, (token) => {
      requestUserHome(token)
    })
  },

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

  // 带有回调的登陆方法
  loginWithCallback(e, cb) {
    let { userInfo, encryptedData, iv } = e.detail

    /**
     * 检查wxsession是否存在
     */
    wx.checkSession({
      success() {
        let token = wx.getStorageSync('token')
        if (token) {
          onUserLogin(token)
        } else {
          login()       //session会重复，需要处理
        }
      },
      fail() {
        login()         //session_key 已经失效，需要重新执行登录流程
      }
    })

    /**
     * 请求api登陆的方法
     * @param {*} code 
     */
    const requestLoginApi = (code) => {
      //发起网络请求
      wx.request({
        url: 'http://localhost:3000/user/wexin-login2',
        method: 'POST',
        header: {'content-type': 'application/json'},
        data: {
          code: code,
          userInfo,
          encryptedData,
          iv
        },
        success(res) {
          console.log('请求成功', res.data)
          let token = res.data.data.authorizationToken
          wx.setStorageSync('token', token)               //存一下token数据
          onUserLogin(token)                              
          console.log('authorization', token)
        },
        fail(err) {
          console.log('请求异常', err)
        }
      })
    }

    /**
     * 设置全局token变量弹框提示执行回调函数
     * @param {*} token 
     */
    const onUserLogin = (token) => {
      getApp().globalData.token = token
      wx.showToast({
        title: '登陆成功了',
      })
      if (cb && typeof cb === 'function') cb(token)
    }

    /**
     * 登陆方法小程序登陆后调用api登陆
     */
    const login = () => {
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


  },

  // 3.6
  async requestOneHomeApi(e) {
    let res3 = await getApp().wxp.request2({
      url: 'http://localhost:3000/user/home',
    })
    if (res3) console.log('res3', res3)
  },

  // 3.9
  async requestHomeApi(e) {
    const app = getApp()

    // 普通接口
    let res1 = await app.wxp.getSystemInfo()
    if (res1) console.log(res1)

    // Uncaught (in promise) thirdScriptError
    // 使用request2
    let res2 = await app.wxp.request2({
      url: 'http://localhost:3000/hi',
    })
    if (res2) console.log(res2)

    // 一个需要鉴权的接口
    let res3 = await app.wxp.request2({
      url: 'http://localhost:3000/user/home',
    })
    if (res3) console.log('res3', res3)

    // 使用request3
    let res4 = await app.wxp.request3({
      url: 'http://localhost:3000/user/home',
    })
    if (res4) console.log('res4', res4)
  },

  // 测试返回对象
  requestHomeApiByReq4(e) {
    getApp().wxp.request4({
      url: 'http://localhost:3000/user/home',
      onReturnObject(rtn) {
        rtn.abort()
      }
    }).catch(err => {
      console.log(err);
    })
  },

  showLoginPanel: async function (e) {
    this.setData({
      showLoginPanel: true
    })
  },

  showLoginPanel2(e) {
    this.setData({
      showLoginPanel2: true
    })
  },

  // 3.9
  async testRequest3(e) {
    const app = getApp()
    // 一个需要鉴权的接口
    let res3 = await app.wxp.request2({
      url: 'http://localhost:3000/user/home',
    })
    if (res3) console.log('res3', res3)

    // 使用request3
    let res4 = await app.wxp.request3({
      url: 'http://localhost:3000/user/home',
    })
    if (res4) console.log('res4', res4)
  },

  // 3.8
  testEvent(e) {
    const ge = getApp().globalEvent
    function func1(a, b) {
      console.log("a+b", a + b);
      return a + b
    }
    ge.on("event1", func1)
    ge.emit("event1", 1, 2)
    ge.off("event1")
    ge.emit("event1", 1, 2)
  },

})