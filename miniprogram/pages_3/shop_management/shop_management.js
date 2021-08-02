// miniprogram/pages_3/shop_management/shop_management.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Search:'',
    Storage:[],
    Information:[],
    Complaints:[],
    Password:'',
    Info:'',
    Detail:'',
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
    wx.cloud.database().collection('shop_account')
        .where({
          account:this.data.Search
        })
        .get()
        .then(res=>{
          console.log(res.data)
          if(res.data.length>0)
          {
            this.setData({
              Storage:res.data[0]
            })
          }
          else
          {
            wx.showToast({
              title:'未查询到此用户',
              icon:'none'
            })
          }
        })

    /**********************************/
    wx.cloud.database().collection('canteen_information')
        .where({
          name:this.data.Storage.name
        })
        .get()
        .then(res=>{
          this.setData({
            Information:res.data[0]
          })
          this.check_complaints()

        })
    /*************************************/



  },
  check_complaints(){
        console.log(this.data.Search)
   wx.cloud.database().collection('complaints')
       .where({
         account:this.data.Search
       })
       .get()
       .then(res=>{
         console.log(res)
         this.setData({
           Complaints:res.data
         })

       })
       .catch(err=>{
         console.log('err')
       })
  },
  clear(){
    wx.showModal({
      title: '确认删除此账号？',
      content: '删除后无法恢复'
    })
        .then(res=>{
          this.clear_account();

        })
        .catch(err=>{

        })
  },
  clear_account(){
    console.log(this.data.Storage)
    wx.cloudPath.database().collection('shop_account')
        .doc(this.data.Storage._id)
        .remove()
        .then(res=>{
          console.log('删除账户数据中数据成功')
        })
        .catch(err=>{
          console.log('删除账户数据中数据失败')
        })

    wx.cloud.database().collection('canteen_information')
        .where({
          name:this.data.Storage
        })
        .get()
        .then(res=>{
          wx.cloud.database().collection('canteen_information')
              .doc(res.data[0]._id)
              .remove()
              .then(res=>{
                console.log('删除信息成功')
              })
              .catch(err=>{
                console.log('删除信息失败')
              })
        })
        .catch(err=>{
          wx.cloud.database().collection('diner_information')
              .where({
                name:this.data.Storage
              })
              .get()
              .then(res=>{
                wx.cloud.database().collection('diner_information')
                    .doc(res.data[0]._id)
                    .remove()
                    .then(res=>{
                      console.log('删除信息成功')
                    })
                    .catch(err=>{
                      console.log('删除信息失败')
                    })

              })
              .catch(err=>{

              })

        })
  },
  change_password(){
    wx.cloud.database().collection('shop_account')
        .doc(this.data.Storage._id)
        .update({
          data:{
            password:this.data.Password
          }
        })
        .then(res=>{

        })
        .catch(err=>{

        })


  },
  change_info(){
    wx.cloud.database().collection(this.data.Storage.information)
        .where({
          name:this.data.Storage
        })
        .get()
        .then(res=>{
          wx.cloud.database().collection(this.data.Storage.information)
              .doc(res.data[0]._id)
              .update({
                data:{
                  information:this.data.Information
                }
              })
        })
        .catch(err=>{

        })

  },
  change_detail(){
    wx.cloud.database().collection(this.data.Storage.information)
        .where({
          name:this.data.Storage
        })
        .get()
        .then(res=>{
          wx.cloud.database().collection(this.data.Storage.information)
              .doc(res.data[0]._id)
              .update({
                data:{
                  detail:this.data.Detail
                }
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