// miniprogram/pages/cart/index.js

Page({
  /**
   * 页面的初始数据
   */
  data: {
    showLoginPanel:false,
    cartIdSelectedResult:[],
    allIsSelected:false,
    editMode:false,
    carts:[],
    totalPrice:0
  },
  // 重新计算总价
  calcTotalPrice(){
    let totalPrice = 0
    let ids = this.data.cartIdSelectedResult
    let carts = this.data.carts
    ids.forEach(id=>{
      carts.some(item=>{
        if (item.id == id){
          totalPrice += item.price * item.num 
          return true 
        }
        return false
      })
    })
    this.setData({
      totalPrice
    })
  },
  changeEditMode(){
    let editMode = !this.data.editMode
    this.setData({
      editMode
    })
  },

  onSelectGoodsItem(e){
    let cartIdSelectedResult = e.detail
    this.setData({
      cartIdSelectedResult,
    });
    this.calcTotalPrice()
  },
  onSelectAll(event) {
    let allIsSelected = event.detail
    let cartIdSelectedResult = this.data.cartIdSelectedResult
    cartIdSelectedResult.length = 0

    if (allIsSelected){
      let carts = this.data.carts
      for(let j=0;j<carts.length;j++){
        cartIdSelectedResult.push(`${carts[j].id}`)
      }
    }

    this.setData({
      allIsSelected,
      cartIdSelectedResult
    });
    this.calcTotalPrice()
  },


  async onShow(){
    let res = await getApp().wxp.requestL1({
      url:'http://localhost:3000/api/cart/my',
      method:'get'
    })
    if (res.data.msg == "ok"){
      let carts = res.data.data 
      this.setData({
        carts
      })
    }
  },

  onCartConfirm(e){
    // 拿到列表数据
    let carts = this.data.carts 
    let cartData = []
    let ids = this.data.cartIdSelectedResult
    if (ids.length == 0){
      wx.showModal({
        title: '未选择商品',
        showCancel: false
      })
      return
    }
    ids.forEach(id=>{
      carts.some(item=>{
        if (item.id == id){
          cartData.push(Object.assign({}, item))
          return true 
        }
        return false
      })
    })
    wx.navigateTo({
      url: `/pages/confirm-order/index`,
      success: function(res) {
        res.eventChannel.emit('cartData', { data: cartData })
      }
    })
  },

  async onCartGoodsNumChanged(e){
    let cartGoodsId = e.currentTarget.dataset.id 
    let oldNum = parseInt( e.currentTarget.dataset.num )
    // console.log('e.detail', typeof e.detail, cartGoodsId, oldNum)
    let num = e.detail
    let data = {num}

    let res = await getApp().wxp.request4({
      url:`http://localhost:3000/user/my/carts/${cartGoodsId}`,
      method:'put',
      data 
    })
    if (res.data.msg == 'ok'){
      wx.showToast({
        title: num > oldNum ? '增加成功' : '减少成功',
      })
      // 修复数据
      let carts = this.data.carts
      carts.some(item=>{
        if (item.id == cartGoodsId){
          item.num = num 
          return true 
        }
        return false
      })
      this.calcTotalPrice()
    }
  },

  async removeCartGoods(e){
    let ids = this.data.cartIdSelectedResult
    if (ids.length == 0){
      wx.showModal({
        title: '没有选择商品',
        showCancel: false
      })
      return 
    }
    let data = {ids}
    let res = await getApp().wxp.request4({
      url:'http://localhost:3000/user/my/carts',
      method:'delete',
      data
    })
    if (res.data.msg == 'ok'){
      let carts = this.data.carts
      for(let j=0;j<ids.length;j++){
        let id = ids[j]
        carts.some((item,index)=>{
          if (item.id == id){
            carts.splice(index,1)
            return true 
          }
          return false 
        })
      }
      this.setData({
        carts
      })
    }
  }
})