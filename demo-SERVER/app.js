//使用express构建web服务器 --11:25
const express = require('express');
const session = require("express-session");
const bodyParser = require('body-parser');
const cors=require("cors");
const mysql= require("mysql")

//yj T
let socketio = require('socket.io');
let socketHandler = require('./socket');

/*引入路由模块*/
var userRouter=require('./routes/user.js')
const imgRouter=require('./routes/img.js')
var msgboxRouter=require('./routes/msgbox.js')
var chatRouter=require('./routes/chat.js')
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
const http = require("http").createServer(app);
const io = require("socket.io")(http);
http.listen(5050);
io.on('connection', socket => {
  console.log("一个socket");
  // console.log(socket)
  const socketId = socket.id;
  socket.on('login', (uid) => {
    console.log("服务器端接收的uid "+uid)
    socketHandler.saveUserSocketId(uid, socketId)
  });
  socket.on('chat',(data) => {  
    console.log("发送的内容：")
    console.log(data)
    console.log(data.toId)
        io.to(data.toId).emit('receiveMsg',data)
  }) 
})
//托管静态资源到public目录下
app.use(express.static('public'));
/*使用路由器来管理路由*/
app.use('/user',userRouter)
app.use('/img',imgRouter);
app.use('/msgbox',msgboxRouter);
app.use('/chat',chatRouter);
