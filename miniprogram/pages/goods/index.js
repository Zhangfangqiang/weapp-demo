// miniprogram/pages/goods/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showLoginPanel1: false,
    showSkuPanel: false,
    goodsId: 0,
    goodsData: {},
    goodsImages: [],
    goodsContentInfo: {},
    goodsSkuData: {},
    selectedGoodsSku: {
      price:'请选择规格',
      stock:'请选择规格'
    },
    selectedAttrValue: {},
    selectedGoodsSkuObject: {}
  },

  /**
   * 添加到购物车
   * @param {*} e 
   */
  async addToCart(e) {
    if (!this.data.selectedGoodsSkuObject.sku) {
      wx.showModal({title: '请选择商品规格',showCancel: false})
      this.showSkuPanelPopup()
      return
    }
    let goods_id       = this.data.goodsId
    let goods_sku_id   = this.data.selectedGoodsSkuObject.sku.id
    let goods_sku_desc = this.data.selectedGoodsSkuObject.text

    console.log('selectedGoodsSkuObject',this.data.selectedGoodsSkuObject)

    let data           = {goods_id,goods_sku_id,goods_sku_desc}
    let res = await getApp().wxp.requestL1({
      url: 'http://localhost:3000/api/cart/index',
      method: 'post',
      data
    })
    if (res.data.msg == 'ok') {
      wx.showToast({title: '已添加'})
    }
  },

  /**
   * 点击选择规格按钮
   * 显示规格面板
   */
  showSkuPanelPopup() {
    this.setData({ showSkuPanel: true });
  },

  /**
   * 关闭规格面板
   */
  onCloseSkuPanel() {
    this.setData({ showSkuPanel: false });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const eventChannel      = this.getOpenerEventChannel()    /*打开事件频道*/
    let   goodsId           = options.goodsId                 /*获取路由传递的goodsId*/
          this.data.goodsId = goodsId

    /*事件改变监听*/
    eventChannel.on('goodsData', (res) => {
      let goodsImages      = res.data.goods_infos.filter(item => (item.kind == 1 || item.kind == 2 || item.kind == 3 || item.kind == 4))        /*数据筛选获得图片*/
      let goodsContentInfo = res.data.goods_infos.filter(item => (item.kind == 1 || item.kind == 2 || item.kind == 3 || item.kind == 4))     /*数据筛获得纯文本*/

      this.setData({ goodsData: res.data, goodsImages, goodsContentInfo })
    })

    /*拉取sku规格数据*/
    let goodsSkuDataRes = await wx.wxp.request({ url: `http://localhost:3000/api/goods/${goodsId}/sku` })

    if (goodsSkuDataRes) {
      let goodsSkuData = goodsSkuDataRes.data.data    //删除外层
      this.setData({ goodsSkuData })
    }
  },

  /**
   * 点击商品规格tag 标签
   * @param {*} e 
   */
  onTapSkuTag(e) {
    let attrKey   = e.currentTarget.dataset.attrkey         /*获取表爱你key 是个字符串*/
    let attrvalue = e.currentTarget.dataset.attrvalue       /*获取标签value 是个obj*/

    let selectedAttrValue          = this.data.selectedAttrValue    /*取出老数据*/
        selectedAttrValue[attrKey] = attrvalue                      /*这里覆盖了*/

    this.setData({selectedAttrValue})
    console.log('选中的标签',selectedAttrValue)
    
    /**
     * 计算价格及库存
     */
    let totalIdValue  = 0                                     /*选中的 value id 总和*/
    let goodsAttrKeys = this.data.goodsSkuData.goodsAttrKeys
    for (let i = 0; i < goodsAttrKeys.length; i++) {
      let attrKey = goodsAttrKeys[i].attr_key
      if (selectedAttrValue[attrKey]) {
        totalIdValue += selectedAttrValue[attrKey].id         /*获取 value id 相当于内存大小8G 4G的最小id*/
      }
    }

    let goodsSku         = this.data.goodsSkuData.goodsSku    /*记录商品库存的最小种类*/

    /*循环商品最小单元*/
    for (let i = 0; i < goodsSku.length; i++) {
      let tempTotalIdValue      = 0
      let goodsAttrPath         = goodsSku[i].goods_attr_path
      console.log("goodsAttrPath",goodsAttrPath)

      if (goodsAttrPath.length != goodsAttrKeys.length) { break }   //如果不存在goods_attr_path 就跳出循环
      goodsAttrPath.forEach( (item) => {tempTotalIdValue += item} )


      console.log('pathId + 选中 ',tempTotalIdValue == totalIdValue)
      if (tempTotalIdValue == totalIdValue) {
        let selectedGoodsSku = goodsSku[i]
        this.setData({selectedGoodsSku})
        break;
      }
    }
  },

  /**
   * 确定选择当前规格
   */
  onConfirmGoodsSku() {
    let goodsSkuData           = this.data.goodsSkuData
    let selectedGoodsSkuObject = this.data.selectedGoodsSkuObject
    selectedGoodsSkuObject.sku = Object.assign({}, this.data.selectedGoodsSku)
    selectedGoodsSkuObject.text = ''
    
    for (let j = 0; j < goodsSkuData.goodsAttrKeys.length; j++) {
      let item = goodsSkuData.goodsAttrKeys[j]
      if (!this.data.selectedAttrValue[item.attr_key]) {
        wx.showModal({title: '没有选择全部规格',showCancel: false})
        return
      }
      selectedGoodsSkuObject.text += this.data.selectedAttrValue[item.attr_key].attr_value + ' '
    }
    console.log('确认规格赋值',selectedGoodsSkuObject)

    this.setData({
      selectedGoodsSkuObject,
      showSkuPanel: false
    })
  }
})