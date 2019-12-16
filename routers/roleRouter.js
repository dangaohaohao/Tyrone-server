const express = require('express');
const Role = require('../model/Role');
const router = new express.Router();

// 添加角色
router.post('/add', (req,res)=>{
  const {roleName} = req.body;
  Role.add(roleName)
  .then((roleInfo)=>{
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

// 根据角色名称来查找角色编号
router.get('/findRoleIdByName', (req,res)=>{
  const {roleName} = req.query;
  Role.findByName(roleName)
  .then((roleInfo) => {
    res.json({
      code: 0,
      message: 'ok',
      data: roleInfo,
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