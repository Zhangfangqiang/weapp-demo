import loginWithCallback from '../../lib/login'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showLoginPanel1: false,
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
   * 3.2 先登陆后请求
   * @param {*} e 
   */
  startLoginAndRequest3(e) {

    const requestUserHome = (token) => {
      wx.request({
        url: 'http://localhost:3000/api/user/index',
        header: { 'Authorization': `Bearer ${token}` },
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

  /**
   * 3.2 带有回调的登陆方法
   * @param {*} e 
   * @param {*} cb 
   */
  loginWithCallback(e, cb) {
    let { userInfo, encryptedData, iv } = e.detail

    /*检查session是否存在*/
    wx.checkSession({
      success() {
        let token = wx.getStorageSync('token')    //获取本地token
        if (token) {
          onUserLogin(token)                      //设置全局变量token  提示登陆成功 执行回调方法
        } else {
          login()
        }
      },
      fail() {
        login()
      }
    })

    /**
     * jwt登陆获取token
     * @param {*} code 
     */
    const requestLoginApi = (code) => {
      //发起网络请求
      wx.request({
        url: 'http://localhost:3000/api/user/wexin-login0',
        method: 'POST',
        header: { 'content-type': 'application/json' },
        data: { code: code, userInfo, encryptedData, iv },
        success(res) {
          let token = res.data.data.authorizationToken
          wx.setStorageSync('token', token)             //将token存储在本地小程序中
          onUserLogin(token)                            //设置全局变量token  提示登陆成功 执行回调方法
          console.log('authorization', token)
        },
        fail(err) {
          console.log('请求异常', err)
        }
      })
    }

    /**
     * 设置全局变量token  提示登陆成功 执行回调方法
     * @param {*} token 
     */
    const onUserLogin = (token) => {
      getApp().globalData.token = token
      wx.showToast({ title: '登陆成功了', })
      if (cb && typeof cb === 'function') { cb(token) }
    }

    /**
     * 发起登陆先小程序登陆,
     * 后根据小程序登陆的code
     * 调用api执行jwt登陆获取token
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

  /**
   * 3.4 只要其中的一个 promise 成功，就返回那个已经成功的 promise
   * @param {*} e 
   */
  any(e) {
    const app = getApp()
    let promise1 = app.wxp.request({ url: 'http://localhost:30001/' }).catch(err => { console.log(err); throw err }),
      promise2 = app.wxp.request({ url: 'http://localhost:3000/hi' }).catch(console.log),
      promise3 = app.wxp.request({ url: 'http://localhost:3000/user/home' }).catch(console.log)
    let promise = Promise.any([promise1, promise2, promise3])

    promise.then(res => {
      console.log('成功', res);
    }, err => {
      console.log('失败', err);
    })
  },

  /**
   * 3.4 全体 一致 才算成功
   * @param {*} e 
   */
  all(e) {
    const app = getApp()
    let promise1 = app.wxp.request({ url: 'http://localhost:3000/' }),
      promise2 = app.wxp.request({ url: 'http://localhost:3000/hi' }),
      promise3 = app.wxp.request({ url: 'http://localhost:3000/user/home' });
    let promise = Promise.all([promise1, promise2, promise3])

    promise.then(res => {
      console.log('成功', res);
    }, err => {
      console.log('失败', err);
    })
  },

  /**
   * 3.4 promise 所有任务执行完毕就算成功
   * @param {*} e 
   */
  race(e) {
    const app = getApp()
    let promise1 = app.wxp.request({ url: 'http://localhost:3000/' }),
      promise2 = app.wxp.request({ url: 'http://localhost:3000/hi' }),
      promise3 = app.wxp.request({ url: 'http://localhost:3000/user/home' });
    let promise = Promise.race([promise1, promise2, promise3])

    promise.then(res => {
      console.log('成功', res);
    }, err => {
      console.log('失败', err);
    })
  },

  /**
   * 3.4 promise 先登录后请求 案例1
   * @param {*} e 
   */
  startLoginAndRequestWithPromise1(e) {
    const requestUserHome = (token) => {
      wx.request({
        url: 'http://localhost:3000/api/user/index',
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

  /**
  * 3.4 promise 先登录后请求 案例2
   * @param {*} e 
   */
  async startLoginAndRequestWithPromise2(e) {
    let token = await loginWithCallback(e)            //直接登陆获取token
    let res = await getApp().wxp.request({          //请求用户数据
      url: 'http://localhost:3000/api/user/index',
      header: { 'Authorization': `Bearer ${token}` }
    }).catch(err => {
      console.log('错误', err);
    })
  },

  /**
  * 3.4 promise 先登录后请求 案例3
   * @param {*} e 
   */
  async startLoginAndRequestWithPromise3(e) {
    // 调用user/home接口
    let token = await loginWithCallback(e)
    let res = await getApp().wxp.requestT({
      url: 'http://localhost:3000/api/user/index'
    })
    console.log('res', res)
  },

  /**
   * 3.6 用带token的方法请求一下
   * @param {*} e 
   */
  async requestOneHomeApi(e) {
    let res3 = await getApp().wxp.requestT({
      url: 'http://localhost:3000/api/user/index',
    })
    if (res3) console.log('res3', res3)
  },

  /**
   * 3.7 修改 showLoginPanel1 变量
   * @param {*} e 
   */
  showLoginPanel1: async function (e) {
    this.setData({
      showLoginPanel1: true
    })
  },

  /**
   * 3.7 修改 showLoginPanel1 变量
   * @param {*} e 
   */
  showLoginPanel2(e) {
    this.setData({
      showLoginPanel2: true
    })
  },

  /**
   * 3.7 获取设备信息  调用带登陆弹框的 request 请求 案例1
   * @param {*} e 
   */
  requestHomeApiByReq4(e) {
    getApp().wxp.requestL1({
      url: 'http://localhost:3000/api/user/index',
      onReturnObject(rtn) {
        console.log(rtn)
        rtn.abort()
      }
    }).catch(err => {
      console.log(err);
    })
  },

  /**
   * 3.7 获取设备信息  调用带登陆弹框的 request 请求 案例2
   * @param {*} e 
   */
  async requestHomeApi(e) {
    const app = getApp()
    const res = await app.wxp.getSystemInfo()      //获取设备信息

    if (res) {
      console.log('getSystemInfo', res)
    }

    //调用带登陆弹框的 request 请求
    await app.wxp.requestL2({
      url: 'http://localhost:3000/api/user/index',
    })
  },

  /**
   * 3.8 事件测试
   * @param {*} e 
   */
  testEvent(e) {
    const globalEvent = getApp().globalEvent
    const func1       = (a, b) => {
      console.log("a+b", a + b);
      return a + b
    }

    const func2       = (b, a) => {
      console.log("b+a", b + a);
      return b + a
    }

    globalEvent.on("event1", func1)      //将事件名和方法绑定
    globalEvent.once("event1", func2)    //事件绑定了这个方法只调用一次
    globalEvent.emit("event1", 1, 2)     //根据事件名调用方法 并传入参数
    globalEvent.off("event1")            //关闭事件
    globalEvent.emit("event1", 1, 2)     //再次执行看关闭后是否会接着调用
  },
})