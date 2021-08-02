// miniprogram/pages/person_information/person_information.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo=wx.getStorageSync('userInfo')
    if(userInfo)
    {
      this.setData({
        userInfo:JSON.parse(userInfo)

      })
      console.log(this.data.userInfo)
    }


  },

  revise_phone(){
    wx.navigateTo({
      url:'/pages/revise_phone/revise_phone'
    })
  },
  revise_location(){
   wx.navigateTo({
     url:'/pages/revise_location/revise_loaction'
   })
  },
  revise_nickname(){
    wx.navigateTo({
      url:'/pages/revise_nickname/revise_nickname'
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

    let userInfo=wx.getStorageSync('userInfo')
    if(userInfo)
    {
      this.setData({
        userInfo:JSON.parse(userInfo)

      })
      console.log(this.data.userInfo)
    }

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