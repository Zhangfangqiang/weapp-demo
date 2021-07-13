Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    userName:'',
    telNumber:'',
    region: ['广东省', '广州市', '海珠区'],
    detailInfo:''
  },

  /**
   * 点击保存按钮
   * @param {*} e 
   */
  async save(e){
    let detailInfo = this.data.detailInfo
    let telNumber  = this.data.telNumber
    let userName   = this.data.userName
    let region     = this.data.region
    let id         = this.data.id 

    if (!userName || !telNumber || !detailInfo){
      wx.showModal({title: '数据项不能为空'})
      return 
    }

    if (!/[\d-]{11,18}/.test(telNumber)){
      wx.showModal({title: '电话格式对吗？'})
      return 
    }

    let data   = {userName, telNumber, detailInfo, region, id}
    let method = id ? 'put' : 'post'
    let res    = await wx.wxp.requestL1({url:'http://localhost:3000/api/user/address', method, data})
    if (res.data.msg == 'ok'){
      let opener  = this.getOpenerEventChannel()        //获取事件
      let address = {user_name:userName, tel_number:telNumber, detail_info:detailInfo, region, id} 
      if (!id) {address.id = res.data.data.id }
      opener.emit("savedNewAddress", address)           //发送事件
      wx.navigateBack({delta: 1})                       
    }else{
      wx.showToast({title: '添加失败，是否电话重复了？'})
    }
  },

  /**
   * 地址修改绑定事件
   * @param {*} e 
   */
  bindRegionChange: function (e) {
    this.setData({region: e.detail.value})
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let opener = this.getOpenerEventChannel()     //打开监听
    opener.on("editAddress", address=>{           //监听editAddress 拿到数据
      console.log('address',address)
      this.setData({
        userName:address.user_name,
        telNumber:address.tel_number,
        detailInfo:address.detail_info,
        region:address.region,
        id:address.id
      })
    })
  }
})