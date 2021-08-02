//云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
//
  exports.main = async (event, context) => {
    const db = cloud.database()
    db.createCollection(event.account)
        .then(res=>{
          console.log('创建成功')
        })
        .catch(err=>{
          console.log('创建失败')
        })
    
  }

