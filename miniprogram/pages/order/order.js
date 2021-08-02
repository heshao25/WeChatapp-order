// miniprogram/pages/order/order.js
let price=0;
let goodsnumber=0;
let Type = '荤菜';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TypeName:'',
    ShopName:'',
    ShopGoodsname:'canteen_one_goods',
    ShopNameList:[],
    ShopType:[],
    Food:[],
    Price:0,
    Goodsnumber:0,
    isClick:false,
    FoodList:[],
    isHide:false,
    Number:1,
    FoodListNumber:[],
    FoodNameStorage:[],
    ClearStorage:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {



    wx.setStorageSync('location','一食堂')

    wx.cloud.database().collection('foodshop_all').get()
        .then(res=>{

          this.setData({
            ShopNameList:res.data

          })

        })
        .catch(err=>{
          console.log("err")
        })

    /**************************默认加载为一食堂食物品种********************************/
  let startname='';
  wx.setStorageSync('startname',options.nameorder)
 // startname=options.nameorder;
    startname=wx.getStorageSync('startname')

    if(startname=='') {
      let ShopName = 'canteen_one_type';
      this.data.ShopGoodsname = 'canteen_one_goods';
      wx.cloud.database().collection(ShopName)
          .get()
          .then(res => {
            console.log(res.data.name)
            this.setData({
              ShopType: res.data,

            })
          })
          .catch(err => {
            console.log('err')
          })

    }
    /************************当从主页前往点餐进入点餐页面*********************************/
    else{
      wx.setStorageSync('location',startname)
      wx.cloud.database().collection('foodshop_all')
          .where({
            name:startname
          })
          .get()
          .then(res=>{
          this.setData({
            ShopGoodsname:res.data[0].goods
          })
          /*******************把餐厅菜品种类初始化************************/

            wx.cloud.database().collection(res.data[0].type).get()
                .then(res=>{
                  Type=res.data[0].name;
                  this.setData({
                    ShopType: res.data,

                  })

                })
                .catch(err=>{
                  console.log("err")
                })

          .catch(err=>{
            console.log('err')
          })
          console.log(Type)
            wx.cloud.database().collection(res.data[0].goods)
             .where({
                     type:Type
                  })
            .get()
            .then(res=>{
             this.setData({
              Food:res.data
              })
              })
                .catch(err=>{
                  console.log('err')
                })
          })
          .catch(err=>{
            console.log('err')
          })


    }
    /***********************************默认为一食堂荤菜开始****************************************/

      console.log(Type)
      wx.cloud.database().collection(this.data.ShopGoodsname)
          .where({
            type: Type
          })
          .get()
          .then(res => {
            this.setData({
              Food: res.data,
            })
          })
          .catch(err => {
            console.log('err')
          })

    this.setData({
      ShopName:wx.getStorageSync('location'),

    })



  },
