Page({
  data:{
    DataList:[],
    DinerList:[],
  },
  onLoad(){
      wx.cloud.database().collection('canteen_information').get()
      .then(res=>{//成功
        console.log(res.data)
          this.setData({
            DataList:res.data
          })
      })
      .catch(err=>{//失败
            console.log("err")
      })
    wx.cloud.database().collection('diner_information').get()
        .then(res=>{//成功
          console.log(res)
          this.setData({
            DinerList:res.data
          })
        })
        .catch(err=>{
          console.log("err")
        })

  },
   order(){
      wx.reLaunch({
          url:'/pages/order/order',
      })
    },
  tomore(event){
    console.log(event.currentTarget.dataset._id)
    wx.navigateTo({
      url:'/pages/more/more?_id='+event.currentTarget.dataset._id,
    })
  },
  todinermore(event){
    console.log(event.currentTarget.dataset._id)
    wx.navigateTo({
      url:'/pages/diner_more/diner_more?_id='+event.currentTarget.dataset._id,
    })
  },
  toorder(event){

    wx.reLaunch({
      url:'/pages/order/order?nameorder='+event.currentTarget.dataset.nameorder,
    })

  },
  onShow: function () {
    //wx.clearStorageSync();
  },


      
       

      
  

})
