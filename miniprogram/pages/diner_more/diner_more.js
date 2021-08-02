// miniprogram/pages/diner_more/diner_more.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Data:'',
    Longitude:'',
    Latitude: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id=options._id;
    wx.cloud.database().collection('diner_information').doc(id)
        .get()
        .then(res=>{
          console.log(res)
          this.setData({
                Data:res.data.detail,
                Longitude:res.data.longitude,
                Latitude:res.data.latitude,
              }
          )

        })
        .catch(res=>{
          console.log('err')
        })

  },

  getLocation(){
    var that=this;

    wx.openLocation({
      latitude:this.data.Latitude,
      longitude:this.data.Longitude,
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