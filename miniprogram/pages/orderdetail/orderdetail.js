// miniprogram/pages/orderdetail/orderdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    Storage:[],
  },






  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let userInfo=wx.getStorageSync('userInfo')
    if(userInfo) {
      this.setData({
        userInfo: JSON.parse(userInfo),
      })
    }
    let id=options.id;
      wx.cloud.database().collection(this.data.userInfo.account)
          .where({
              time:id
               })
          .get()
          .then(res=>{
                this.setData({
                  Storage:res.data
                })
            })
          .catch(err=>{
              console.log('err')
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