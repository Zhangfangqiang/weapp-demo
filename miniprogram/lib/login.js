
function loginWithCallback(e) {
  return new Promise(async (resolve, reject) => {
    let { userInfo, encryptedData, iv } = e.detail

    const app = getApp()

    try {
      await app.wxp.checkSession()              //尝试获取wxSession
    } catch (err) {
      // reject(err) 这里不能reject
    }

    let token = wx.getStorageSync('token')      //获取storage里面的token

    if (!token) {
      let res1 = await app.wxp.login().catch(err => { reject(err) })    //登陆
      let code = res1.code                                              //获取wx code
      let res = await app.wxp.request({                                 //根据wx code 请求jwt token登陆
        url: 'http://localhost:3000/api/user/wexin-login0',
        method: 'POST',
        header: { 'content-type': 'application/json' },
        data: { code: code, userInfo, encryptedData, iv }
      }).catch(err => {
        reject(err)
      })
      token = res.data.data.authorizationToken
      wx.setStorageSync('token', token)
    }

    getApp().globalData.token = token                     //设置全局token
    wx.showToast({ title: '登陆成功了' })                 //提示登陆成功  
    resolve(token)                                        //抛出数据
  })
}

export default loginWithCallback