const { wxml, style } = require('./view')
Page({

  data: {
    src: ''
  },
  onLoad() {
    //选中组件可以理解为JavaScript选中DOM
    this.widget = this.selectComponent('.widget')
  },

  /**
   * 保存图片到相册
   * @param {*} e 
   */
  onTapSaveBtn(e){
    wx.saveImageToPhotosAlbum({
      filePath:this.data.src,
      complete(res) { 
        console.log(res)
      }
    })
  },

  /**
   * 渲染为Canvas
   */
  renderToCanvas() {
    const p1 = this.widget.renderToCanvas({ wxml, style })
    p1.then((res) => {
      console.log('container', res.layoutBox)
      this.container = res
    })
  },

  /**
   * 渲染为图片
   */
  extraImage() {
    const p2 = this.widget.canvasToTempFilePath()
    p2.then(res => {
      this.setData({
        src: res.tempFilePath,
        width: this.container.layoutBox.width,
        height: this.container.layoutBox.height
      })
    })
  }
})
