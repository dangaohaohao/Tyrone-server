const express = require('express');
const User = require('../model/User');
const Role = require('../model/Role');
const router = new express.Router();

// 注册  0:管理员 / 1:Agent / 2:房东 / 3: 房客
router.post('/register', (req,res)=>{
  let userInfo = req.body;
  let roleType = userInfo.roleType;
  let roleId = 0;

  // 查找角色 ID
  (async function(roleType) {
    switch(roleType) {
      case '0':
        roleId = await Role.findByName('管理员');
        userInfo = {...userInfo, role: roleId}
        break;
      case '1':
        roleId = await Role.findByName('Agent');
        userInfo = {...userInfo, role: roleId}
        break;
      case '2':
        roleId = await Role.findByName('房东');
        userInfo = {...userInfo, role: roleId}
        break;
      case '3':
        roleId = await Role.findByName('房客');
        userInfo = {...userInfo, role: roleId}
        break;
    }
  })(roleType);
  

  User.add(userInfo)
  .then((userInfor)=>{
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

// 登录
router.post('/login', (req, res)=>{
  const {userName, password} = req.body;

  User.findByNameAndPsd(userName, password)
  .then(result=>{
    if(result){
      res.json({
        code: 0,
        message: '登录成功',
        data: result
      });
    }else{
      res.json({
        code: -1, 
        message: '该账号或密码不正确',
        data: null
      });
    }
  })
  .catch(error=>{
    res.json({
      code: -2, 
      message: error.message,
      data: null
    });
  })
});

//退出登录
router.get('/logout', (req, res)=>{
  res.json({
    code: 0,
    message: 'ok',
    data: null
  });
});

// 根据角色 id 查找角色用户 分页功能
router.get('/findUserByRoleId', async (req, res) => {
  let {roleId, skip, count} = req.query;
  let list = await User.findUserByRoleId(roleId, skip, count);
  res.json({
    code: 0,
    message: 'ok',
    data: list
  })
});

// 根据用户 id 来查找用户
router.get('/findUserById', async (req, res) => {
  let {userId} = req.query;
  let userInfo = await User.findUserById(userId);
  res.json({
    code: 0,
    message: 'ok',
    data: userInfo
  })
});

// 根据特定条件查询用户 用户来源(0/1/2) / 实名认证情况(0/1/2/3) / 银行卡绑定情况(0/1) / 用户状态(0/1) / 最近登录时间 
router.get('/findUserByRequireMent', async (req, res) => {
  let {requireMent} = req.query;
  let userInfo = await User.findUserByRequireMent(requireMent);
  res.json({
    code: 0,
    message: 'ok',
    data: userInfo
  })
});


module.exports = router;
