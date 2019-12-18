const express = require('express');
const Order = require('../model/Order');
const { mock } = require("mockjs");
const router = new express.Router();

// 添加订单
router.post('/add', (req,res)=>{
  const orderInfo = req.body;
  Order.add(orderInfo)
  .then((orderInfor)=>{
    res.json({
      code: 0,
      message: 'ok',
      data: null,
    })
  })
  .catch((error)=>{
    res.json({
      code: -1,
      message: error.message,
      data: null,
    })
  })
});

// 修改房屋
router.post('/modify', async (req, res) => {
  let { orderId } = req.body;
  let orderInfo = req.body;
  Order.modify(orderId, orderInfo)
  .then(orderInfor=>{
    res.json({
      code: 0, 
      message: 'ok',
      data: null
    });
  })
  .catch(error=>{
    res.json({
      code: -1, 
      message: error.message,
      data: null
    });
  })
});

// 服务订单概述
router.get('/getSummaryData', async (req, res) => {
  res.json({
    code: 0,
    message: 'ok',
    data: mock({
      "addOrder|100-1000": 0,
      "orderSum|10000-30000": 0,
    })
  });
});

// 根据订单编号搜索订单
router.get('/findOrderById', async (req, res) => {
  let {orderId} = req.query;
  let orderInfo = await Order.findOrderById(orderId);
  res.json({
    code: 0,
    message: 'ok',
    data: orderInfo
  })
});

// 根据房屋编号搜索订单
router.get('/findOrderByhouseId', async (req, res) => {
  let {houseId, skip, count} = req.query;
  let orderInfo = await Order.findOrderByhouseId(houseId, skip, count);
  res.json({
    code: 0,
    message: 'ok',
    data: orderInfo
  })
});

// 根据房屋编号搜索订单
router.get('/findOrderByMultiParams', async (req, res) => {
  let {orderType, payWay, orderStatus, skip, count} = req.query;
  let orderInfo = await Order.findOrderByMultiParams(orderType, payWay, orderStatus, skip, count);
  res.json({
    code: 0,
    message: 'ok',
    data: orderInfo
  })
});




module.exports = router;