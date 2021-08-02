// miniprogram/pages/recover_next/recover_next.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Password:'',
    Repassword:'',
    Account:'',
    Id:'',
    Password_right:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let account=wx.getStorageSync('Account')
    this.setData({
      Account:account
    })

  },
  handleInput(event){
    let type=event.currentTarget.id;//获取当前id
    this.setData({
      [type]:event.detail.value
    })
  },
  tologin() {
    let {Password,Repassword}=this.data;
    if(this.data.Password==''||this.data.Repassword=='')
    {
      wx.showToast({
        title: '请完成输入',
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
            this.setData({
              Id:res.data[0]._id,
              Password_right:res.data[0].password
            })
          })
          .catch(err=>{
            console.log(' 查询失败')
          })
    }
    if(this.data.Id!==''&&this.data.Password!=this.data.Password_right)
    {
      wx.cloud.database().collection('user_account')
          .doc(this.data.Id)
          .update({
            data:{
              password:this.data.Password
            }
          })
          .then(res=>{
            wx.removeStorageSync('Account')
            wx.navigateTo({
              url:'/pages/login/login'
            })
            console.log(' 修改成功')
          })
          .catch(err=>{
            console.log('修改失败')
          })
    }
    if(this.data.Id!==''&&this.data.Password!=this.data.Password_right)
    {
      wx.showTost({
        title:'新密码不可与旧密码相同',
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