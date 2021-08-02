// miniprogram/pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    UserNickname:'未登录, 点我登录',
    Usernumebr:'',
    userInfo:{},
    Ison:'0',
    Avatar:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo=wx.getStorageSync('userInfo')
    if(userInfo)
    {
      this.setData({
        userInfo:JSON.parse(userInfo),
        Avatar:this.data.userInfo.avatar,
        Ison:1
      })
      console.log(this.data.userInfo.avatar)
    }
    else
    {
      this.setData({
        Avatar:'cloud://chain1-2gyuuzu498191781.6368-chain1-2gyuuzu498191781-1305135605/static/images/niming.png'
      })
    }

  },
  tologin() {
    if (this.data.Ison == 0) {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }
  },


  topersoninformation()
  {

    let userInfo=wx.getStorageSync('userInfo')
    if(!userInfo)
    {
      wx.showToast({
        title:'未登录，请先登录',
        icon:'none'
      })
    }
    else
    {
      wx.navigateTo({
        url:'/pages/person_information/person_information'
      })
    }
  },
  test(){
    wx.navigateTo({
      url:'/pages/myorders/myorders'
    })

  },
  logout(){

    wx.showModal({
      title: '确认退出登录',
      content: '退出登录后需要再次登录',
    })
        .then(res=>{
              wx.removeStorageSync('userInfo')
              this.setData({
                UserNickname: '未登录, 点我登录',
                Usernumebr: '',
                userInfo: {},
                Ison:0,
                Avatar:'cloud://chain1-2gyuuzu498191781.6368-chain1-2gyuuzu498191781-1305135605/static/images/niming.png'
              })
        })
                  .catch(err=>{
                  console.log('cancel')
        })

  },
  changeavatar(){
    if(this.data.Ison==1)
    {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
      })
          .then(res=> {
            const path = res.tempFilePaths[0];
            wx.cloud.uploadFile({
              cloudPath: 'avatar/'+this.data.userInfo.account+'_'+Math.floor(Math.random()*1000000), // 上传至云端的路径
              filePath: path, // 小程序临时文件路径
            })
                .then(res=>{
                  console.log('上传成功'+res.fileID)
                  let newpath=res.fileID;
                  wx.cloud.database().collection('user_account')
                      .doc(this.data.userInfo._id)
                      .update({
                        data:{
                          avatar:newpath
                        }
                      })
                      .then(res=>{
                        console.log('修改成功')
                      /**************************修改缓存***********************************/
                        wx.cloud.database().collection('user_account')
                            .where({
                              account:this.data.userInfo.account
                            })
                            .get()
                            .then(res=>{
                              wx.setStorageSync('userInfo', JSON.stringify(res.data[0]))
                              let userinfo=wx.getStorageSync('userInfo')
                              console.log('修改缓存成功')

                                this.setData({
                                  userInfo:JSON.parse(userinfo)
                                })
                              this.setData({
                                Avatar:this.data.userInfo.avatar
                              })


                            })
                            .catch(err=>{
                              console.log('修改缓存失败')
                            })

                        /*********************************************************/









                      })
                      .catch(err=>{
                        console.log('修改失败')
                      })




                })
                .catch(err=>{
                  console.log('上传失败')
                })


          })
          .catch(err=>{
              console.log('选取失败')
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
    this.setData({
      Avatar:this.data.userInfo.avatar
    })

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