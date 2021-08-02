// miniprogram/pages/settlement/settlement.js
var util = require('../../utils/util.js');
var QR = require('../../utils/qrcode')
let i=1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Pickway:'店内就餐',
    Location:'',
    Price:'',
    FoodNameStorage: [],
    FoodList:[],
    FoodNumber:[],
    userInfo: {},
    Name:'',
    Time:'',
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
    Open:true,
    image:'',
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


      var re = /[^\u4e00-\u9fa5]/;
      wx.getStorageInfo()
          .then(res => {
            this.setData({
              FoodNameStorage: res.keys,
            })

            if (this.data.FoodNameStorage.length > 0) {
              for (let i = 0; i < this.data.FoodNameStorage.length; i++) {
                if (re.test(this.data.FoodNameStorage[i])) {
                  console.log(' 不是中文')
                } else {
                  this.setData({
                    FoodList: this.data.FoodList.concat(this.data.FoodNameStorage[i])
                  })
                }

              }
            }
            for (let i = 0; i < this.data.FoodList.length; i++) {
              wx.getStorage({
                key: this.data.FoodList[i],
              })
                  .then(res => {
                    this.setData({
                      FoodNumber: this.data.FoodNumber.concat(res.data)
                    })
                  })
            }


          })
          .catch(err => {
            console.log('err')
          })

      wx.getStorage({
        key: 'Price',
      })
          .then(res => {
            this.setData({
              Price: res.data
            })
          })
          .catch(err => {
            console.log('err')
          })
      wx.getStorage({
        key: 'location',
      })
          .then(res => {
            console.log(res.data)
            this.setData({
              Location: res.data
            })
          })
          .catch(err => {
            console.log('err')
          })


    }
    let l=wx.getStorageSync('location')
   wx.cloud.database().collection('shop_account')
       .where({
         name:l
       })
       .get()
       .then(res=>{
         console.log(this.data.Location)
         console.log(res)
         this.setData({
           Open_morning_Hour:res.data[0].opentime_morning_hour,
           Open_after_Hour:res.data[0].opentime_after_hour,
           Open_evening_Hour:res.data[0].opentime_evening_hour,
           Open_morning_Min:res.data[0].opentime_morning_min,
           Open_after_Min:res.data[0].opentime_after_min,
           Open_evening_Min:res.data[0].opentime_evening_min,
           Close_morning_Hour:res.data[0].closetime_morning_hour,
           Close_after_Hour:res.data[0].closetime_after_hour,
           Close_evening_Hour:res.data[0].closetime_evening_hour,
           Close_morning_Min:res.data[0].closetime_morning_min,
           Close_after_Min:res.data[0].closetime_after_min,
           Close_evening_Min:res.data[0].closetime_evening_min,
         })
         if(res.data[0].open==true) {
           this.panduan();
         }
         else{
           wx.showToast({
             title:'店铺已关闭',
             icon:'none'
           })
         }
       })
       .catch(err=>{
         console.log('获取营业时间失败')
       })


    /***************************判断是否在营业时间******************************/
    // let hour=new Date().toTimeString().substring(0,2);//现在小时
    // let min=new Date().toTimeString().substring(3,5);//现在分钟
    // console.log('判断时间  ')
    // if(hour<this.data.Open_morning_Hour||(hour==this.data.Open_morning_Hour&&min<this.data.Open_morning_Min))
    // {
    //   console.log('unsuccess')
    // }
    // else if((hour<this.data.Open_after_Hour&&hour>this.data.Close_morning_Hour)||(hour==this.data.Close_morning_Hour&&min>this.data.Close_morning_Min)||(hour==this.data.Open_after_Hour&&min<this.data.Open_after_Min))
    // {
    //   console.log('unsuccess')
    // }
    // else if((hour<this.data.Open_evening_Hour&&hour>this.data.Close_after_Hour)||(hour==this.data.Close_after_Hour&&min>this.data.Close_after_Min)||(hour==this.data.Open_evening_Hour&&min<this.data.Open_evening_Min))
    // {
    //   console.log('unsuccess')
    // }
    // else if(hour>this.data.Close_evening_Hour||(hour==this.data.Close_evening_Hour&&min>this.data.Close_evening_Min))
    // {
    //   console.log('unsuccess')
    // }
    // else
    // {
    //   console.log('success')
    // }




  },
  panduan(){
    let hour=new Date().toTimeString().substring(0,2);//现在小时
    let min=new Date().toTimeString().substring(3,5);//现在分钟
    console.log('判断时间  ')
    if(hour<this.data.Open_morning_Hour||(hour==this.data.Open_morning_Hour&&min<this.data.Open_morning_Min))
    {
      console.log('unsuccess_1')
    }
    else if((hour<this.data.Open_after_Hour&&hour>this.data.Close_morning_Hour)||(hour==this.data.Close_morning_Hour&&min>this.data.Close_morning_Min)||(hour==this.data.Open_after_Hour&&min<this.data.Open_after_Min))
    {
      console.log('unsuccess_2')
    }
    else if((hour<this.data.Open_evening_Hour&&hour>this.data.Close_after_Hour)||(hour==this.data.Close_after_Hour&&min>this.data.Close_after_Min)||(hour==this.data.Open_evening_Hour&&min<this.data.Open_evening_Min))
    {
      console.log('unsuccess_3')
    }
    else if(hour>this.data.Close_evening_Hour||(hour==this.data.Close_evening_Hour&&min>this.data.Close_evening_Min))
    {
      console.log('unsuccess_4')
    }
    else
    {
      this.setData({
        Timeon:1
      })
    }
  },
  changepickway(){

    const takeWay='外卖';
    const local='店内就餐';
    if(i==0) {
      this.setData({
        Pickway:local ,
      })
      i=i+1;
    }
    else{
      this.setData({
        Pickway: takeWay,
      })
      i=0;
    }
  },
  pay(){
if(this.data.Open==false)
{
  wx.showToast({
    title:'店铺已打样',
    icon:'none'
  })
}

if(this.data.Timeon==1&&this.data.Open==true)
{
  /*************************获取系统时间**********************************/
  var time = util.formatTime(new Date());
  // 再通过setData更改Page()里面的data，动态更新页面的数据
  this.setData({
    Time: time
  });
  /*********************************************************************/



  /********************************************************************/

  wx.cloud.database().collection(this.data.userInfo.account)
      .add({
        data: {
          food: this.data.FoodList,
          number: this.data.FoodNumber,
          price: this.data.Price,
          time: this.data.Time,
          location: this.data.Location,
          pickway: this.data.Pickway,
          code:'',
        }
      })
      .then(res => {
        wx.cloud.database().collection(this.data.userInfo.account)
            .where({
              time:this.data.Time
            })
            .get()
            .then(res=>{
              if(this.data.Pickway=='店内就餐') {
                var code = QR.createQrCodeImg(res.data[0].time + this.data.userInfo.nickname + this.data.Location)

                this.setData({
                  image: code
                })
              }
             // console.log('code'+this.data.image)
              wx.setStorageSync('code',this.data.image)


              wx.cloud.database().collection(this.data.userInfo.account)
                  .doc(res.data[0]._id)
                  .update({
                    data:{
                      code:this.data.image
                    }
                  })
                  .then(res=>{
                    console.log('img_success')
                  })
                  .catch(err=>{
                    console.log('img_err')
                  })


            })
            .catch(err=>{

            })
      })
      .catch(err => {
        console.log('fail')
      })
  /***************************************************************/

      /***********************************************************/
  let l=wx.getStorageSync('location')

    wx.cloud.database().collection('shop_account')
        .where({
          name:l
        })
        .get()
        .then(res=>{
          wx.cloud.database().collection(res.data[0].order)
              .add({
                data:{
                  food: this.data.FoodList,
                  number: this.data.FoodNumber,
                  price: this.data.Price,
                  time: this.data.Time,
                  location: this.data.Location,
                  pickway: this.data.Pickway,
                  nickname:this.data.userInfo.nickname,
                  finish:false,
                  address:this.data.userInfo.location,
                }
              })
              .then(res=>{
                console.log('写入商家订单成功')

              })
              .catch(err=>{
                console.log('写入商家订单失败')
              })


        })
        .catch(err=>{

        })
/***************************************/
  if(this.data.Pickway=='店内就餐')
  {
    // wx.navigateTo({
    //   url: '/pages/qrcode/qrcode?time=' + this.data.Time
    // })
    wx.reLaunch({
      url: '/pages/myorders/myorders',
    })
  }
  else
  {
    wx.reLaunch({
      url: '/pages/myorders/myorders',
    })
  }

}
else
{
  wx.showToast({
    title:'未到营业时间',
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