const pool=require('../pool.js');
const express = require('express');
const session=require('express-session')
var router=express.Router();
//主页获取uid是否已经登录
router.get('/v1/getl',(req,res)=>{
  var uid=req.session.uid;
  if(!uid){
    res.send({code:-1,msg:"请登录"});
    return;
   }
   var sql="select * from show_user where uid=?";
   pool.query(sql,[uid],(err,result)=>{
     if(err) throw err;
     if(result.length==0){
      res.send({code:-4,msg:'该用户尚未注册，请先注册'})
    }else{
     
      res.send({code:1,msg:'登录成功'})
    }
   })
})
// 登录
router.get('/v1/login',(req,res)=>{
  console.log(111);
  var $uname=req.query.uname;
  var $upwd=req.query.upwd;
  var sql='select uid from show_user where uname=? and upwd=?';
  pool.query(sql,[$uname,$upwd],(err,result)=>{
    console.log(2222);
    if(err) throw err;
    if(result.length==0){
      res.send({code:-3,msg:'该用户尚未注册，请先注册'})
    }else{
      // console.log(result);
      var uid=result[0].uid;
      console.log(uid)
      req.session.uid=uid;
       console.log(req.session.uid)
      res.send({code:1,msg:'登录成功',uid:req.session.uid})
    }
  })
})

//注册
router.post('/v1/reg',(req,res)=>{
  // console.log(req.body)
  var uname=req.body.uname;
  // console.log(uname)
  var sql1='select uid from show_user where uname=?'
  pool.query(sql1,[uname],(err,result)=>{
    if(err) console.log( err);
    if(result.length>0){
      res.send({code:-2,msg:'该用户已注册，请登录'})
    }else{
        var  upwd=req.body.upwd;
      
        var sql2='insert into show_user set uname=?,upwd=?';
        pool.query(sql2,[uname,upwd],(err,result)=>{
            if(err) throw err;
            if(result.affectedRows>0){
              res.send({code:2,msg:'注册成功'})
            }else{
              res.send({code:-3,msg:'注册失败，请重试'})
            }
        })
    }
  })
})
//个人资料获取内容
router.get('/v1/uploading',(req,res)=>{
  var uid=req.session.uid;
  if(!uid){
    res.send({code:-1,msg:"请登录"});
    return;
   }
  var sql="select * from show_user where uid=?";
  pool.query(sql,[uid],(err,result)=>{
    if(err) throw err;
    if(result.length>0){
      res.send({code:200,msg:result})
    }else{
      res.send({code:400,msg:"请先登录"})
    }
  })
})
//修改个人资料
router.put('/v1/intr',(req,res)=>{
  var uid=req.session.uid;
  if(!uid){
    res.send({code:-1,msg:"未登录请登录后设置"})
  }
  var obj=req.body;
  var sql="UPDATE show_user SET ? WHERE 	uid=?";
  pool.query(sql,[obj,uid],(err,result)=>{
    if(err) throw err;
   if(result.affectedRows>0){
     res.send({code:200,msg:'修改成功'})
   }else{
     res.send({code:400,msg:"修改失败,请重试"})
   }

  })
})
//修改密码/密码找回
router.put('/v1/fupwd',(req,res)=>{
  var obj=req.body;
  var sql1='SELECT uid FROM show_user WHERE uname=?'
  pool.query(sql1,[obj.uname],(err,result)=>{
    if(err){throw err}
    // console.log(result);
    if(result.length==0){
      res.send({code:2,msg:"该手机号未注册，请注册"})
    }else{
      var sql2="update show_user set upwd=md5(?) where uname=?";
      pool.query(sql2,[obj.upwd,obj.uname],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
          res.send({code:200,msg:"修改成功"})
        }else{
          res.send({code:400,msg:"修改失败"})
        }
      })
    }
    
  })
});
//个人主页获取内容
router.get("/v1/content",(req,res)=>{
  var uid = req.session.uid;
  // console.log(uid)
  if(!uid){
   res.send({code:-1,msg:"请登录"});
   return;
  }
  var sql="SELECT * FROM show_user WHERE uid=?";
  pool.query(sql,[uid],(err,result)=>{
    if(err) throw err;
    res.send({code:200,msg:result});
  })
})
//个人主页评论
router.get("/v1/comment",(req,res)=>{
  var uid=req.session.uid;
  var sql="select pc.cdetails,user.nickname,pc.upTime,p.pdesc,p.pfavour from (show_p_comment AS pc LEFT JOIN show_picture AS p ON pc.pid=p.pid) LEFT JOIN show_user AS user ON p.uid=user.uid  WHERE pc.uid=?"
  pool.query(sql,[uid],(err,result)=>{
    if(err) throw err;
    if(result.length>0){
      res.send({code:200,msg:result})
    }else{
      res.send({code:400,msg:"查询失败"})
    }
  })
})
router.get("/v1/myself",(req,res)=>{
  var uid=req.session.uid;
 var sql="select * from show_picture where uid=?";
 pool.query(sql,[uid],(err,result)=>{
   if(err) throw err;
  //  console.log("hahhahaha")
    if(result.length>0){
      res.send({code:200,msg:result});
    }else{
      res.send({code:400,msg:"空空如也"})
    }
 })
})
//别人
router.get("/v1/yyourself",(req,res)=>{
  var uid=req.query.uid;
  console.log(uid+"b");
 var sql="select * from show_picture where uid=?";
 pool.query(sql,[uid],(err,result)=>{
   if(err) throw err;
   console.log("hahhahaha")
   console.log(result)

    if(result.length>0){
      console.log(133)
      res.send({code:200,msg:result});
    }else{
      res.send({code:400,msg:"空空如也"})
    }
 })
})
//别人主页内容
router.get("/v1/other",(req,res)=>{
  var uid=req.query.uid;
  console.log(uid+"a")
  var sql="select * from show_user where uid=?";
  pool.query(sql,[uid],(err,result)=>{
    if(err) throw err;
    console.log(456)
     res.send({code:200,msg:result})
     console.log(result);
  });
})
//别人主页获取内容
router.get("/v1/comother",(req,res)=>{
  var uid=req.query.uid;
  var sql="select pc.cdetails,user.nickname,pc.upTime,p.pdesc,p.pfavour from (show_p_comment AS pc LEFT JOIN show_picture AS p ON pc.pid=p.pid) LEFT JOIN show_user AS user ON p.uid=user.uid  WHERE pc.uid=?"
  pool.query(sql,[uid],(err,result)=>{
    if(err) throw err;
    if(result.length>0){
      console.log(789)
      console.log(result);
      res.send({code:200,msg:result})
    }else{
      res.send({code:400,msg:"查询失败"})
    }
  })
})
//退出登录
router.get("/v1/quit",(req,res)=>{
  var uid=req.session.uid;
  uid="";
  // console.log(uid+"lalala")
  res.send({code:400,msg:"退出成功"})
})
module.exports=router;