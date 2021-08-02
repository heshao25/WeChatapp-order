// miniprogram/pages_2/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Order:[],
    Name:'',
    Open_morning_Hour:0,
    Open_after_Hour:0,
    Open_evening_Hour:0,
    Open_morning_Min:0,
    Open_after_Min:0,
    Open_evening_Min:0,
    Close_morning_Hour:0,
    Close_after_Hour:0,
    Close_evening_Hour:0,
    Close_morning_Min:0,
    Close_after_Min:0,
    Close_evening_Min:0,
    Timeon:0,
    interval1:'',
    shopInfo:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let shopInfo=wx.getStorageSync('shopInfo')
    if(shopInfo)
    {
      this.setData({
        shopInfo:JSON.parse(shopInfo),
      })

    }
    // wx.cloud.database().collection('shop_account')
    //     .where({
    //       account:'canteen_one'
    //     })
    //     .get()
    //     .then(res=>{
    //       console.log('bangd')
    //       this.setData({
    //         Open_morning_Hour:res.data[0].opentime_morning_hour,
    //         Open_after_Hour:res.data[0].opentime_after_hour,
    //         Open_evening_Hour:res.data[0].opentime_evening_hour,
    //         Open_morning_Min:res.data[0].opentime_morning_min,
    //         Open_after_Min:res.data[0].opentime_after_min,
    //         Open_evening_Min:res.data[0].opentime_evening_min,
    //         Close_morning_Hour:res.data[0].closetime_morning_hour,
    //         Close_after_Hour:res.data[0].closetime_after_hour,
    //         Close_evening_Hour:res.data[0].closetime_evening_hour,
    //         Close_morning_Min:res.data[0].closetime_morning_min,
    //         Close_after_Min:res.data[0].closetime_after_min,
    //         Close_evening_Min:res.data[0].closetime_evening_min,
    //       })
    //       this.panduan();
    //
    //
    //     })
    //     .catch(err=>{
    //       console.log('err')
    //     })


   //setInterval(this.check,500)
   // this.check();


  },

  // panduan(){
  //   let hour=new Date().toTimeString().substring(0,2);//现在小时
  //   let min=new Date().toTimeString().substring(3,5);//现在分钟
  //   console.log('判断时间  ')
  //   if(hour<this.data.Open_morning_Hour||(hour==this.data.Open_morning_Hour&&min<this.data.Open_morning_Min))
  //   {
  //     console.log('unsuccess')
  //   }
  //   else if((hour<this.data.Open_after_Hour&&hour>this.data.Close_morning_Hour)||(hour==this.data.Close_morning_Hour&&min>this.data.Close_morning_Min)||(hour==this.data.Open_after_Hour&&min<this.data.Open_after_Min))
  //   {
  //     console.log('unsuccess')
  //   }
  //   else if((hour<this.data.Open_evening_Hour&&hour>this.data.Close_after_Hour)||(hour==this.data.Close_after_Hour&&min>this.data.Close_after_Min)||(hour==this.data.Open_evening_Hour&&min<this.data.Open_evening_Min))
  //   {
  //     console.log('unsuccess')
  //   }
  //   else if(hour>this.data.Close_evening_Hour||(hour==this.data.Close_evening_Hour&&min>this.data.Close_evening_Min))
  //   {
  //     console.log('unsuccess')
  //   }
  //   else
  //   {
  //     this.setData({
  //       Timeon:1
  //     })
  //
  //      // setInterval(this.check,500)
  //     //  setInterval(this.panduan,500)
  //
  //   }
  // },

   check(){
    wx.cloud.database().collection(this.data.shopInfo.order)
        .where({
          finish:false
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
  finish(event){
    console.log(event.currentTarget.dataset.id)
    wx.cloud.database().collection('canteen_one_order')
        .doc(event.currentTarget.dataset.id)
        .update({
          data:{
            finish:true
          }
        })
        .then(res=>{
          console.log('success')
        })
        .catch(err=>{
          console.log('err')
        })

  },
  more(){
    wx.navigateTo({
      url:'pages_2/more/more?id='+event.currentTarget.dataset.id,
    })
  },
  finish(event){
    wx.cloud.database().collection(this.data.shopInfo.order)
        .doc(event.currentTarget.dataset.id)
        .update({
          data:{
            finish:true
          }
        })
        .then(res=>{
          console.log('完成')
        })
        .catch(err=>{
          console.log('完成失败')
        })
  },
  tomore(event){
    wx.navigateTo({
      url:'/pages_2/more/more?id='+event.currentTarget.dataset.id
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