// miniprogram/pages/recover_finally/recover_finally.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Issue:'',
    Answer:'',
    Answer_right:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let Account=wx.getStorageSync('Account')
    console.log(Account)
    wx.cloud.database().collection('user_account')
        .where({
          account:Account
        })
        .get()
        .then(res=>{
          this.setData({
            Issue:res.data[0].issue,
            Answer_right:res.data[0].answer
          })


        })
        .catch(err=>{
            console.log('err')
        })

  },
  handleInput(event){
    let type=event.currentTarget.id;//获取当前id
    this.setData({
      [type]:event.detail.value
    })
    console.log(type)
  },

  torecover_next(){
    let Answer=this.data
    if(this.data.Answer==this.data.Answer_right)
    {
      wx.navigateTo({
        url:'/pages/recover_next/recover_next?Account='+this.data.Account
      })
    }
    else
    {
      wx.showToast({
        title:'答案错误',
        icon:'error'
      })
    }

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