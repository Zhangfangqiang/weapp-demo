Page({
  data: {
    vtabs: [],
    activeTab: 0,
    goodsListMap: {},
    loading: true,
    thumb:'https://www.zfajax.com/wp-content/uploads/2021/06/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20210615135119-1.png'
  },

  /**
   * miniprogram/miniprogram_npm/@miniprogram-component-plus/vtabs/index.js
   * 页面初始化加载加载了一些数据
   */
  async onLoad() {
    let categories = await wx.wxp.requestT({ url: 'http://localhost:3000/api/category/index' })
    if (categories) { categories = categories.data.data }
    let vtabs = []

    for (let i = 0; i < categories.length; i++) {
      let item = categories[i]
      if (i < 3) {
        this.getGoodsListByCategory(item.id, i)       /*根据id获取分类列表数据*/
      }
      vtabs.push({ title: item.category_name, id: item.id })
    }

    this.setData({ vtabs, loading: false })
  },

  /**
   * 点击商品详情切换到商品详情页
   * @param {*} e 
   */
  async onTapGoods(e) {
    wx.showLoading({ title: 'Loading..' })
    let goodsId = e.currentTarget.dataset.id      
    let goods   = await wx.wxp.requestT({url: `http://localhost:3000/api/goods/${goodsId}`})

    /*如果数据存在切换到详情页面*/
    if (goods) {
      goods = goods.data.data
      wx.navigateTo({
        url: `/pages/goods/index?goodsId=${goodsId}`,
        success: function (res) {
          res.eventChannel.emit('goodsData', { data: goods })
        }
      })
    }
    wx.hideLoading()
  },

  /**
   * 重新计算高度
   * @param {*} index 
   */
  reClacChildHeight(index) {
    const goodsContent  = this.selectComponent(`#goods-content${index}`)  /*选中组件content*/
    const categoryVtabs = this.selectComponent('#category-vtabs')         /*选中组件vtab*/
    categoryVtabs.calcChildHeight(goodsContent)                           /*修改了原始组件@miniprogram-component-plus/vtabs/index.js*/
  },

  /**
   * 根据分类加载数据的类
   * @param {*} categoryId 
   * @param {*} index 
   * @param {*} loadNextPage 
   */
  async getGoodsListByCategory(categoryId, index, loadNextPage = false) {
    const pageSize = 10
    let pageIndex = 1
    let listMap = this.data.goodsListMap[categoryId]

    if (listMap) {
      if (listMap.rows.length >= listMap.count) { return }   /*加载完了，就不要重复加载了*/
      if (listMap.pageIndex) {
        pageIndex = listMap.pageIndex
        if (loadNextPage) pageIndex++
      }
    }

    let goodsData = await wx.wxp.requestT({
      url: `http://localhost:3000/api/goods/index?page_index=${pageIndex}&page_size=${pageSize}&category_id=${categoryId}`,
    })

    if (goodsData) { goodsData = goodsData.data.data; }

    /*如果有就数据就往后追加没有就创建*/
    if (listMap) {
      listMap.pageIndex = pageIndex
      listMap.count = goodsData.count
      listMap.rows.push(...goodsData.rows)

      this.setData({
        [`goodsListMap[${categoryId}]`]: listMap
      })
    } else {
      goodsData.pageIndex = pageIndex
      this.setData({
        [`goodsListMap[${categoryId}]`]: goodsData
      })
    }

    this.reClacChildHeight(index)
  },

  /**
   * 根据屏幕滚动的位置
   * @param {*} e 
   */
  onScrollToIndexLower(e) {
    console.log('onScrollToIndexLower:',e)
    let index = e.detail.index;
    //获取数据
    if (index != this.data.lastIndexForLoadMore) {
      let cate = this.data.vtabs[index]
      let categoryId = cate.id
      this.getGoodsListByCategory(categoryId, index, true)
      this.data.lastIndexForLoadMore = index
    }
  },

  /**
   * 改变数据内容
   * @param {*} index 
   */
  onCategoryChanged(index) {
    console.log('onCategoryChanged:',index)
    let cate        = this.data.vtabs[index]
    let category_id = cate.id
    if (!this.data.goodsListMap[category_id]) {
      this.getGoodsListByCategory(category_id, index)
    }
  },

  /**
   * 点击导航切换商品列表
   * @param {*} e 
   */
  onTabCLick(e) {
    console.log('onTabCLick:',e)
    const index = e.detail.index
    this.onCategoryChanged(index)
  },

  /**
   * 如果内容随着往下滚动自动切换tab
   * @param {*} e 
   */
  onChange(e) {
    console.log('onChange',e)
    const index = e.detail.index
    this.onCategoryChanged(index)
  }

})
