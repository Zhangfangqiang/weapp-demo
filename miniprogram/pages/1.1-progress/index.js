Page({
  data: {
    percentValue: 0
  },

  /**
   * 进度条动画结束的回调
   * @param {*} e 
   */
  onProgressActiveEnd(e) {
    console.log('onProgressActiveEnd')
  },

  /**
   * 点击进度条出发的事件
   * @param {*} e 
   */
  onTapProgressBar(e) {
    console.log('onTapProgressBar')
    let progress = this.data.percentValue
    if (progress < 100) {
      progress += 20
      this.setData({ percentValue: Math.min(100, progress) })
    }
  },

  /**
   * 重新加载进度条
   * @param {*} e 
   */
  onTapReloadBtn(e) {
    this.setData({ percentValue: 0 })
    this.setData({ percentValue: 50 })
  },

  /**
   * 环形进度条绑定方法
   */
  drawProgress() {
    if (this.data.percentValue >= 100) {
      this.setData({
        percentValue: 0
      })
    }
    this.setData({
      percentValue: this.data.percentValue + 10
    })
  }
})


