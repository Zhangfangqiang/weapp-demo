async function connectWifi() {
  let ssid     = 'zfh'                       //你自己的wifi名称
  let pass     = 'zfh12345678'               //你自己的wifi密码
  let sysInfo  = wx.getSystemInfoSync()      //获取系统星系
  let platform = sysInfo.platform            //通过系统信息 获取 平台
  var bssid    = '';

  /*如果是安卓平台*/
  if (platform == "android") {
    let sysVersion = parseInt(sysInfo.system.substr(8))
    if (sysVersion < 6) { return "android版本低" }

    /*获取设置*/
    let res0 = await wx.wxp.getSetting({
      withSubscriptions: false,
    }).catch(err => {
      console.log("err", err);
      return `运行错误：${err}`
    })

    /*判断是否有位置权限*/
    if (res0 && !res0.authSetting["scope.userLocation"]) {

      /*授权权限*/
      let authRes = await wx.wxp.authorize({
        scope: 'scope.userLocation'
      }).catch(err => {
        console.log("err", err);
        return `运行错误：${err}`
      })

      /*如果权限提示错误*/
      if (authRes && authRes.errMsg != "authorize:ok") {
        console.log('地理授权失败', authRes.errMsg);
        return 'android地理授权失败'
      }
    }

    /*如果是ios平台*/
  } else if (platform == "ios") {
    let sysVersion = parseInt(sysInfo.system.substr(4))
    if (sysVersion < 11) { return "ios版本低" }

    await wx.wxp.showModal({
      title: '请切到系统设置->wifi列表，等待wifi连接成功',
      showCancel: false
    }).catch(err => {
      console.log("err", err);
      return `运行错误：${err}`
    })

    /*如果是其他平台*/
  } else {
    return "平台不支持"
  }

  /*获取wifi状态*/
  await wx.wxp.startWifi().catch(err => {
    console.log("err", err);
    return `运行错误：${err}`
  })

  /*获取wifi列表*/
  await wx.wxp.getWifiList().catch(err => {
    console.log("err", err);
    return `运行错误：${err}`
  })

  /*监听wifi列表*/
  let res = await new Promise((resolve, reject) => {
    wx.onGetWifiList(res => {
      resolve(res)
    })
  })

  /*如果wifi列表为空终止*/
  if (!res.wifiList.length) { return "wifi列表为空" }

  /*循环wifi列表比对名称*/
  for (var i = 0; i < res.wifiList.length; i++) {
    let wifi = res.wifiList[i]
    if (wifi.SSID == ssid) {
      bssid = wifi.BSSID
      break
    }
  }

  /*如果为空比对失败*/
  if (!bssid) {return '未查询到目标wifi'}

  /*开始链接wifi*/
  let res1 = await wx.wxp.connectWifi({
    SSID: ssid,
    BSSID: bssid,
    password: pass
  }).catch(err => {
    console.log("err", err);
    return `运行错误：${err}`
  })

  /*链接成功的提示*/
  if (res1) {
    console.log("wifi连接成功");
    return "connectWifi:ok"
  }
  return "未知错误"
}

export default connectWifi