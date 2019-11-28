// let Idtoid = require('../models/Idtoid')
// import axios from 'axios'
// var pool=require("../pool");
var pool=require("../pool");
module.exports = class socketHandler {
    static async saveUserSocketId(uid, socketId) {
        //保存用户的id和socketid
        console.log("saveUserSocketId")
        var sql=`select * from id_sktid where uid = ${uid}`;
        await pool.query(sql,(err,result)=>{
            if(err){throw err};
            if(result.length>0){
                var sql=`update id_sktid set sktid="${socketId}" where uid=${uid}`;
                pool.query(sql,(err,result)=>{
                    if(err){throw err};
                    if(result.affectedRows>0){
                        console.log("修改成功");
                    } 
                })
            }else{
                var sql=`insert into id_sktid values (${uid},'${socketId}')`;
                // var obj={uid:,sktid:};
                pool.query(sql,(err,result)=>{
                 if(err){throw err};
                 if(result.affectedRows>0){
                     console.log("插入成功");
                 }
                })
            }

        })
       
    //     .then((res) => {
    //         if (res.code) {
    //            var sql="insert into id_sktid values ?";
    //            var obj={uid:uid,sktid:socketId};
    //            pool.query(sql,[obj],(err,result)=>{
    //             if(err){throw err};
    //             if(result.affectedRows>0){
    //                 console.log("插入成功");
    //             }
    //            })
    //         } else {
    //             var sql=`update id_sktid set sktid=${socketId}where uid=${uid}`;
    //         //    var obj={uid:uid,sktid:socketId};
    //             pool.query(sql,(err,result)=>{
    //                 if(err){throw err};
    //                 if(result.affectedRows>0){
    //                     console.log("修改成功");
    //                 } 
    //             })
    //         }
    // })
    }
};