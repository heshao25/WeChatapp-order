// miniprogram/pages_3/user_management/user_management.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Nickname:'',
    Storage:[],
    Search:'',
    Phone:'',
    Password:'',

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
  search(){
    wx.cloud.database().collection('user_account')
        .where({
          account:this.data.Search
        })
        .get()
        .then(res=>{
          this.setData({
            Storage:res.data[0]
          })
        })
        .catch(err=>{

        })
  },
  change_phone(){
    wx.cloud.database().collection('user_account')
        .where({
          account:this.data.Search
        })
        .get()
        .then(res=>{
          wx.cloud.database().collection('shop_account')
              .doc(res.data[0]._id)
              .update({
                data:{
                  phonenumber:this.data.Phone
                }
              })
              .then(res=>{

              })
              .catch(err=>{

              })
        })
        .catch(err=>{

        })
  },
  change_nickname(){
    wx.cloud.database().collection('user_account')
        .where({
          accounr:this.data.Search
        })
        .get()
        .then(res=>{
          wx.cloud.database().collection('shop_account')
              .doc(res.data[0]._id)
              .update({
                data:{
                  nickname:this.data.Nickname
                }
              })
              .then(res=>{

              })
              .catch(err=>{

              })
        })
        .catch(err=>{

        })
  },
  change_password() {
    wx.cloud.database().collection('user_account')
        .where({
          accounr:this.data.Search
        })
        .get()
        .then(res=>{
          wx.cloud.database().collection('shop_account')
              .doc(res.data[0]._id)
              .update({
                data:{
                  password:this.data.Password
                }
              })
              .then(res=>{

              })
              .catch(err=>{

              })
        })
        .catch(err=>{

        })
  },
  clear(){
    wx.showModal({
      title: '确认删除此账号？',
      content: '删除后无法恢复'
    })
        .then(res=>{
          wx.cloud.database().collection('user_account')
              .where({
                account:this.data.Search
              })
              .then(res=>{
                wx.cloud.database().collection('user_account')
                    .doc(res.data[0]._id)
                    .remove()
                    .then(res=>{

                    })
                    .catch(err=>{

                    })
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