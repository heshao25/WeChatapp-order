// miniprogram/pages_2/shop_information/shop_information.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  shopInfo:{},
    shopintorduce:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let shopInfo=wx.getStorageSync('shopInfo')
    if(shopInfo) {
      this.setData({
        shopInfo: JSON.parse(shopInfo),
      })

    }

    wx.cloud.database().collection(this.data.shopInfo.information)
        .where({
          name:this.data.shopInfo.name
        })
        .get()
        .then(res=>{
            console.log(res.data)
          this.setData({
            shopintorduce:res.data
          })
        })
  },
  revise(){
    wx.navigateTo({
      url:'/pages_2/revise_time/revise_time'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})