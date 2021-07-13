// miniprogram/pages/address-list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio: 0,
    selectedAddressId: 0,
    addressList: [],
    slideButtons: [{
      type: 'warn',
      text: '删除'
    }]
  },

  /**
   * 左滑删除方法调用
   * @param {*} e 
   */
  async onSlideButtonTap(e) {
    console.log('onSlideButtonTap',e)
    let id  = e.currentTarget.dataset.id         //e.detail.index是选择按钮的序号
    let res = await wx.wxp.requestL1({url:`http://localhost:3000/api/user/address/${id}`, method:'delete'})

    if (res && res.data.msg == 'ok') {
      // 处理本地数据
      let addressList = this.data.addressList
      for (let j = 0; j < addressList.length; j++) {
        if (addressList[j].id == id) { addressList.splice(j, 1) ; break}
      }
      this.setData({addressList})
    }
  },

  /**
   * 调用微信接口获取微信上面存储的地址
   * @param {*} e 
   */
  getAddressFromWeixin(e) {
    /*判断还是是否可以在该版本中调用*/
    if (wx.canIUse('chooseAddress.success.userName')) {
      /*获取用户地址*/
      wx.chooseAddress({
        success: async (res) => {
          let addressList      = this.data.addressList
          let addressContained = addressList.find((item) => {item.telNumber == res.telNumber})          //存储的列表和 微信原生获取的选中比较
          if (addressContained) {
            this.setData({ selectedAddressId: addressContained.id });return
          }
          let data             = {
            userName   : res.userName,
            telNumber  : res.telNumber,
            region     : [res.provinceName, res.cityName, res.countyName],
            detailInfo : res.detailInfo
          }
          let resAddress       = await wx.wxp.requestL1({url: 'http://localhost:3000/api/user/address', method: 'post', data})

          if (resAddress.data.msg == 'ok') {
            let item = resAddress.data.data
            addressList.push(item)
            this.setData({addressList, selectedAddressId: item.id})
          } else {
            wx.showToast({title: '添加不成功，是不是添加过了？'})
          }
        },
      })
    }
  },

  /**
   * 点击选中确定
   * @param {*} e 
   */
  confirm(e) {
    let selectedAddressId = this.data.selectedAddressId
    let addressList       = this.data.addressList
    let item              = addressList.find(item => item.id == selectedAddressId)
    let opener            = this.getOpenerEventChannel()
    opener.emit('selectAddress', item)
    wx.navigateBack({delta: 1})
  },

  /**
   * 编辑完成的回调方法
   * @param {*} address 
   */
  onSavedAddress(address) {
    console.log('onSavedAddress', address);
    let addressList = this.data.addressList
    let hasExist    = addressList.some((item, index) => {
      if (item.id == address.id) {
        addressList[index] = {user_name:address.userName, tel_number:address.telNumber, detail_info:address.detailInfo, region:address.region, id:address.id}
        return true
      }
      return false
    })
    if (!hasExist) {
      addressList.push(address)
    }
    this.setData({addressList, selectedAddressId: address.id})
  },

  /**
   * 新增收获地址
   * @param {*} e 
   */
  navigateToNewAddressPage(e) {
    wx.navigateTo({
      url: '/pages/new-address/index',
      success: (res) => {
        res.eventChannel.on("savedNewAddress", this.onSavedAddress)
      }
    })
  },

  /**
   * 改变选中事件
   * @param {*} e 
   */
  onChange(e) {
    console.log('onChange',e)
    this.setData({selectedAddressId: e.detail});
  },

  /**
   * 点击展示编辑页
   * @param {*} e 
   */
  edit(e) {
    console.log('eidt' , e);
    let id          = e.currentTarget.dataset.id
    let addressList = this.data.addressList
    let address     = addressList.find((item) => {return item.id == id })

    wx.navigateTo({
      url: '/pages/new-address/index',
      success: (res) => {
        res.eventChannel.emit('editAddress', address)                 //发出事件 加数据
        res.eventChannel.on('savedNewAddress', this.onSavedAddress)   //监听事件 并且调用方法
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let res               = await wx.wxp.requestL1({ url: 'http://localhost:3000/api/user/address', method: 'get' })
    let addressList       = res.data.data
    let selectedAddressId = addressList[0].id
    this.setData({ addressList, selectedAddressId })
  }
})