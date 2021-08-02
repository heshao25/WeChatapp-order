// miniprogram/pages_2/m_up/m_up.js
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
    Path:'',
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
  search() {

    wx.cloud.database().collection(this.data.shopInfo.goods)
        .where({
          type:this.data.Type
        })
            .get()
            .then(res=>{
              console.log(res.data)
              this.setData({
                Goods_storage:res.data
              })
            })
            .catch(err=>{

            })
  },
  check(){
    wx.cloud.database().collection(this.data.shopInfo.type)
        .get()
        .then(res=>{
          console.log(res.data)
          for(let i=0;i<res.data.length;i++)
          {
            //console.log(res.data[i].name)
            this.setData({
              Type_storage:this.data.Type_storage.concat(res.data[i].name),
              Type:this.data.Type_storage[0]
            })
            this.search();

          }
        })
        .catch(err=>{

        })
  },
  revise(event){
    wx.navigateTo({
      url:'/pages_2/m_up_next/m_up_next?id='+event.currentTarget.dataset.id
    })
    console.log(event.currentTarget.dataset.id)

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