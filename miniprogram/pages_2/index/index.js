// miniprogram/pages_2/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Open:'',
    shopInfo:{},
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
    if(this.data.shopInfo.open==true)
    {
      this.setData({
        Open:'打烊'
      })
    }
    else
    {
      this.setData({
        open:'开张'
      })
    }


  },

  change(){
    if(this.data.Open=='打烊')
    {
      wx.showToast({
        title:'本店已经打烊',
        icon:'none'
      })
      this.setData({
        Open:'开张'
      })
      wx.cloud.database().collection('shop_account')
          .doc(this.data.shopInfo._id)
          .update({
            data:{
              open:false
            }
          })
          .then(res=>{
            console.log('success')
          })
          .catch(err=>{
            console.log('err')
          })
    }
    else
    {
      wx.showToast({
        title:'本店已经开张',
        icon:'none'
      })
      this.setData({
        Open:'打烊'
      })
      wx.cloud.database().collection('shop_account')
          .doc(this.data.shopInfo._id)
          .update({
            data:{
              open:true
            }
          })
          .then(res=>{
            console.log('success')
          })
          .catch(err=>{
            console.log('err')
          })
    }
  },


  toorder(){
    wx.navigateTo({
      url:'/pages_2/order/order'
    })
  },
  toorders(){
    wx.navigateTo({
      url:'/pages_2/history_order/history_order'
    })
  },
  tomanagement(){
    wx.navigateTo({
      url:'/pages_2/management/management'
    })
  },
  toinformation(){
    wx.navigateTo({
      url:'/pages_2/shop_information/shop_information'
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