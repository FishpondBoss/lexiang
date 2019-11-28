//使用express构建web服务器 --11:25
const express = require('express');
const session = require("express-session");
const bodyParser = require('body-parser');
const cors=require("cors");
const mysql= require("mysql")
/*引入路由模块*/
var userRouter=require('./routes/user.js')
const imgRouter=require('./routes/img.js')
var msgboxRouter=require('./routes/msgbox.js')
var app = express();

//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));
app.use(bodyParser.json({limit:'50mb'}));
app.use(cors({
  origin:['http://localhost:8080',"http://127.0.0.1:8080"],
  credentials:true
}))
app.use(session({
  secret:'128位安全字符串',
  cookie:{maxAge:60*1000*30},//过期时间ms
  resave:true,
  saveUninitialized:true
}));//将服务器的session，放在req.session中
app.listen(5050);
//托管静态资源到public目录下
app.use(express.static('public'));
/*使用路由器来管理路由*/
app.use('/user',userRouter)
app.use('/img',imgRouter);
app.use('/msgbox',msgboxRouter);

