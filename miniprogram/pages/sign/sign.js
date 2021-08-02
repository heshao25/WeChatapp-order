// miniprogram/pages/sign/sign.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Account:'',
    Password: '',
    Repassword:'',
    Insurance:'',
    Answer:'',
    Location:'',
    PhoneNumber:'',
    Nickname:'',
  },

  handleInput(event){
    let type=event.currentTarget.id;//获取当前id
    this.setData({
      [type]:event.detail.value
    })
    console.log(type)
  },

  async signup(){
    let {Account,Password,Repassword,Insurance,Answer,Location,NickName,PhoneNumber}=this.data;
     if(Account==''||Password==''||Repassword==''||Insurance==''||Answer==''||Location==''||NickName==''||PhoneNumber=='')
     {
       wx.showToast({
        title:' 请完成所有填写项',
         icon:'none'
       })
     }
     else {
       /**************************判断账号是否已经存在*****************************/
       wx.cloud.database().collection('user_account')
           .where({
             account: this.data.Account
           })
          .get()
          .then(res => {
             console.log(res.data)
             if (res.data.length > 0) {
               wx.showToast({
                 title:'该账号已注册',
                 icon:'none'
               })
               return;
             }
            else
              {
                console.log('可以注册')
                /************************** 判断两次密码输入是否一致*************************************/
                if (this.data.Password != this.data.Repassword)
                {
                  wx.showToast({
                    title:' 两次密码输入不一致',
                    icon:'none'
                  })
                  return;
                }
                else
                {
                  /*********************************判断是否为手机号**************************/

                  let phoneReg=/^1(3|4|5|6|7|8|9)\d{9}$/;
                  if(!phoneReg.test(PhoneNumber))
                  {
                    wx.showToast({
                      title: '手机号码格式不正确',
                      icon:'none'
                    })
                    return;
                  }
                  else
                  {
                    /*************************** 写入数据库*******************************/

                    wx.cloud.database().collection('user_account')
                        .add({
                          data:{
                            account:this.data.Account,
                            password:this.data.Password,
                            issue: this.data.Insurance,
                            answer:this.data.Answer,
                            location:this.data.Location,
                            avatar:'',
                            nickname:this.data.Nickname,
                            phonenumber:this.data.PhoneNumber,
                          }
                        })
                        .then(res=>{

                          console.log('写入成功')
                          wx.cloud.callFunction({
                            name:'collection',
                            data:{
                              account:this.data.Account
                            }

                          })
                              .then(res=>{
                                console.log('调用成功')
                                wx.showToast({
                                  title:' 注册成功',
                                  icon:'none'
                                })
                                setTimeout(
                                    function (){
                                      wx.reLaunch({
                                        url:'/pages/login/login'
                                      })
                                    },500);

                              })
                              .catch(err=>{
                                console.log('调用失败')
                              })


                        })
                        .catch(err=>{
                          console.log('err')
                        })

                  }
                }
             }
           })
           .catch(err => {
             console.log('err')
           })




      // /*************************** 写入数据库*******************************/
      //
      //  wx.cloud.database().collection('user_account')
      //      .add({
      //        data:{
      //          account:this.data.Account,
      //          password:this.data.Password,
      //          issue: this.data.Insurance,
      //          answer:this.data.Answer,
      //          location:this.data.Location,
      //          avatarL:'',
      //          nickname:this.data.Nickname,
      //          phonenumber:this.data.PhoneNumber,
      //        }
      //      })
      //      .then(res=>{
      //
      //        console.log('写入成功')
      //        wx.cloud.callFunction({
      //          name:'collection',
      //          data:{
      //            account:this.data.Account
      //          }
      //
      //        })
      //            .then(res=>{
      //              console.log('调用成功')
      //            })
      //            .catch(err=>{
      //              console.log('调用失败')
      //            })
      //
      //
      //      })
      //      .catch(err=>{
      //        console.log('err')
      //      })


  }










  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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