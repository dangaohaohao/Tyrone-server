
const express = require('express');
const mongoose = require('mongoose');

const server = express();

server.use(express.urlencoded({
  urlencoded: false
}));
server.use(express.json());

// 设置跨域访问
server.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});


// 用户
server.use('/api/user', require('./routers/userRouter'));
// 角色
server.use('/api/role', require('./routers/roleRouter'));
// 订单
server.use('/api/order', require('./routers/orderRouter'));
// 财富
server.use('/api/finance', require('./routers/financeRouter'));
// 房屋
server.use('/api/house', require('./routers/houseRouter'));
// 数据
server.use('/api/data', require('./routers/dataRouter'));


// 连接数据库 启动服务
mongoose.connect('mongodb://localhost:27017/Tyrone', {
  useNewUrlParser: true
}, (error) => {
  if(error) {
    console.log('连接数据库失败');
    console.log(error);
  }else {
    console.log('连接数据库成功');
    
    server.listen('3002', (err) => {
      if(err) {
        console.log('启动服务器失败');
        console.log(err);
      }else {
        console.log('启动服务器成功: http://localhost:3002');
      }
    });
  }
});
