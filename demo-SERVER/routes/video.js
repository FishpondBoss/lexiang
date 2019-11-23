var express=require("express");
var router=express.Router();
var pool=require("../pool");

//查询
router.get("/findAll",(req,res)=>{
  var pno=req.query.pno;
  var ps=req.query.pageSize;
  var offset=(pno-1)*ps
  ps=parseInt(ps)
  var sql="select * from show_video LEFT JOIN show_user ON show_video.uid=show_user.uid ORDER BY uptime DESC LIMIT ?,?;"
  pool.query(sql,[offset,ps],(err,result)=>{
    if(err)throw err;
    // console.log(result);
    // res.send({code:1,msg:"查询成功"})
    res.send(result);
  })
})
module.exports=router;