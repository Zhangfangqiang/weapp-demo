Component({
  //扩展了组件
  behaviors: [require('../../lib/event-behavior.js')],
  //接收外部传来数据的地方
  properties: {
    index: {
      type: Number,
      value: 0
    }
  },
  data: {
    selected: 0,
    list: [{
      pagePath: "/pages/3.3-custom-tabBar-chuanshen/index",
      iconPath: "/components/custom-tab-bar/component.png",
      selectedIconPath: "/components/custom-tab-bar/component-on.png",
      text: "index",
      iconClass: "icon-homefill",
      iconTopClass: ""
    }, {
      pagePath: "/pages/3.3-custom-tabBar-chuanshen/index2/index",
      iconPath: "/components/custom-tab-bar/component.png",
      selectedIconPath: "/components/custom-tab-bar/component-on.png",
      text: "index",
      iconClass: "cu-btn icon-add bg-green shadow",
      iconTopClass: "add-action"
    }, {
      pagePath: "/pages/3.3-custom-tabBar-chuanshen/index3/index",
      iconPath: "/components/custom-tab-bar/component.png",
      selectedIconPath: "/components/custom-tab-bar/component-on.png",
      text: "自定义",
      iconClass: "icon-my",
      iconTopClass: ""
    }]
  },
  observers: {
    "index": function (id) {
      this.setData({ selected: id });
    }
  },
  methods: {
    async goToTab(e) {
      let targetPageUrl = e.currentTarget.dataset.url

      // 派发一个事件，让外部业务代码处理，待处理完了，再回到这里
      let pageData = await this.triggerWaitingEvent("pagenavigating", {
        targetPageUrl
      })
      let res = await wx.wxp.navigateTo({
        url: targetPageUrl
      })
      if (res.eventChannel) {
        res.eventChannel.emit(pageData.openType, pageData.openData)
      }
    }
  }
})