GetType(event){

    let T='';
    let ShopName=event.currentTarget.dataset.type;


    this.data.ShopGoodsname=event.currentTarget.dataset.goods;
    console.log(ShopName)
    wx.cloud.database().collection(ShopName)
        .get()
        .then(res=>{
          console.log(res)
         T=res.data[0].name;
          wx.cloud.database().collection(this.data.ShopGoodsname)
              .where({
                type:T
              })
              .get()
              .then(res=>{

                this.setData({
                  Food:res.data,
                })
              })
              .catch(err=>{
                console.log('找不到商品表')
              })



          this.setData({
            ShopType:res.data,
          })

        })
        .catch(err=>{
          console.log('找不到type表')
        })
  /**************清除缓存以便防止结算多个食堂商品*保留账号缓存******************/

  wx.getStorageInfo()
      .then(res=>{
        console.log(res.keys)
        this.setData({
          ClearStorage:res.keys
        })
        for(let i=0;i<this.data.ClearStorage.length;i++)
        {
          if(this.data.ClearStorage[i]=='location'||this.data.ClearStorage[i]=='userInfo'||this.data.ClearStorage[i]=='startname')
          {
            console.log(' useful ')
          }
          else
          {
            wx.removeStorageSync(this.data.ClearStorage[i])
          }
        }

      })
      .catch(err=>{
        console.log('err')
      })



  //wx.clearStorageSync()




  wx.setStorageSync('location',event.currentTarget.dataset.name)
  this.setData({
    Price:0,
    FoodList:[],
    FoodListNumber:[],
    Goodsnumber:0,
  })
  this.setData({
    ShopName:wx.getStorageSync('location'),
    TypeName:''
  })
},
  GetFood(event){
    let Type=event.currentTarget.dataset.name;

    this.setData({
      Name:event.currentTarget.dataset.name,
      TypeName:event.currentTarget.dataset.name
    })
    wx.cloud.database().collection(this.data.ShopGoodsname)
        .where({
          type:Type
        })
        .get()
        .then(res=>{
          console.log(res.data)
          this.setData({
            Food:res.data,
          })
        })
        .catch(err=>{
          console.log('err')
        })
  },

  add(event){


    //let single=1;
    //goodsnumber++;
    console.log(goodsnumber)
   // price=price+Number(event.currentTarget.dataset.price);
    this.setData({
     // Price:price,
      Price:this.data.Price+Number(event.currentTarget.dataset.price),
      Goodsnumber:this.data.Goodsnumber+1,
    })

    console.log(event.currentTarget.dataset.name)
    let index=this.data.FoodList.indexOf(event.currentTarget.dataset.name)//若index为-1则表示没有重复元素，若index为0则表示有重复元素

    if(index==-1) {

      this.setData({
        FoodList: this.data.FoodList.concat(event.currentTarget.dataset.name)
      })


      /*****************************缓存**********************************/
      wx.setStorageSync(event.currentTarget.dataset.name, 1)

      /******************************************************************/
      let one=1;
      this.setData({
        FoodListNumber:this.data.FoodListNumber.concat(one)
      })
    }

    else {

      let findindex=0
      let word=event.currentTarget.dataset.name;
      if(this.data.FoodList.length>0) {
        for (let i = 0; i <= this.data.FoodList.length; i++)
        {
          if (this.data.FoodList[i] == word) {
            findindex = i;
            break;
          }
        }

       this.data.FoodListNumber[findindex]=this.data.FoodListNumber[findindex]+1;
        this.setData({
          FoodListNumber:this.data.FoodListNumber
        })

        wx.setStorageSync(word,this.data.FoodListNumber[findindex])//更新缓存信息
        console.log('number' + this.data.FoodListNumber[findindex])
      }

    }


  },
  showshopcar(){
  let isClick=!this.data.isClick
    this.setData({
      isClick
    })

  },
  clearshopcar(){
     for(var i=0;i<this.data.FoodList.length;i++)
       {
       this.data.FoodList.splice(i)
       }
     for(let j=0;j<this.data.FoodListNumber.length;i++)
     {
       this.data.FoodListNumber.splice(j)
     }
    //price=0;
    goodsnumber=0;
     this.setData({
    Price:0,
    Goodsnumber:0
    })
    wx.clearStorage();

  },
  extraadd(event){
    price=this.data.Price;
    console.log(price)
   // goodsnumber++;
    wx.cloud.database().collection(this.data.ShopGoodsname)
        .where({
          name:event.currentTarget.dataset.name
        })
        .get()
        .then(res=>{
         this.setData({
           Price:this.data.Price+res.data[0].price,
           Goodsnumber:this.data.Goodsnumber+1,
         })
        })
        .catch(err=>{
          console.log('err')
        })


    let findindex=0
    let word=event.currentTarget.dataset.name;
    if(this.data.FoodList.length>0) {
      for (let i = 0; i <= this.data.FoodList.length; i++) {
        if (this.data.FoodList[i] == word) {
          findindex = i;
          break;
        }
      }
      this.data.FoodListNumber[findindex]=this.data.FoodListNumber[findindex]+1;
      this.setData({
        FoodListNumber:this.data.FoodListNumber
      })
      wx.setStorageSync(word,this.data.FoodListNumber[findindex])//更新缓存信息
      console.log('number' + this.data.FoodListNumber[findindex])
    }

  },
  extrasub(event){
   // goodsnumber--;
    price=this.data.Price;
    console.log(price)
    wx.cloud.database().collection(this.data.ShopGoodsname)
        .where({
          name:event.currentTarget.dataset.name
        })
        .get()
        .then(res=>{
          this.setData({
            Price:this.data.Price-res.data[0].price,
           // Goodsnumber:goodsnumber
            Goodsnumber:this.data.Goodsnumber-1,
          })
        })
        .catch(err=>{
          console.log('err')
        })

    let findindex=0
    let word=event.currentTarget.dataset.name;
    if(this.data.FoodList.length>0) {
      for (let i = 0; i <= this.data.FoodList.length; i++) {
        if (this.data.FoodList[i] == word) {
          findindex = i;
          break;
        }
      }
      if(this.data.FoodListNumber[findindex]-1>0) {
        this.data.FoodListNumber[findindex] = this.data.FoodListNumber[findindex] - 1;
        this.setData({
          FoodListNumber:this.data.FoodListNumber
        })
        wx.setStorageSync(word,this.data.FoodListNumber[findindex])//更新缓存信息
      }
      //if(this.data.FoodListNumber[findindex]-1==0)
      else
      {
        wx.removeStorage({
          key: event.currentTarget.dataset.name,
        })

       this.data.FoodList.splice(findindex,1)
        this.data.FoodListNumber.splice(findindex,1)
        this.setData({
          FoodList:this.data.FoodList,
          FoodListNumber:this.data.FoodListNumber
        })

      }
      console.log('number' + this.data.FoodListNumber[findindex])

    }
  },
  tosettlement(){
    /*
    var re=/[^\u4e00-\u9fa5]/;
    wx.getStorageInfo()
        .then(res=>{
          this.setData({
            FoodNameStorage:res.keys,
          })

          if(this.data.FoodNameStorage.length>0) {
            for (let i = 0; i < this.data.FoodNameStorage.length; i++)
            {
              if (re.test(this.data.FoodNameStorage[i])) {
                this.data.FoodNameStorage.splice(i,1)
              }
              else{
                wx.cloud.database().collection()
              }

            }
          }

        })
        .catch(err=>{
          console.log('err')
        })


    var temp='糖醋里脊';

    if (re.test(temp)){
      console.log('不是中文')

    }
    else
    {
      console.log('是中文')

    }




*/
    wx.setStorageSync('Price',this.data.Price)//更新缓存价格信息
    wx.navigateTo({
      url:'/pages/settlement/settlement'
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
    let userInfo=wx.getStorageSync('userInfo')
    if(!userInfo)
    {
      wx.showToast({
        title:'未登录，请先登录',
        icon:'none'
      })
      setTimeout(
          function (){
        wx.reLaunch({
          url:'/pages/login/login'
        })
      },500);

    }

    else{
      wx.getStorageInfo()
          .then(res=>{
            console.log(res.keys)
            this.setData({
              ClearStorage:res.keys
            })
            for(let i=0;i<this.data.ClearStorage.length;i++)
            {
              if(this.data.ClearStorage[i]=='location'||this.data.ClearStorage[i]=='userInfo'||this.data.ClearStorage[i]=='startname')
              {
                console.log(' useful ')
              }
              else
              {
                wx.removeStorageSync(this.data.ClearStorage[i])
              }
            }

          })
          .catch(err=>{
            console.log('err')
          })
    }


  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      Price:0,
      FoodList:[],
      FoodListNumber:[],
      Goodsnumber:0,
    })

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