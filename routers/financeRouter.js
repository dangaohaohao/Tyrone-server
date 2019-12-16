const express = require('express');
// const Role = require('../model/Role');
const { mock } = require("mockjs");
const moment = require('moment');
const router = new express.Router();



// mock 数据
// mock 平台流水数据
function mockRangeAccountsData(begin, end){
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
      'newCount|100-500': 0,
      'visitedCount|1000-10000': 0,
      'userCount|100000-10000000': 0
    }));
    date.setDate(date.getDate()+1);
  };
  return data;
}

router.get('/user', (req, res)=>{
  const {begin, end, count} = req.query;

  setTimeout(() => {


    if(count > 0){
      res.json(mock({
        code: 0,
        message: 'ok',
        ['data|'+count]: [
          {
              'newCount|100-500': 0,
              'visitedCount|1000-10000': 0,
              'userCount|100000-10000000': 0
          }
        ]})); 
    }
    else{
      res.json({
        code: 0,
        message: 'ok',
        data: mockRangeUserData(begin, end)
      });
    }
  }, 1000);
  
   
})


router.get("/stat", (req, res) => {
  const { begin, end, type, today } = req.query;

  setTimeout(() => {
    if (today) {
      res.json(
        mock({
          code: 0,
          message: "ok",
          data: {
            in: {
              "recharge|1000-10000": 0,
              "rent|1000-30000": 0,
              "service|1000-8000": 0,
              "behelf|1000-5000": 0
            },
            out: {
              "deposit|1000-10000": 0,
              "service|1000-8000": 0,
              "behelf|1000-5000": 0
            }
          }
        })
      );
    }
  }, 1000);
});


module.exports = router;