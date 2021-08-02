// miniprogram/pages_2/m_del/m_del.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Type_storage:[],
    shopInfo:{},
    index:0,
    Goods_storage:[],
    Type:'',
    fist:'',
    Clear_storage:[],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let shopInfo=wx.getStorageSync('shopInfo')
    if(shopInfo) {
      this.setData({
        shopInfo: JSON.parse(shopInfo),
      })
    }
    this.check();
    
  //   console.log('type',this.data.Type)
  //  wx.cloud.database().collection('shop_account')
  //  .where({
  //    account:this.data.shopInfo.account
  //  })
  //  .get()
  //  .then(res=>{
  //    console.log(res.data[0].goods)
     
  //     wx.cloud.database().collection(res.data[0].goods)
  //     .where({
  //       type:this.data.Type
  //     })
  //     .get()
  //     .then(res=>{
  //       console.log(res)
  //       // console.log(res.data)
  //       //   this.setData({
  //       //     Goods_storage:res.data
  //       //   })
  //     })
  //     .catch(err=>{
  //         console.log('菜品查询失败')
  //     })
  //  })
  //  .catch(err=>{

  //  })
  

  },
  bindtypeChange(event){
    console.log(event.detail.value)
    this.setData({
      index:event.detail.value,
    })
    this.setData({
      Type:this.data.Type_storage[this.data.index]
    })
    this.search();
  
  },
  search(){
    wx.cloud.database().collection('shop_account')
    .where({
      account:this.data.shopInfo.account
    })
    .get()
    .then(res=>{
      console.log(res.data[0].goods)
      
       wx.cloud.database().collection(res.data[0].goods)
       .where({
         type:this.data.Type
       })
       .get()
       .then(res=>{
         console.log(res)
         console.log(res.data)
           this.setData({
             Goods_storage:res.data
           })
       })
       .catch(err=>{
           console.log('菜品查询失败')
       })
    })
    .catch(err=>{
 
    })
  },

  check(){
    wx.cloud.database().collection('shop_account')
    .where({
      account:this.data.shopInfo.account
    })
    .get()
    .then(res=>{
        wx.cloud.database().collection(res.data[0].type)
        .get()
        .then(res=>{
          for(let i=0;i<res.data.length;i++)
                {
                  //console.log(res.data[i].name)
                  this.setData({
                    Type_storage:this.data.Type_storage.concat(res.data[i].name),
                    Type:this.data.Type_storage[0]
                  })

                }
          this.search();
        })
        .catch(err=>{
          console.log('读取失败')
        })
    })
    .catch(err=>{
      console.log('查询失败')
    })
  },
  clear(event){
    console.log(event.currentTarget.dataset.id)
    wx.cloud.database().collection(this.data.shopInfo.goods)
        .doc(event.currentTarget.dataset.id)
        .remove()
        .then(res=>{
          wx.showToast({
            title: '成功',
            icon: 'success',
          })
          注意
          console.log("删除成功")
        })
        .catch(err=>{
          console.log('删除失败')
        })
  },
  cleartype(){
    wx.showModal({
      title: '确认删除整个品类',
      content: '删除后无法恢复',
    })
        .then(res=>{
          wx.cloud.database().collection(this.data.shopInfo.type)
              .where({
                name:this.data.Type
              })
              .get()
              .then(res=>{
                wx.cloud.database().collection(this.data.shopInfo.type)
                    .doc(res.data[0]._id)
                    .remove()
                    .then(res=>{

                    })
                    .catch(err=>{

                    })
              })
              .catch(err=>{

              })

          wx.cloud.database().collection(this.data.shopInfo.goods)
              .where({
                type:this.data.Type
              })
              .get()
              .then(res=>{
                for(let i=0;i<res.data.length;i++)
                {
                  wx.cloud.database().collection(this.data.shopInfo.goods)
                      .doc(res.data[i]._id)
                      .remove()
                      .then(res=>{

                      })
                      .catch(err=>{

                      })
                }
              })
              .catch(err=>{

              })


          })

        .catch(err=>{
          console.log('cancel')
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