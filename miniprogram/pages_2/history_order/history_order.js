// miniprogram/pages_2/history_order/history_order.js
var util=require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Time:'',
    Count:0,
    interval1:'',
    One:0,
  },
check(){
    this.setData({
      Time: new Date().toTimeString().substring(0,2)
    })
  wx.cloud.database().collection('canteen_one_order')
      .where({
        finish:true
      })
      .get()
      .then(res=>{
        console.log(res)
        this.setData({
          Order:res.data
        })

      })
      .catch(err=>{
        console.log('err')
      })
},
  tomore(event){
    console.log(event.currentTarget.dataset.id)
    wx.navigateTo({
      url:'/pages_2/more/more?id='+event.currentTarget.dataset.id
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


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

     this.data.interval1=setInterval(this.check,1000)
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
    clearInterval(this.data.interval1)
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