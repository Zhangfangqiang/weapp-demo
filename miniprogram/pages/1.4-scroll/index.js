const recycleView = require('miniprogram-recycle-view')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [],
    viewId: 5,
    triggered: false,
    scrollTopValue: 0,
    pullingMessage: '下拉刷新',//下拉刷新,释放更新,加新中...
    scrollIntoViewId: '',
    refresherTriggered: false,//
    tabs: []
  },

  /**
   * 页面准备事件
   */
  onReady() {
    var rv = recycleView({
      id: 'recycleId',
      dataKey: 'recycleList',
      page: this,
      itemSize: {
        width: wx.$common.rpx2px(650),
        height: wx.$common.rpx2px(100)
      }
    })

    let newList = []
    for (let i = 0; i < 20; i++) {
      newList.push({
        id: i,
        name: `标题${i + 1}`
      })
    }
    rv.append(newList)

    // 
    const arr = []
    for (let i = 0; i < 20; i++) {
      arr.push(i)
    }
    this.setData({
      arr
    })

    setTimeout(() => {
      this.setData({
        triggered: true,
      })
    }, 1000)
    // 
    let activeTab = 0, page = 1, res = { something: '' }
    let tabsData = this.data.tabs[activeTab] || { list: [] }
    tabsData.page = page + 1
    tabsData.list.push(res)
    let key = `tabs[${activeTab}]`
    this.setData({
      [key]: tabsData
    })
    console.log(this.data.tabs)





  },


  /**
   * 滑动到顶部
   * @param {*} e 
   */
  viewScrollToUpperEvent(e) {
    console.log('viewScrollToUpperEvent', e.detail);
  },

  /**
   * 如果你滑动
   * @param {*} e 
   */
  onScroll(e) {
    console.log('onScroll', e.detail.scrollTop, e.detail.scrollLeft, e.detail.scrollHeight, e.detail.scrollWidth)
  },

  /**
   * 改变id
   */
  scrollToView1() {
    this.setData({
      viewId: this.data.viewId + 2,
      scrollIntoViewId: 'childview' + this.data.viewId
    })
    console.log(this.data.scrollIntoViewId)
  },



  onRefresh() {
    if (this._freshing) return
    this._freshing = true
    setTimeout(() => {
      this.setData({
        triggered: false,
      })
      this._freshing = false
    }, 3000)
  },

  /**
   * 抛出的一个方法让wxs调用
   */
  willCompleteRefresh() {
    console.log('更新中')
    let intervalId = setInterval(() => {
      let pullingMessage = this.data.pullingMessage
      console.log(pullingMessage, pullingMessage == '更新中')
      if (pullingMessage.length < 7) {
        pullingMessage += '.'
      } else {
        pullingMessage = '更新中'
      }
      this.setData({
        pullingMessage
      })
    }, 500)
    setTimeout(() => {
      console.log('更新完成了')
      clearInterval(intervalId)
      this.setData({
        pullingMessage: "已刷新",
        refresherTriggered: false,
      })
    }, 2000)
  },

  /**
   * 操作按钮向上滚动
   */
  plusScrollUpValue() {
    this.setData({
      scrollTopValue: this.data.scrollTopValue + 50
    })
  },

  /**
   * 操作顶部加一列图片
   */
  unshiftOnePic() {
    let arr = this.data.arr
    arr.unshift(arr.length + 1)
    this.setData({
      arr
    })
  },

  /**
   * 滚动到顶部触发事件
   */
  onScrolltoupper(e){
    console.log('onScrolltoupper',e)
  },

  /**
   * 被下拉
   * @param {*} e 
   */
  onPulling(e) {
    console.log('onPulling:', e)
  },

  /**
   * 自定义下拉刷新被复位
   * @param {*} e 
   */
  onRestore(e) {
    console.log('onRestore:', e)
  },
})