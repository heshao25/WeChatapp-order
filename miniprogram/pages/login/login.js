// miniprogram/pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Account:'',
    Password:'',
    Shop:0,
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
  async login(){
    let {Account,Password}=this.data;
    console.log(this.data)
    if(!Account)
    {
      wx.showToast({
        title:' 账号验证为空',
        icon:'none'
      })
      return;
    }
    else if(Account&&!Password)
    {
      wx.showToast({
        title: ' 密码验证为空',
        icon:'none'
      })
      return;
    }
    else{
      wx.cloud.database().collection('user_account')
          .where({
              account:this.data.Account
          })
          .get()
          .then(res=>{
            console.log(res)
            if(res.data[0].password==this.data.Password)
            {
              wx.setStorageSync('userInfo',JSON.stringify(res.data[0]))
              console.log(' 登录成功')

              wx.reLaunch({
                url:'/pages/personal/personal',
              })
            }
            else{
              wx.showToast({
                title: '密码错误',
                    icon:'none',
              })
            }
          })
          .catch(err=>{
            console.log('shop')
            wx.cloud.database().collection('shop_account')
                .where({
                  account:this.data.Account
                })
                .get()
                .then(res=>{
                  console.log('有此账号')

                  if(res.data[0].password==this.data.Password)
                  {
                    wx.setStorageSync('shopInfo',JSON.stringify(res.data[0]))
                    console.log(' 登录成功')

                    wx.reLaunch({
                      url:'/pages_2/index/index'
                    })
                  }

                })
                .catch(err=>{
                  wx.cloud.database().collection('management_account')
                  // .where({
                  //   account:this.data.Account
                  // })
                  .get()
                  .then(res=>{
                    console.log(res)
  
                    if(res.data[0].password==this.data.Password)
                    {
                      wx.setStorageSync('shopInfo',JSON.stringify(res.data[0]))
                      console.log(' 登录成功')
  
                      wx.reLaunch({
                        url:'/pages_3/index/index'
                      })
                    }

                })

          })
    })
  }
  },


  tosign() {
    wx.navigateTo({
      url:'/pages/sign/sign',
    })

  },
  torecover(){
    // if(this.data.Account=='')
    // {
    //   wx.showToast({
    //     title:'请输入您的账号',
    //     icon:'none'
    //   })
    // }
    // else {
      wx.navigateTo({
        url: '/pages/recover/recover?Account='
      })
    // }
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