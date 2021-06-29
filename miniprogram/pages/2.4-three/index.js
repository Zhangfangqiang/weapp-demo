// import { createScopedThreejs } from 'threejs-miniprogram'
const { createScopedThreejs } = require('threejs-miniprogram')
const { renderCube }          = require('../../lib/test-cases/cube')
const { renderCubes }         = require('../../lib/test-cases/cubes')
const { renderSphere }        = require('../../lib/test-cases/sphere')
const { renderModel }         = require('../../lib/test-cases/model')

const app = getApp()

Page({
  data: {},
  onLoad: function () {
    wx.createSelectorQuery()
      .select('#webgl')
      .node()
      .exec((res) => {
        const canvas = res[0].node
        this.canvas = canvas
        const THREE = createScopedThreejs(canvas)
        this.fadeToAction = renderCube(canvas, THREE)     //可以拖拽的皮卡丘正方体 
        // this.fadeToAction = renderSphere(canvas, THREE)   //球体万阵列
        // this.fadeToAction = renderCubes(canvas, THREE)    //正方体万花筒
        // this.fadeToAction = renderModel(canvas, THREE)    //3d机器人
      })
  },

  /**
   * 播放动画方法 根据传入的参数改变播放的动画
   * @param {*} e 
   */
  play(e) {
    let action = e.currentTarget.dataset.action
    this.fadeToAction(action)
  },

  /**
   * 鼠标拖动画布开始
   * @param {*} e 
   */
  touchStart(e) {
    console.log('touchStart')
    this.canvas.dispatchTouchEvent({ ...e, type: 'touchstart' })
  },

  /**
   * 鼠标拖动画布移动
   * @param {*} e 
   */
  touchMove(e) {
    console.log('touchMove')
    this.canvas.dispatchTouchEvent({ ...e, type: 'touchmove' })
  },

  /**
   * 鼠标拖动画布移动
   * @param {*} e 
   */
  touchEnd(e) {
    console.log('touchEnd')
    this.canvas.dispatchTouchEvent({ ...e, type: 'touchend' })
  }
})
