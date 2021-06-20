Page({
  data: {
    html: '<div class="div_class" style="line-height: 60px; color: red;">Hello&nbsp;World!<img style="width:90%;" src="https://www.zfajax.com/wp-content/uploads/2021/06/16237361261.png" /></div>',

    nodes: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'line-height: 60px; color: red;'
      },
      children: [{
        type: 'text',
        text: 'Hello&nbsp;World!'
      }, {
        name: 'img',
        attrs: {
          src: 'https://www.zfajax.com/wp-content/uploads/2021/06/16237361261.png',
          style: 'width:100%'
        }
      }]
    }],

    //parser的样式
    tagStyle: {
      img: 'border:3px solid red;',
    },
  },
  tap() {
    console.log('tap')
  },

  /**
   * 准备方法
   */
  onReady() {

    /**
     * 获取url的方法
     * @param {*} nodes 
     */
    function findUrl(nodes) {
      let urls = []
      nodes.forEach(item => {
        if (item.name == 'img' && item.attrs) {
          for (const key in item.attrs) {
            if (key == 'src') {
              urls.push(item.attrs[key])
            }
          }
        }
        if (item.children) {
          urls = urls.concat(findUrl(item.children))
        }
      })
      return urls
    }

    this.data.urls = findUrl(this.data.nodes)
  },

  /**
   * parser组件调用的方法
   * @param {*} e 
   */
  onTapImage(e) {
    console.log('onTapImage')
  }

})