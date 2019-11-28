const express=require("express")
var router =express.Router();
var pool =require('../pool.js');


router.get('/userInfo',(req,res)=>{
    var uid=req.query.uid;
    console.log("userIf路由      的uid "+uid)
    var sql=`select sktid from id_sktid where uid=${uid}`;
    var sql2=`select nickname,uimg from show_user where uid=${uid}`;
    var data;
    pool.query(sql2,(err,result)=>{
        if(err)throw err;
        if(result.length>0){
            console.log("yj查询的对象信息")
            console.log(result)
            data=result;
        }
    })
    pool.query(sql,(err,result)=>{
        if(err)throw err;
        console.log(result)
        if(result.length>0){
            res.send({
                code:1,
                data:data,
                sktid:result[0]
            })
        }else{
            console.log("下面一行是userInfo的结果")
            console.log(result)
            res.send({
                data:data,
                code:0,
                msg:"not online"
            })
        }
    })
})
// router.get('idtoid',(req,res)=>{
//     var uid = req.session.uid;
//     console.log("idtoid req.session.uid: "+req.session.uid);
//     var sql=`select * from id_sktid where uid = ${uid}`;
//     pool.query(sql,(err,result)=>{
//         if(err){throw err};
//         if(result.length>0){
//             res.send({
//                 code:1,
//                 msg:"success find"
//             })
//         }else{
//             res.send({
//                 code:0,
//                 msg:"fail find"
//             })
//         }
//     })
// })
module.exports=router;