// miniprogram/pages_2/m_up_next/m_up_next.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopInfo:{},
    Name_show:'',
    Ingredients_show:'',
    Price_show:'',
    Name:'',
    Ingredients:'',
    Price:'',
    Path:'',
    Id:'',
    Type_storage:[],
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
    let id=options.id;
    console.log(id)
    this.setData({
      Id:id
    })

    wx.cloud.database().collection(this.data.shopInfo.goods)
        .where({
          _id:id
        })
        .get()
        .then(res=>{
          console.log(res)
          this.setData({
            Name_show:res.data[0].name,
            Ingredients_show:res.data[0].element,
            Price_show:res.data[0].price,
          })

        })
        .catch(err=>{

        })
    this.check();

  },
  check(){
    wx.cloud.database().collection(this.data.shopInfo.type)
        .get()
        .then(res=> {
          for(let i=0;i<res.data.length;i++)
          {
            console.log(res.data[i].name)
            this.setData({
              Type_storage:this.data.Type_storage.concat(res.data[i].name),

            })

          }
        })

  },
  handleInput(event){
    let type=event.currentTarget.id;//获取当前id
    this.setData({
      [type]:event.detail.value
    })
    console.log(type)
  },
  bindtypeChange(event){
    console.log(event.detail.value)
    this.setData({
      index:event.detail.value,

    })
    this.setData({
      type:this.data.Type_storage[this.data.index]
    })

  },
  image(){
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
    })
        .then(res=> {
          console.log(res.tempFilePaths[0])
          const path = res.tempFilePaths[0];
          wx.cloud.uploadFile({
            cloudPath: 'Dishes/'+this.data.Name+'_'+Math.floor(Math.random()*1000000), // 上传至云端的路径
            filePath: path, // 小程序临时文件路径
          })
              .then(res=>{
                console.log('上传成功'+res.fileID)
                let newpath=res.fileID;
                console.log(newpath)
                this.setData({
                  Path:newpath
                })
              })


        })
        .catch(err=>{

        })
  },
  up(){
    if(this.data.Name!==''&&this.data.Price!==''&&this.data.Ingredient!==''&&this.data.Path!=='')
    {
      console.log(this.data.shopInfo.goods)
      console.log(this.data.Id)
      wx.cloud.database().collection(this.data.shopInfo.goods)
          .doc(this.data.Id)
          .update({
            data:{
              name:this.data.Name,
              type:this.data.type,
              price:this.data.Price,
              element:this.data.Ingredient,
              image:this.data.Path
            }
          })
          .then(res=>{
            console.log('success')
          })
          .catch(err=>{

          })
    }
    // if(this.data.Price!=='')
    // {
    //   wx.cloud.database().collection(this.data.shopInfo.goods)
    //       .doc(this.data.Id)
    //       .update({
    //         data:{
    //           price:this.data.Price
    //         }
    //       })
    //       .then(res=>{
    //         console.log('success')
    //       })
    //       .catch(err=>{

    //       })
    // }
    // if(this.data.Ingredients!=='')
    // {
    //   wx.cloud.database().collection(this.data.shopInfo.goods)
    //       .doc(this.data.Id)
    //       .update({
    //         data:{
    //           element:this.data.Ingredient
    //         }
    //       })
    //       .then(res=>{
    //         console.log('success')
    //       })
    //       .catch(err=>{

    //       })
    // }
    // if(this.data.Path!=='')
    // {
    //   wx.cloud.database().collection(this.data.shopInfo.goods)
    //       .doc(this.data.Id)
    //       .update({
    //         data:{
    //           image:this.data.Path
    //         }
    //       })
    //       .then(res=>{

    //       })
    //       .catch(err=>{

    //       })
    // }
    
    wx.navigateBack({
      delta: 1
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