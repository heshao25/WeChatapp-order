// miniprogram/pages_2/m_add/m_add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopInfo:{},
    Type_storage:[],
    index:0,
    Type:'',
    type:'',
    input_on:0,
    Name:'',
    Ingredient:'',
    Price:'',
    Path:'',
    first:'',
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

    this.setData({
      type:this.data.first
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
                console.log(res.data)
                for(let i=0;i<res.data.length;i++)
                {
                  console.log(res.data[i].name)
                  this.setData({
                    Type_storage:this.data.Type_storage.concat(res.data[i].name),
                    first:this.data.Type_storage[0]
                  })

                }
               
              })
              .catch(err=>{

              })
        })
        .catch(err=>{

        })
  },
  show_input(){
    this.setData({
      input_on:1
    })
  },
  clear(){
    console.log('clear')
    this.setData({
      input_on:0
    })
  },
  input(){
    if(this.data.Type!='')
    {
      wx.cloud.database().collection('shop_account')
          .where({
            account: this.data.shopInfo.account
          })
          .get()
          .then(res => {
            wx.cloud.database().collection(res.data[0].type)
                .add({
                  data: {
                    name: this.data.Type
                  }
                })
                .then(res => {
                  console.log('添加成功')
                  this.setData({
                    type_storage:[],
                  })
                  this.check();
                })
                .catch(err => {
                  console.log('添加失败')
                })
          })
          .catch(err => {

          })

      wx.showToast({
        title: '种类已添加',
        icon: 'none'
      })

      this.setData({
        input_on: 0
      })
    }
    else
    {
      wx.showToast({
        title: '输入不能为空',
        icon: 'none'
      })
    }
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
    if(this.data.Name!=''&&this.data.Ingredient!=''&&this.data.Price!=''&&this.data.type!=''&&this.data.Path!='')
    {
      wx.cloud.database().collection('shop_account')
          .where({
            account:this.data.shopInfo.account
          })
          .get()
          .then(res=>{
            /*************添加种类****************/
            // wx.cloud.database().collection(res.data[0].type)
            //     .add({
            //       data:{
            //         name:this.data.type
            //       }
            //     })
            //     .then(res=>{
            //       console.log('种类添加成功')
            //     })
            //     .catch(err=>{
            //       console.log('种类添加失败')
            //     })
            /*************添加菜品****************/
            wx.cloud.database().collection(res.data[0].goods)
                .add({
                  data:{
                    belong:this.data.shopInfo.name,
                    element:this.data.Ingredient,
                    name:this.data.Name,
                    price:this.data.Price,
                    type:this.data.type,
                    image:this.data.Path,
                  }
                })
          })
          .catch(err=>{

          })
          wx.showToast({
            title: '添加成功',
            icon: 'success',
          
          })
          
    }
    else
    {
      wx.showToast({
        title:'请先完成填写',
        icon:'none'
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