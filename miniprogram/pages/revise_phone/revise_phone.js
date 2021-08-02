// miniprogram/pages/revise_phone/revise_phone.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Phone:'',
    userInfo:{},
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
    let {Phone}=this.data;
    let phoneReg=/^1(3|4|5|6|7|8|9)\d{9}$/;
    if(!phoneReg.test(this.data.Phone))
    {
      wx.showToast({
        title: '手机号码格式不正确',
        icon:'none'
      })
    }
    else {
      wx.cloud.database().collection('user_account')
          .doc(this.data.userInfo._id)
          .update({
            data: {
              phonenumber:this.data.Phone
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