// miniprogram/pages/revise_nickname/revise_nickname.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    Nickname: ''
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
  },
  handleInput(event){
    let type=event.currentTarget.id;//获取当前id
    this.setData({
      [type]:event.detail.value
    })
    console.log(type)
  },
  change(){
    if(this.data.Nickname!='')
    {
      wx.cloud.database().collection('user_account')
          .doc(this.data.userInfo._id)
          .update({
            data: {
              nickname:this.data.Nickname
            }

          })
          .then(res=>{
            console.log('修改数据成功')

            wx.cloud.database().collection('user_account')
                .get()
                .then(res=>{
                  console.log(' 修改缓存成功')
                  wx.setStorageSync('userInfo',JSON.stringify(res.data[0]))
                  let userInfo=wx.getStorageSync('userInfo')
                  this.setData({
                    userInfo:JSON.parse(userInfo),

                  })
                  wx.showToast({
                    title:' 修改成功',
                    icon:'success'
                  })
                })
                .catch(err=>{
                  console.log('修改缓存失败')
                })

          })
          .catch(err=>{
            console.log('修改数据失败')
          })
    }
    else
    {
      wx.showToast({
        title:'请完成输入',
        icon: 'none'
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