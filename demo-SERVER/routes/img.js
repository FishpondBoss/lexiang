var express=require("express");
var router=express.Router();
var pool=require("../pool");
var fs = require('fs'); 

//上传
router.post("/upload_pic",(req,res)=>{
  var obj=req.body;
  var newFile = new Date().getTime();
      newFile+=Math.floor(Math.random()*9999)
  var str="";
    var base64Data = obj.content.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(base64Data, 'base64');
    str+="material/Picture_show/"+newFile+".jpg|"

    fs.appendFile("./public/material/Picture_show/"+newFile+".jpg", dataBuffer, function(err) {
        if(err){
          res.send(err);
        }else{
          console.log(1)
        }
    });
    res.send({msg:str})
})
router.post("/upload",(req,res)=>{
  var obj=req.body;
  console.log(obj)
  var sql='INSERT INTO show_picture set uid=?,pdesc=?,psrc=?,upTime=?';
  pool.query(sql,[obj.uid,obj.msg,obj.content,obj.time],(err,result)=>{
    //console.log(result)
    if(err) throw err;
    if(result.affectedRows>0){
      res.send({code:2,msg:'注册成功'})
    }else{
      res.send({code:-3,msg:'注册失败，请重试'})
    }
  })
})

//验证登录
router.get("/isLogin",(req,res)=>{
  //1:获取session中uid
  var uid = req.session.uid;
  console.log("yl"+uid)
  //2:如果uid为空
  //3:请登录
  if(uid===""){
    res.send({code:-1,msg:"请登录"});
    return;
  }else{
    res.send({code:200,msg:uid});
    return;
  }
})
//查询图文
router.get("/find",(req,res)=>{
  var pno=req.query.pno;
  var ps=req.query.pageSize;
  var offset=(pno-1)*ps
  ps=parseInt(ps)
  var sql="select * from show_picture LEFT JOIN show_user ON show_picture.uid=show_user.uid ORDER BY uptime DESC LIMIT ?,?";
  pool.query(sql,[offset,ps],(err,result)=>{
    if(err)throw err;
    // res.send({code:1,msg:"查询成功"})
    res.send(result);
  })
})

//首次加载找zan 
router.get("/findzan",(req,res)=>{
  var uid=req.session.uid;
  uid=uid?uid:-1
  var pid=req.query.pid
    var sql="select * from show_p_zan where pid=? and uid=?";
    pool.query(sql,[pid,uid],(err,result)=>{
      if(err)throw err;
      if(result.length===0){
        res.send({code:400,msg:"没有赞"})
      }else{
        res.send({code:200,msg:"点赞成功"})
      }
    })
    
})
// 增加赞
router.get("/addzan",(req,res)=>{
  var pfavour=req.query.pfavour;
  var pid=req.query.pid;
  // var uid=req.session.uid;
  var isZan=req.query.isZan;
  var uid=2;
  if(!uid){
      res.send({code:2,msg:"请先登录"})
  }else{
      var sql="UPDATE show_picture SET pfavour=? WHERE pid=? AND uid=?";
      pool.query(sql,[pfavour,pid,uid],(err,result)=>{
        if(err)throw err;
        if(result.affectedRows>0){
          // console.log({code:200,msg:"点赞成功"})
        }else{
          // console.log({code:-1,msg:"点赞失败"})
        }
      });
    if(isZan){
      var sql="INSERT INTO show_p_zan (zid, uid, pid) VALUES (NULL, ?, ?);";
      pool.query(sql,[uid,pid]),(err,result)=>{
        if(err)throw err;
        if(result.affectedRows>0){
          res.send({code:200,msg:"插入数据成功"})
        }else{
          res.send({code:-1,msg:"插入数据失败"})
        }
      }
    }else{
        var sql="DELETE FROM show_p_zan WHERE WHERE pid=? AND uid=?";
        pool.query(sql,[pid,uid]),(err,result)=>{
          if(err)throw err;
          if(result.affectedRows>0){
            res.send({code:200,msg:"取消赞成功"})
          }else{
            res.send({code:-1,msg:"取消赞失败"})
          }
        }
    }

  }
}) 

//加载评论
router.get("/pinlun",(req,res)=>{
  var pid=req.query.pid;
 var uid=req.session.uid;
      var sql="select * from show_p_comment LEFT JOIN show_user ON show_p_comment.uid=show_user.uid where pid=?";
      pool.query(sql,[pid],(err,result)=>{
        if(err)throw err
        console.log(result)
        res.send(result)
      });
}) 

//增加评论
router.get("/addpinglun",(req,res)=>{
  var pid=req.query.pid;
  var cdetails=req.query.cdetails;
  var uptime=req.query.uptime;
  var uid=req.session.uid;

      var sql="INSERT INTO show_p_comment VALUES (NULL,?,?,?,?)";
      pool.query(sql,[uid,pid,cdetails,uptime],(err,result)=>{
        if(err)throw err
        if(result.affectedRows>0){
           var sql="UPDATE show_picture SET pinlunCount=pinlunCount+1 WHERE pid=?"
           pool.query(sql,[pid],(err,result)=>{
             if(err)throw err
             if(result.affectedRows>0){
                 res.send({code:1,msg:"评论成功"})
              }else{
                res.send({code:-1,msg:"评论失败"})
              }
           })
        }else{
          res.send({code:-1,msg:"评论失败"})
        }
       
      });
}) 

//关注
router.get("/follow",(req,res)=>{
  var arr2= "SELECT DISTINCT like_uid FROM user_like  WHERE  uid=1"; //关注我的人  
  pool.query(arr2,(err,result)=>{
  if(err) throw err;
    // console.log(result);
  var gz2="";
  for(var i=0;i<result.length;i++){
    gz2=gz2+result[i].like_uid+",";
  }
  gz2 = gz2.substring(0,gz2.length-1)
  // 获取我关注的人的uid
  var arr3 ="SELECT DISTINCT uid FROM user_like WHERE like_uid=1" //我关注的人 
  pool.query(arr3,(err,result)=>{
    if(err) throw err;
    var gz3="";
  for(var i=0;i<result.length;i++){
    gz3=gz3+result[i].uid+",";
  }
  gz3 = gz3.substring(0,gz3.length-1)
  gz4 =  gz2 +","+ gz3+",1";
    var sql1=`SELECT uid,uimg,nickname,selfdom FROM show_user WHERE uid not IN (${gz4})`;
    pool.query(sql1,(err,result)=>{
      if(err)throw err;
      res.send(result);
    })
    // res.send({code:1,msg:"查询成功"})
  }) 
})  
})


//加载关注的动态
router.get("/focus",(req,res)=>{
 var uid=req.session.uid;
 uid=2
   if(!uid){
      res.send({code:-2,msg:"未登录"})
   }else{
      //  var pno=req.query.pno;
      var sql="select * from (user_like LEFT JOIN show_picture ON show_picture.uid=user_like.uid) LEFT JOIN show_user ON show_user.uid=show_picture.uid WHERE user_like.like_uid=? AND show_picture.pid!='' ORDER BY uptime DESC";
      pool.query(sql,[uid],(err,result)=>{
          if(err)throw err;
          if(result.length==0){
            res.send({code:-1,msg:"还没有动态"})
          }else{
            res.send({code:200,msg:result});
          }
       })
    }
})



module.exports=router;