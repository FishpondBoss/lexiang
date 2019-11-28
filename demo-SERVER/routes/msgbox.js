const express=require("express")
var router =express.Router();
var pool =require('../pool.js');




//获取我的粉丝
router.get('/myfans',(req,res)=>{
    var uid = req.session.uid;
    // console.log("req.session.uid: "+req.session.uid)
    // var uid=1;
    if(!uid){
        res.send({code:-1,msg:"请登录"});
        return;
    }
    var sql='SELECT like_uid,like_both FROM user_like WHERE uid=?'
    pool.query(sql,[uid],(err,result)=>{
        if(err){throw err}
        if(result.length==0){
            var data=[];
            res.send({
                code:1,   //查询编码
                msg:"success",//原因
                rows:data, //当前页内容
            });
        }else if(result.length>0){
            // console.log(result);
            var like=[];
            var str="";
            // console.log()
            for(var i=0;i<result.length;i++){
                str=str+","+result[i].like_uid;
                like[i]={like_both:result[i].like_both};
            }
            str=str.slice(1);
            // console.log("str:"+str)
            // console.log(like) 
            var sql1=`SELECT nickname,selfdom,uimg,uid FROM show_user WHERE uid in (${str})`;
            pool.query(sql1,(err,result)=>{
                if(err){throw err}
                var data=result;
                for(var i=0;i<data.length;i++){
                    data[i].like_both=like[i].like_both;
                }
                res.send({
                    code:1,   //查询编码
                    msg:"success",//原因
                    rows:data//当前页内容
                })
            })
        }else{
            // console.log(result)
            res.send({code:-1,msg:"nonono"})
        }
  })
});
//去关注别人
router.get('/tofan',(req,res)=>{
    var uid = req.session.uid;
    // var uid=1;
    if(!uid){
        res.send({code:-1,msg:"请登录"});
        return;
    }
    //目标人物的uid
    var targetId=req.query.fansid;
    // var obj={uid:uid,like_id}

    //查找目标人物是否关注我
    var sql='select ulid FROM user_like WHERE uid=? AND like_uid=?';
    pool.query(sql,[uid,targetId],(err,result)=>{
        if(err){throw err}
        //目标人物关注了我
        if(result.length>0){
            //插入我关注目标人物且like_bth=1
            // var sql1=`insert into user_like set (uid,like_uid,like_both) values (${targetId},${uid},1)`;
            var sql1=`insert into user_like values ("null",${targetId},${uid},1)`;
            pool.query(sql1,(err,result)=>{
                if(err){throw err}
                if(result.affectedRows>0){
                    console.log(`插入我关注目标人物且like_bth=1`)
                }else{
                    return;
                }
            })
            //修改目标人物关注我的那条数据的like_bth=1
            var sql2=`update user_like set like_both=1 where ulid = ${result[0].ulid}`;
            pool.query(sql2,(err,result)=>{
                if(err){throw err}
                if(result.affectedRows>0){
                    console.log(`修改目标人物关注我的那条数据的like_bth=1`)
                    res.send({
                        code:1,   //查询编码
                        msg:"success",//原因
                        // rows:data//当前页内容
                    });
                }
            })
            
        }else{
            //插入我关注目标人物且like_bth=0
            var sql1=`insert into user_like values ("null",${targetId},${uid},0)`;
            pool.query(sql1,(err,result)=>{
                if(err){throw err}
                if(result.affectedRows>0){
                    console.log(`插入我关注目标人物且like_bth=0`)
                    res.send({
                        code:1,   //查询编码
                        msg:"success",//原因
                        // rows:data//当前页内容
                    });
                }
            })
        }
    })
    
})
//取消关注别人
router.get('/nofan',(req,res)=>{
    var uid = req.session.uid;
    // var uid=1;
    if(!uid){
        res.send({code:-1,msg:"请登录"});
        return;
    }
    //目标人物的uid
    var targetId=req.query.fansid;
    //查找目标人物是否关注我
    var sql='select ulid FROM user_like WHERE uid=? AND like_uid=?';
    pool.query(sql,[uid,targetId],(err,result)=>{
        if(err){throw err}
        //删除我关注他的记录
        var sql1=`delete from user_like where uid = ${targetId} and like_uid = ${uid}`;
        pool.query(sql1,(err,result)=>{
            if(err){throw err}
            if(result.affectedRows>0){
                console.log(`删除我关注他的记录成功`)
            }else{
                return;
            }
        })
        //目标人物关注了我
        if(result.length>0){           
            var sql2=`update user_like set like_both=0 where ulid = ${result[0].ulid}`;
            pool.query(sql2,(err,result)=>{
                if(err){throw err}
                if(result.affectedRows>0){
                    console.log(`他关注我修改成单向关注`)
                    res.send({
                        code:1,   //查询编码
                        msg:"success",//原因
                        // rows:data//当前页内容
                    });
                }
            })
        } else{
            res.send({
                code:1,   //查询编码
                msg:"success",
            })
        }
    })
})
//获取我的消息列表
//获取我的评论
router.get('/getcomment',(req,res)=>{
    var uid = req.session.uid;
    console.log("req.session.uid: "+req.session.uid)
    // var uid=1;
    if(!uid){
        res.send({code:-1,msg:"请登录"});
        // return;
    }
    var sql=`select c.pid ,c.cdetails,p.pdesc,u.uimg , u.nickname from show_p_comment c,show_picture p , show_user u where  p.pid=c.pid and  p.pid=${uid} and  u.uid=c.uid`; 
    pool.query(sql,(err,result)=>{    
        if(err){throw err}
        if(result.length>0){
            res.send({
                code:1,
                data:result    
            })
        }else{
            res.send({
                code:400
            })
        }
    })
})

// // 注册
// router.get('/reg',(req,res)=>{
//   var obj=req.query;
//   var sql1='SELECT uid FROM hll_reg WHERE phone=?'
//   pool.query(sql1,[obj.phone],(err,result)=>{
//     if(err){throw err}

//     if(result.length>0){
//         res.send({code:-2,msg:"该手机号已经注册，请登录"})
//     }else{
//       var sql2='INSERT INTO hll_reg SET ?'; 
//       pool.query(sql2,[obj],(err,result)=>{
//         if(err){throw err}
//         console.log(result)
//          res.send({code:200,msg:"注册成功"})
//       })
//     }
//   })
// });
// //登录
// router.get('/login',(req,res)=>{
//   var phone=req.query.phone;
//   var upwd=req.query.upwd;
//   var sql='SELECT uid FROM hll_reg where phone=? AND upwd=?';
//   pool.query(sql,[phone,upwd],(err,result)=>{
//     if(err){throw err}
//     console.log(result)
//     if(result.length>0){
//     res.send({code:1,msg:"登录成功"})
//     }else{
//       res.send({code:-1,msg:"登录失败"})
//     }
//   })
// })
// //修改密码/密码找回
// router.get('/fupwd',(req,res)=>{
//   var obj=req.query;
//   var sql1='SELECT uid FROM hll_reg WHERE phone=?'
//   pool.query(sql1,[obj.phone],(err,result)=>{
//     if(err){throw err}
//       console.log(result)
//     if(result.length==0){
//         res.send({code:2,msg:"该手机号未注册，请注册"})
//     }
//   })
// });
module.exports=router;