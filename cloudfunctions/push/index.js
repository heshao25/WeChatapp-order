// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数

exports.main = async (event, context) => {
  const db=cloud.database()
  const _=db.command
  const name=event.pushName;
  const account=event.pushAccount;
  const number=event.pushNumber;
  const price=event.pushPrice;
  const id=event.pushId;

  db.collection(account)
      .doc(id)
      .updata({
        data:{
          food:_.push({name,number,price})
        }
      })
      .then(res=>{
        console.log('push_success')
      })
      .catch(err=>{
        console.log('push_fail')
      })

  db.collection(event.pushAccount)
      .add({
        data:{
          food:'',
          account:event.pushAccount
        }
      })
      .then(res=>{
        console.error('创建新表成功')
      })
      .catch(err=>{
        console.log('创建新表失败')
      })




}