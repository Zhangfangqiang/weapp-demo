Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 扩展页面测试方法
   */
  async extendPageTest() {
    this.hi('weapp')

    let res4 = await wx.wxp.requestL1({
      url: 'http://localhost:3000/api/user/index',
    })

    if (res4) {
      console.log('res4', res4) 
    }
  },

})