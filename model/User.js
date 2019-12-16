
const mongoose = require('mongoose');

const User = mongoose.model('user', new mongoose.Schema({
  // 姓名
  userName: {
    type: String,
    required: true,
  },
  // 密码
  password: {
    type: String,
    required: true,
  },
  // 角色关联
  roleId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Role'
  },
  // 角色类型
  roleType: {
    type: String,
    required: true
  },
  // 注册时间
  registerDate: {
    type: String,
    default: new Date().getTime(),
  },
  // 最近登录时间
  nearDate: {
    type: String,
    default: new Date().getTime(),
  },
  // 手机号
  tel: {
    type: String,
    required: true,
  },
  // 邮箱
  email: {
    type: String,
    required: true,
  },
  // 性别 0:男 1:女 2:保密
  sex: {
    type: String,
    default: 0,
  },
  // 出生日期
  birthday: {
    type: String,
    default: ''
  },
  // 用户来源 0:管理员添加 / 1:IOS客户端 / 2:Android客服端
  userSource: {
    type: String,
    default: 0
  },
  // 用户状态 0:正常 / 1:删除
  status: {
    type: String,
    required: true,
  },
  // 支付密码
  payPassword: {
    type: String,
    default: '000000',
  },
  // 通讯地址
  mailAddress: {
    type: String,
    required: true
  },
  // 账面余额
  bookBalance: {
    type: Number,
    default: 0
  }

}));

// 添加用户
module.exports.add = async (userInfo) => {
  const user = new User(userInfo)
  return await user.save();
}

// 根据用户名和密码来查找数据
module.exports.findByNameAndPsd = async(userName, password) => {
  let result = await User.find({
    userName,
    password
  });
  if(result.length != 0) {
    return result
  }else {
    return ''
  }
}

// 根据角色id 查找角色用户 分页功能
module.exports.findUserByRoleId = async (roleId, skip, count) => {
  let id = mongoose.Types.ObjectId(roleId);
  return await User.find({roleId: id});
  // .skip(skip).limit(count)
}

// 根据用户 id 来查找用户
module.exports.findUserById = async (userId) => {
  let id = mongoose.Types.ObjectId(userId);
  return await User.findById({
    "_id": id
  });
}

// 根据特定条件查询用户 用户来源(0/1/2) / 实名认证情况(0/1/2/3) / 银行卡绑定情况(0/1) / 用户状态(0/1) / 最近登录时间 
module.exports.findUserByRequireMent = async (requireMent) => {
  return await User.find(requireMent);
}


