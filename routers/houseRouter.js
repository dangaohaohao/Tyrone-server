const express = require('express');
const {mock} = require('mockjs');
const moment = require('moment');
const House = require('../model/House');
const router = new express.Router();

// 添加房屋
router.post('/add', async (req, res) => {
  console.log(req.body);
  let houseInfo = req.body;
  console.log(houseInfo);
  House.add(houseInfo)
    .then((houseInfor)=>{
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


// mock数据
// 获取今日房屋概述数据
// addToday: 今日新增 | houseSum: 房屋总数 | rented: 已出租 | notLet: 未出租
router.get('/getSummaryData', async (req, res) => {
  res.json({
    code: 0,
    message: 'ok',
    data: mock({
      'addToday|200-1000': 1,
      'houseSum|2000-10000': 1,
      'rented|1000-5000': 1,
      'notLet|500-1000': 1,
    })
  });
});

// mock 房屋出租情况
function mockRangeRentedData(begin, end){
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
      date: moment(date).format('YYYY-MM-DD'),
      "rentedToday|1000-30000": 0,
    }));
    date.setDate(date.getDate()+1);
  };
  return data;
}
// mock 房屋出租情况
router.get('/getRentedData', (req, res)=>{
  const {begin, end, count} = req.query;

  setTimeout(() => {

    if(count > 0){
      res.json(mock({
        code: 0,
        message: 'ok',
        ['data|'+count]: [
          {
            "rentedToday|1000-30000": 0,
          }
        ]})); 
    }
    else{
      res.json({
        code: 0,
        message: 'ok',
        data: mockRangeRentedData(begin, end)
      });
    }
  }, 1000);
  
   
})


module.exports = router;