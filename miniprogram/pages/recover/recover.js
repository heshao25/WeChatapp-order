// miniprogram/pages/recover/recover.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Account:'',
    // Issue:'',
    // Answer:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  handleInput(event){
    let type=event.currentTarget.id;//获取当前id
    this.setData({
      [type]:event.detail.value
    })
    console.log(type)
  },
  next(){
    let {Account,Issue,Answer}=this.data;
    if(Account=='') {
      wx.showToast({
        title: ' 请完成所有填写',
        icon: 'none'
      })
    }
    else
    {
      wx.cloud.database().collection('user_account')
          .where({
            account:this.data.Account
          })
          .get()
          .then(res=>{
            if(res.data.length>0)
            {
              wx.setStorageSync('Account',this.data.Account)
              wx.navigateTo({
                url:'/pages/recover_finally/recover_finally?Account'
              })
            }
            else
            {
              wx.showToast({
                title:'此账号未注册',
                icon:'none'
              })
            }
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