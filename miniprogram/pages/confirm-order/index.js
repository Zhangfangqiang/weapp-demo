Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts: [],
    userMessage: '',
    totalPrice: 0,
    address: {
      user_name: '选择'
    },
    submchPayParams: {},
    submchPayorderResult: {},
    prepareSubmchPay: false
  },

  /**
   * 提交
   * @param {*} e 
   */
  onSubmit(e) {
    wx.showActionSheet({
      itemList: ['默认支付', '小微商户'],
      success: (res) => {
        let index = res.tapIndex
        if (index == 0) {         //默认支付
          this.startNormalPay(e)
        } else if (index == 1) {  //小微商户
          this.startSubmchPay(e)
        }
      },
      fail(res) { console.log(res.errMsg) }
    })
  },

  /**
   * 开始 Submch 支付
   * @param {*} e 
   */
  async startSubmchPay(e) {
    if (!this.data.address.id) {
      wx.showModal({ title: '没有选择收货地址', showCancel: false })
      return
    }

    let carts = this.data.carts
    let address = this.data.address
    let addressDesc = `${address.userName},${address.telNumber},${address.region.join('')}${address.detailInfo}`
    let goodsCartsIds = carts.map(item => item.id)
    let goodsNameDesc = carts.map(item => `${item.goods_name}（${item.sku_desc}）x${item.num}`).join(',')
    if (goodsNameDesc.length > 200) { goodsNameDesc = goodsNameDesc.substr(0, 200) + ".." }
    let data = {
      totalFee: this.data.totalPrice,
      addressId: address.id,
      addressDesc: addressDesc,
      goodsCartsIds: goodsCartsIds,
      goodsNameDesc: goodsNameDesc
    }
    let res = await wx.wxp.requestL1({ url: 'http://localhost:3000/api/user/order2', method: 'post', data })
    let submchPayParams = res.data.data.params

    this.setData({ prepareSubmchPay: true, submchPayParams })
  },

  /**
   * 小微商户支付成功后
   * @param {*} res 
   */
  async bindPaySuccess(res) {
    console.log('success', res)
    this.setData({ submchPayorderResult: res.detail.info, })                                                          //支付成功原因绑定到 submchPayorderResult
    await wx.wxp.showModal({ title: '支付成功', content: '支付单号：' + res.detail.info.orderId, showCancel: false })

    let carts         = this.data.carts
    let goodsCartsIds = carts.map(item => item.id)
    this.removeCartsGoods(goodsCartsIds)
  },

  /**
   * 绑定支付失败
   * @param {*} res 
   */
  bindPayFail(res) {
    console.log('bindPayFail', res)
    this.setData({ submchPayorderResult: res.detail.info })     //将错误原因绑定到变量submchPayorderResult

    if (res.detail.error) {
      console.error('发起支付失败', res.detail.info)
      wx.showModal({ title: '支付失败，请重试', content: '支付单号：' + res.detail.info.orderId, showCancel: false })
    } else if (res.detail.navigateSuccess) {
      console.log('支付取消了，why：', res.detail.info.orderId)
      wx.showModal({ title: '支付取消了，why?', content: '支付单号：' + res.detail.info.orderId, showCancel: false })
    }
  },

  /**
   * 修改 prepareSubmchPay 值的绑定
   */
  bindPayComplete() {
    console.log('complete')
    this.setData({ prepareSubmchPay: false })
  },

  /**
   * 开始支付
   * @param {*} e 
   */
  async startNormalPay(e) {
    //数据检测
    if (!this.data.address.id) {
      wx.showModal({ title: '没有选择收货地址', showCancel: false })
      return
    }

    let address = this.data.address
    let addressDesc = `${address.userName},${address.telNumber},${address.region.join('')}${address.detailInfo}`
    let carts = this.data.carts
    let goodsCartsIds = carts.map(item => item.id)                                                                    //获取ids
    let goodsNameDesc = carts.map(item => `${item.goods_name}（${item.sku_desc}）x${item.num}`).join(',')             //拼接商品名称 详情 数量 
    if (goodsNameDesc.length > 200) { goodsNameDesc = goodsNameDesc.substr(0, 200) + ".." }

    let data = { totalFee: this.data.totalPrice, addressId: address.id, addressDesc, goodsCartsIds, goodsNameDesc }
    let res = await wx.wxp.requestL1({ url: 'http://localhost:3000/api/user/order1', method: 'post', data })
    let payArgs = res.data.data.params

    /**
     * 调起支付ui界面
     */
    wx.requestPayment({
      timeStamp: payArgs.timeStamp,
      nonceStr: payArgs.nonceStr,
      package: payArgs.package,
      signType: 'MD5',
      paySign: payArgs.paySign,
      success: async res => {
        if (res.errMsg == 'requestPayment:ok') {
          await wx.wxp.showModal({ title: '支持成功', showCancel: false })     //消息提示
          this.removeCartsGoods(goodsCartsIds)                              //已下单的商品从购物车里移除
        } else {
          wx.showModal({ title: '支持取消或失败了，请稍后得试', showCancel: false })
        }
      },
      fail: (err) => {
        console.log('fail', err);
      }
    })
  },

  /**
   * 将已经下单的商品从购物车中移除
   * @param {*} goodsCartsIds 
   */
  async removeCartsGoods(goodsCartsIds) {
    let data = { ids: goodsCartsIds }
    let res2 = await wx.wxp.requestL1({ url: 'http://localhost:3000/user/my/carts', method: 'delete', data })

    if (res2.data.msg == 'ok') {
      wx.switchTab({ url: '/pages/cart/index' })                        //页面跳转到购物车页
    } else {
      wx.showModal({ title: '更新购物车数据失败', showCancel: false })     //消息提示  
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()     //打开监听
    eventChannel.on('cartData', (res) => {                //监听事件
      this.setData({ carts: res.data })                     //获取监听数据
      this.calcTotalPrice()                               //计算价格
    })
  },

  /**
   * 准备跳转地址列表表，选取地址
   */
  toSelectAddress() {
    wx.navigateTo({
      url: '/pages/address-list/index',
      success: res => {
        res.eventChannel.on('selectAddress', address => {
          address.addressInfo = address.region.join('') + address.detailInfo
          this.setData({ address })
        })
      }
    })
  },

  /**
   * 重新计算总价
   */
  calcTotalPrice() {
    let totalPrice = 0
    let carts = this.data.carts
    carts.forEach(item => { totalPrice += item.price * item.num })
    this.setData({ totalPrice })
  }
})