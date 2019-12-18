const express = require('express');
const { mock } = require("mockjs");
const moment = require('moment');
const router = new express.Router();



// mock 数据
// mock 订单量变化趋势 
function mockRangeOrderData(begin, end){
  let beginArr = begin.split('-');
  beginArr[1] = beginArr[1]-1;
  var a = moment(beginArr);

  let endArr = end.split('-');
  endArr[1] = endArr[1]-1;
  var b = moment(endArr);
  var result = b.diff(a, 'days');

  let data = [];
  let date = new Date(begin);
  while(data.length <= result){
    data.push(mock({
      date: moment(date).format('MM-DD'),
      "orderData|10000-40000": 0,
    }));
    date.setDate(date.getDate()+1);
  };
  return data;
}
// mock 订单量变化趋势 
router.get('/getOrderData', (req, res)=>{
  const {begin, end, count} = req.query;
  if(count > 0){
    res.json(mock({
      code: 0,
      message: 'ok',
      ['data|'+count]: [
        {
          "orderData|10000-40000": 0,
        }
      ]})); 
  }
  else{
    res.json({
      code: 0,
      message: 'ok',
      data: mockRangeOrderData(begin, end)
    });
  }
})

// mock App下载量/Web UV趋势 
function mockRangeDownLoadData(begin, end){
  let beginArr = begin.split('-');
  beginArr[1] = beginArr[1]-1;
  var a = moment(beginArr);

  let endArr = end.split('-');
  endArr[1] = endArr[1]-1;
  var b = moment(endArr);
  var result = b.diff(a, 'days');

  let data = [];
  let date = new Date(begin);
  while(data.length <= result){
    data.push(mock({
      date: moment(date).format('MM-DD'),
      "appDownLoad|1000-4000": 0,
      "WebUV|100-2000": 0,
    }));
    date.setDate(date.getDate()+1);
  };
  return data;
}
// mock App下载量/Web UV趋势 
router.get('/getDownLoadData', (req, res)=>{
  const {begin, end, count} = req.query;
  if(count > 0){
    res.json(mock({
      code: 0,
      message: 'ok',
      ['data|'+count]: [
        {
          "appDownLoad|1000-4000": 0,
          "WebUV|100-2000": 0,
        }
      ]})); 
  }
  else{
    res.json({
      code: 0,
      message: 'ok',
      data: mockRangeDownLoadData(begin, end)
    });
  }
})

// mock 订单日交易额数据情况
function mockRangeTradingData(begin, end){
  let beginArr = begin.split('-');
  beginArr[1] = beginArr[1]-1;
  var a = moment(beginArr);

  let endArr = end.split('-');
  endArr[1] = endArr[1]-1;
  var b = moment(endArr);
  var result = b.diff(a, 'days');

  let data = [];
  let date = new Date(begin);
  while(data.length <= result){
    data.push(mock({
      date: moment(date).format('MM-DD'),
      "orderData|100-1000": 0,
      "tradingData|10000-80000": 0,
    }));
    date.setDate(date.getDate()+1);
  };
  return data;
}
// mock 订单日交易额数据情况 
router.get('/getTradingData', (req, res)=>{
  const {begin, end, count} = req.query;
  if(count > 0){
    res.json(mock({
      code: 0,
      message: 'ok',
      ['data|'+count]: [
        {
          "orderData|100-1000": 0,
          "tradingData|10000-80000": 0,
        }
      ]})); 
  }
  else{
    res.json({
      code: 0,
      message: 'ok',
      data: mockRangeTradingData(begin, end)
    });
  }
})

// mock 今日房屋动态
router.get('/getToadyData', (req, res) => {
  res.json({
    code: 0,
    message: 'ok',
    data: mock({
      'houseSum|2000-10000': 1,
      'addToday|200-1000': 1,
      'rented|1000-5000': 1,
      'notLet|500-1000': 1,
    })
  });
});

// mock 应用商城下载分布
router.get('/getApplicationData', (req, res) => {
  res.json({
    code: 0,
    message: 'ok',
    data: mock({
      'appStore|20000-40000': 1,
      'pea|20000-40000': 1,
      '360|20000-40000': 1,
      'application|20000-40000': 1,
      'android|20000-40000': 1,
    })
  });
});



module.exports = router;
