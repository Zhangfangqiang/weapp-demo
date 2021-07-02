require("./lib/extend-page")
import wxp   from './lib/wxp'       //用于展微信小程序的api来支持promise。
import Event from './lib/event'    //监听事件

App({
  wxp: (wx.wxp = wxp),
  globalEvent: (wx.globalEvent = new Event()),
  onLaunch: function () {

    /*云函数配置开始*/
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }
    /*云函数配置结束*/

    this.globalData = {}
  },
  /**
   * 定义一个全局方法
   */
  testHeight() {
    var data = wx.getMenuButtonBoundingClientRect()     //获取菜单按钮（右上角胶囊按钮）的布局位置信息。坐标信息以屏幕左上角为原点  
    console.log('胶囊按钮', data);
    console.log('胶囊按钮高度：', data.height)
    console.log('上边界坐标：', data.top)
    console.log('下边界坐标：', data.bottom)

    let res = wx.getSystemInfoSync()                    //获取手机信息
    console.log("screenHeight", res.screenHeight);
    console.log("statusBarHeight", res.statusBarHeight);
    console.log("windowHeight", res.windowHeight);
  }
})
