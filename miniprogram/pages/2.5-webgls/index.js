import { createScopedThreejs } from 'threejs-miniprogram'
import drawRectangle           from './draw-rectangle'
import drawColorRectangle      from './draw-color-rectangle'
import drawAnimationRectangle  from './draw-animation-rectangle'
import drawCube                from './draw-cube'
import drawTextureCube         from './draw-texture-cube'
import { renderModel }         from '../../lib/test-cases/model'

Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    /**案例1开始**/
    wx.createSelectorQuery()
    .select('#myCanvas2')
    .node()
    .exec((res) => {
      const canvas = res[0].node
      const gl     = canvas.getContext('webgl')
      if (!gl) {
        console.log('webgl未受支持');
        return
      }
      var available_extensions = gl.getSupportedExtensions();         //检查所有支持的扩展
      console.log(available_extensions);
      gl.clearColor(0.0, 0.0, 0.0, 1.0);                              //清除画布使用完全不透明的黑色清除所有图像，我们将清除色设为黑色，此时并没有开始清除
      gl.clear(gl.COLOR_BUFFER_BIT);                                  // 用上面指定的颜色清除缓冲区

      //drawRectangle(gl)                   //画的是一个正方形
      //drawColorRectangle(gl)              //给正方形加点颜色
      //drawAnimationRectangle(gl,canvas)   //带动画的正方形
      //drawCube(gl, canvas)                //立体的
      drawTextureCube(gl, canvas)         //贴材质
    })

    /**案例2开始**/
    wx.createSelectorQuery()
      .select('#myCanvas1')
      .node()
      .exec((res) => {
        const canvas      = res[0].node
        const gl          = canvas.getContext('webgl')
        const ext         = gl.getExtension('EXT_color_buffer_float');
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.RGBA16F, 256, 256);
        const THREE       = createScopedThreejs(canvas)                          //创建一个与 canvas 绑定的 three.js
        this.fadeToAction = renderModel(canvas, THREE)                           //创建一个机器人 
      })
  },
})


