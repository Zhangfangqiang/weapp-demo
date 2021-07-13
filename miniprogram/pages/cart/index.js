Page({
  /**
   * 页面的初始数据
   */
  data: {
    showLoginPanel: false,
    cartIdSelectedResult: [],
    allIsSelected: false,
    editMode: false,
    carts: [],
    totalPrice: 0
  },

  /**
   * 重新计算价格
   */
  calcTotalPrice() {
    let totalPrice = 0
    let ids = this.data.cartIdSelectedResult
    let carts = this.data.carts

    ids.forEach((id) => {
      carts.forEach((item) => {
        if (item.id == id) {
          totalPrice += item.price * item.num
        }
      })
    })

    this.setData({ totalPrice })
  },

  /**
   * 编辑页存储的值修改
   */
  changeEditMode() {
    let editMode = !this.data.editMode
    this.setData({ editMode })
  },

  /**
   * 选中事件
   * @param {*} e 
   */
  onSelectGoodsItem(e) {
    console.log('选中事件item', e)
    let cartIdSelectedResult = e.detail
    this.setData({ cartIdSelectedResult });
    this.calcTotalPrice()
  },

  /**
   * 全选事件
   * @param {*} event 
   */
  onSelectAll(event) {
    console.log('全选事件', event);
    let allIsSelected = event.detail
    let cartIdSelectedResult = this.data.cartIdSelectedResult
    cartIdSelectedResult.length = 0

    if (allIsSelected) {
      let carts = this.data.carts
      for (let j = 0; j < carts.length; j++) {
        cartIdSelectedResult.push(`${carts[j].id}`)
      }
    }

    this.setData({ allIsSelected, cartIdSelectedResult });
    this.calcTotalPrice()
  },

  /**
   * 页面展示的时候嗲用
   */
  async onShow() {
    let res = await getApp().wxp.requestL1({
      url: 'http://localhost:3000/api/cart/my',
      method: 'get'
    })
    if (res.data.msg == "ok") {
      let carts = res.data.data
      this.setData({ carts })
    }
  },

  /**
   * 确认提交按钮
   * @param {*} e 
   */
  onCartConfirm(e) {
    console.log('onCartConfirm' , e)
    let carts    = this.data.carts
    let cartData = []
    let ids      = this.data.cartIdSelectedResult

    //判断是否又订单数据
    if (ids.length == 0) {
      wx.showModal({ title: '未选择商品', showCancel: false })
      return
    }

    ids.forEach(id => {
      carts.some(item => {
        if (item.id == id) {
          cartData.push({ ...item })
          return true
        }
        return false
      })
    })

    //带着购物车的数据到cartData
    wx.navigateTo({
      url: `/pages/confirm-order/index`,
      success: function (res) {
        res.eventChannel.emit('cartData', { data: cartData })
      }
    })
  },

  /**
   * 修改购物车商品数量的方法
   * @param {*} e 
   */
  async onCartGoodsNumChanged(e) {
    let num         = e.detail
    let data        = { num }
    let oldNum      = parseInt(e.currentTarget.dataset.num)
    let cartGoodsId = e.currentTarget.dataset.id
    let res         = await getApp().wxp.requestL1({ url: `http://localhost:3000/api/cart/my/${cartGoodsId}`, method: 'put', data })

    if (res.data.msg == 'ok') {
      wx.showToast({ title: (num > oldNum) ? '增加成功' : '减少成功', })
      // 修复数据
      let carts = this.data.carts
      carts.some(item => {
        if (item.id == cartGoodsId) {
          item.num = num
          return true
        }
        return false
      })
      this.calcTotalPrice()
    }
  },

  /**
   * 从购物车里移除
   * @param {*} e 
   */
  async removeCartGoods(e) {
    let ids = this.data.cartIdSelectedResult
    if (ids.length == 0) {
      wx.showModal({title: '没有选择商品',showCancel: false})
      return
    }

    let res = await getApp().wxp.requestL1({url: 'http://localhost:3000/api/cart/my',method: 'delete',data: { ids: ids }})

    if ( true) {
      let carts = this.data.carts
      for (let j = 0; j < ids.length; j++) {
        let id = ids[j]
        carts.some((item, index) => {
          if (item.id == id) {
            carts.splice(index, 1)      //删除数据
            return true
          }
          return false
        })
      }
      this.setData({carts})
    }
  }
})