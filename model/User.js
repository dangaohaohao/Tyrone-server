
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
  // 实名认证情况 0:已认证 / 1:未认证 / 2:认证中 / 3:认证失败
  certification: {
    type: String,
    default: 1
  },
  // 用户头像
  userAvar: {
    type: String,
    default: "http://dummyimage.com/'300x300'/c6f279"
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
  // 用户状态 0:正常 / 1:禁用
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
  },

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
  return await User.find({roleId: id}).skip(Number(skip)).limit(Number(count));
}

// 根据用户 id 来查找用户
module.exports.findUserById = async (userId) => {
  let id = mongoose.Types.ObjectId(userId);
  return await User.findById({
    "_id": id
  });
}

// 根据用户 姓名 来查找用户
module.exports.findUserByName = async (userName, roleId, skip, count) => {
  let id = mongoose.Types.ObjectId(roleId);
  return await User.find({userName, roleId: id}).skip(Number(skip)).limit(Number(count));
}

// 根据特定条件查询用户 用户来源(0/1/2) / 实名认证情况(0/1/2/3) / 银行卡绑定情况(0/1) / 用户状态(0/1) / 最近登录时间 
module.exports.findUserByRequireMent = async (requireMent) => {
  return await User.find(requireMent);
}

// 根据用户 id 来改变房东状态
module.exports.changeUserStatusByUserId = async (userId, status) => {
  let id = mongoose.Types.ObjectId(userId);
  return await User.findByIdAndUpdate(id, {status: status});
}

// 根据多个参数查找用户
module.exports.getUserBymultiParams = async (userSource, certification, status, roleId, skip, count) => {
  let id = mongoose.Types.ObjectId(roleId);
  return await User.find({userSource, certification, status, roleId: id}).skip(Number(skip)).limit(Number(count));
}

// 修改用户信息
module.exports.modifyUserInfo = async (tel, email, sex, userSource, status, mailAddress, certification, userId) => {
  let id = mongoose.Types.ObjectId(userId);
  return await User.findByIdAndUpdate(id, {tel, email, sex, userSource, status, mailAddress, certification});
}

