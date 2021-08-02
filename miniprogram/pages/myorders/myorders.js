// miniprogram/pages/myorders/myorders.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Account:'',
    Storage:[],
    Price:[],
    userInfo: {},
    Avatar:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo=wx.getStorageSync('userInfo')
    if(userInfo) {
      this.setData({
        userInfo:JSON.parse(userInfo),
      })
      console.log(this.data.userInfo.account)
      wx.cloud.database().collection(this.data.userInfo.account)
          .get()
          .then(res => {
           this.setData({
             Storage:res.data
           })
          })
          .catch(err=>{
            console.log('err')
          })
    }



  },
  todetail(event){

    wx.navigateTo({
      url:'/pages/orderdetail/orderdetail?id='+event.currentTarget.dataset.id
    })
    console.log('time',event.currentTarget.dataset.id)



  },
  clear(event){
    wx.showModal({
      title: '确认删除？',
      content: '删除后不可恢复',
    })
        .then(res=>{
          wx.cloud.database().collection(this.data.userInfo.account)
              .where({
                time:event.currentTarget.dataset.id
              })
              .get()
              .then(res=>{
                let doc=res.data[0]._id
                wx.cloud.database().collection(this.data.userInfo.account)
                    .doc(doc)
                    .remove()
                    .then(res=>{
                      console.log('删除成功')

                      wx.cloud.database().collection(this.data.userInfo.account)
                          .get()
                          .then(res => {
                            this.setData({
                              Storage:res.data
                            })
                          })
                          .catch(err=>{
                            console.log('err')
                          })


                    })
                    .catch(err=>{
                      console.log('删除失败')
                    })



              })
              .catch(err=>{
                console.log('shibai')
              })
        })
        .catch(err=>{
          console.log('cancel')
        })



    // wx.cloud.database().collection(this.data.userInfo.account)
    //     .where({
    //       time:event.currentTarget.dataset.id
    //     })
    //     .get()
    //     .then(res=>{
    //       let doc=res.data[0]._id
    //       wx.cloud.database().collection(this.data.userInfo.account)
    //           .doc(doc)
    //           .remove()
    //           .then(res=>{
    //             console.log('删除成功')
    //
    //             wx.cloud.database().collection(this.data.userInfo.account)
    //                 .get()
    //                 .then(res => {
    //                   this.setData({
    //                     Storage:res.data
    //                   })
    //                 })
    //                 .catch(err=>{
    //                   console.log('err')
    //                 })
    //
    //
    //           })
    //           .catch(err=>{
    //             console.log('删除失败')
    //           })
    //
    //
    //
    //     })
    //     .catch(err=>{
    //         console.log('shibai')
    //     })

  },
  check(event){
    console.log(event.currentTarget.dataset.time)
    wx.navigateTo({
      url:'/pages/qrcode/qrcode?time='+event.currentTarget.dataset.time
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