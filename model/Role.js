
const mongoose = require('mongoose');

const Role = mongoose.model('role', new mongoose.Schema({
  roleName: {
    type: String,
    required: true
  }
}));

// 添加角色
module.exports.add = async (roleName) => {
  const result = await Role.findOne({
    roleName
  })
  if(result) {
    throw new Error('该角色已存在');
  }else {
    const role = new Role({
      roleName
    })
    return await role.save();
  }
}

// 根据角色名称查找 id 
module.exports.findByName = async (roleName) => {
  return await Role.findOne({
    roleName
  })
}



