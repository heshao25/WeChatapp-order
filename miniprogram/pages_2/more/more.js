// miniprogram/pages_2/more/more.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    food:[],
    number:[],
    shopInfo: {},
    time:'',
    nickname:'',
    price:'',
    way:'',
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

    wx.cloud.database().collection(this.data.shopInfo.order)
        .where({
          _id:options.id
        })
        .get()
        .then(res=>{
          console.log('res',res)
          this.setData({
            food:res.data[0].food,
            number:res.data[0].number,
            time:res.data[0].time,
            nickname:res.data[0].nickname,
            price:res.data[0].price,
            way:res.data[0].pickway,
          })
        })
        .catch(err=>{

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