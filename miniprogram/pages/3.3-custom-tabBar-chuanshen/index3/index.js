Page({

  /**
   * 页面的初始数据
   */
  data: {
    initData: {}
  },

  async onPageNavigating(e) {
    let res = await wx.wxp.request({
      url: 'http://localhost:3000/api/user/hi?name=index3',
    })

    /*该方法来自组件的扩展的方法*/
    e.detail.eventCallback({
      openType: "initData",
      openData: {
        a: res.data
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()     //获取事件改变
    if (eventChannel.on) {
      eventChannel.on('initData', (data) => {
        this.setData({
          initData: data
        })
      })
    }
  }
})