const express = require('express');
const User = require('../model/User');
const Role = require('../model/Role');
const {mock} = require('mockjs');
const nodeExcel = require('excel-export');
const router = new express.Router();

// 根据角色类型来查找角色信息
async function getRoleIdByRoleType(roleType) {
  switch(roleType) {
    case '0':
      roleInfo = await Role.findByName('管理员');
      return roleInfo;
      break;
    case '1':
      roleInfo = await Role.findByName('Agent');
      return roleInfo;
      break;
    case '2':
      roleInfo = await Role.findByName('房东');
      return roleInfo;
      break;
    case '3':
      roleInfo = await Role.findByName('房客');
      return roleInfo;
      break;
  }
}


// 注册  0:管理员 / 1:Agent / 2:房东 / 3: 房客
router.post('/register', (req,res)=>{
  let userInfo = req.body;
  let roleType = userInfo.roleType;
  let roleId = 0;

  // 查找角色 ID 注册
  (async function(roleType) {
    switch(roleType) {
      case '0':
        roleId = await Role.findByName('管理员');
        userInfo = {...userInfo, roleId: roleId, roleType: roleType}
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
        break;
      case '1':
        roleId = await Role.findByName('Agent');
        userInfo = {...userInfo, roleId: roleId, roleType: roleType}
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
        break;
      case '2':
        roleId = await Role.findByName('房东');
        userInfo = {...userInfo, roleId: roleId, roleType: roleType}
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
        break;
      case '3':
        roleId = await Role.findByName('房客');
        userInfo = {...userInfo, roleId: roleId, roleType: roleType}
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
        break;
    }
  })(roleType);

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


// 根据角色 类型 查找角色用户 分页功能  0:管理员 / 1:Agent / 2:房东 / 3:房客
router.get('/findUserByRoleType', async (req, res) => {
  let {roleType, skip, count} = req.query;
  let list = null;
  // 根据 roleType 请求拿到 roleId
  let roleInfo = await getRoleIdByRoleType(roleType);
  list = await User.findUserByRoleId(roleInfo._id, skip, count);
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


// 根据用户 姓名 来查找用户
router.get('/findUserByName', async (req, res) => {
  let {userName, skip, count, roleType} = req.query;
  let roleInfo = await getRoleIdByRoleType(roleType);
  let userInfo = await User.findUserByName(userName, roleInfo._id, skip, count);
  res.json({
    code: 0,
    message: 'ok',
    data: userInfo
  })
});


// 导出excel  还没有写好
// 根据特定条件查询用户导出excel
router.get('/excel', async (req, res) => {

  let requireMent = req.query;
  let userInfo = await User.findUserByRequireMent(requireMent);

  let conf ={};
  conf.stylesXmlFile = "styles.xml";
  conf.name = "房东管理";
  conf.cols = [
    {
      caption: '房东编号',
      type: 'string'
    },
    {
      caption: '房东姓名',
      type: 'string'
    },
    {
      caption: '手机号',
      type: 'string'
    },
    {
      caption: '邮箱',
      type: 'string'
    },
    {
      caption: '账面余额',
      type: 'number'
    },
    {
      caption: '房屋数量',
      type: 'number'
    },
    {
      caption: '实名认证情况',
      type: 'string'
    },
    {
      caption: '银行卡绑定情况',
      type: 'string'
    },
    {
      caption: '默认交易银行卡号',
      type: 'string'
    },
    {
      caption: '房东来源',
      type: 'string'
    },
    {
      caption: '注册时间',
      type: 'string'
    },
    {
      caption: '最近登录时间',
      type: 'string'
    },
    {
      caption: '房东状态',
      type: 'string'
    },
    {
      caption: '操作',
      type: 'string'
    },
  ];
  conf.rows = userInfo.map(item=>Object.values(item));

  var result = nodeExcel.execute(conf);
  res.setHeader('Content-Type', 'application/vnd.openxmlformats');
  res.setHeader("Content-Disposition", "attachment; filename=" + "mysheet.xlsx");
  res.end(result, 'binary');

});


// 根据用户 id 来改变房东状态
router.post('/changeUserStatusByUserId', async (req, res) => {
  let {userId, status} = req.body;
  User.changeUserStatusByUserId(userId, status)
  .then(result=>{
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


// 根据多个参数查找用户
router.get('/getUserBymultiParams', async (req, res) => {
  let {roleType, skip, count, userSource, certification, status} = req.query;
  let roleInfo = await getRoleIdByRoleType(roleType);
  let userInfo = await User.getUserBymultiParams(userSource, certification, status, roleInfo._id, skip, count);
  res.json({
    code: 0,
    message: 'ok',
    data: userInfo
  })
});


// 修改用户信息
router.post('/modifyUserInfo', async (req, res) => {
  let {tel, email, sex, userSource, status, mailAddress, certification, userId} = req.body;
  User.modifyUserInfo(tel, email, sex, userSource, status, mailAddress, certification, userId)
  .then(result=>{
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


// mock数据
// 获取今日概述数据
router.get('/getSummaryData', async (req, res) => {
  res.json({
    code: 0,
    message: 'ok',
    data: mock({
      'addToday|10-200': 1,
      'userSum|1000-10000': 1,
    })
  });
});


// 用户数据 mock 0:管理员 / 1:Agent / 2:房东 / 3: 房客
router.get('/userInfoMock', async (req, res) => {

  let {roleType} = req.query;

  switch(roleType) {
    case '0':
        res.json({
          code: 0,
          message: 'ok',
          data: mock({
            "list|2": [{
              userName : "@cname()",
              password : "@string()",
              _id : "5df5d2a676dc481f7408db1c",
              roleType : "0",
              registerDate : new Date().getTime(),
              nearDate : new Date().getTime(),
              tel : "13319470485",
              email : "1109763222@qq.co",
              certification: '1',
              userAvar: "http://dummyimage.com/'300x300'/c6f279",
              sex : "0",
              birthday : '',
              userSource : "0",
              status : "0",
              payPassword : "000000",
              mailAddress : "湖南长沙",
              bookBalance : 0,       
            }]
          })
        }) 
    break;
    case '1':
        res.json({
          code: 0,
          message: 'ok',
          data: mock({
            "list|10": [{
              userName : "@cname()",
              password : "@string()",
              _id : "5df5d2e076dc481f7408db1f",
              roleType : "1",
              registerDate : new Date().getTime(),
              nearDate : new Date().getTime(),
              tel : "13319470485",
              email : "1109763222@qq.co",
              certification: '1',
              userAvar: "http://dummyimage.com/'300x300'/c6f279",
              sex : "0",
              birthday : '',
              userSource : "0",
              status : "0",
              payPassword : "000000",
              mailAddress : "湖南长沙",
              bookBalance : 0,       
            }]
          })
        }) 
    break;
    case '2':
        res.json({
          code: 0,
          message: 'ok',
          data: mock({
            "list|15": [{
              userName : "@cname()",
              password : "@string()",
              _id : "5df5d2d476dc481f7408db1d",
              roleType : "2",
              registerDate : new Date().getTime(),
              nearDate : new Date().getTime(),
              tel : "13319470485",
              email : "1109763222@qq.co",
              certification: '1',
              userAvar: "http://dummyimage.com/'300x300'/c6f279",
              sex : "0",
              birthday : '',
              userSource : "0",
              status : "0",
              payPassword : "000000",
              mailAddress : "湖南长沙",
              bookBalance : 0,       
            }]
          })
        }) 
    break;
    case '3':
        res.json({
          code: 0,
          message: 'ok',
          data: mock({
            "list|20": [{
              userName : "@cname()",
              password : "@string()",
              _id : "5df767db30e65e30946f8fe4",
              roleType : "3",
              registerDate : new Date().getTime(),
              nearDate : new Date().getTime(),
              tel : "13319470485",
              email : "1109763222@qq.co",
              certification: '1',
              userAvar: "http://dummyimage.com/'300x300'/c6f279",
              sex : "0",
              birthday : '',
              userSource : "0",
              status : "0",
              payPassword : "000000",
              mailAddress : "湖南长沙",
              bookBalance : 0,       
            }]
          })
        }) 
    break;
  }

})








module.exports = router;
