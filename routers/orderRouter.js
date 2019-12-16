const express = require('express');
const Order = require('../model/Order');
const router = new express.Router();

// 添加订单
router.post('/add', (req,res)=>{
  const {orderInfo} = req.body;
  Order.add(orderInfo)
  .then((orderInfo)=>{
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


module.exports = router;