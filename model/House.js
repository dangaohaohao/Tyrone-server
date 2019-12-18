
const mongoose = require('mongoose');

const House = mongoose.model('house', new mongoose.Schema({
  // 房屋名称
  houseName: {
    type: String,
    required: true
  },
  // 房屋地址
  houseAddress: {
    type: String,
    required: true
  },
  // 上传时间
  uploadDate: {
    type: String,
    default: new Date().getTime(),
  },
  // 房东编号
  houseOwnerId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  // Agent编号
  AgentId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  // 当前房客编号
  tenantId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
  },
  // 出租状态 0:已出租 | 1:待出租
  rentStatus: {
    type: String,
    required: true
  },
  // 租期
  tenancy: {
    type: String,
  },
  // 付款类型 0: 押一付三 | 1: 押一付一 | 2: 半年付 | 3: 一年付
  payMentType: {
    type: String,
  },
  // 月收租金
  rental: {
    type: Number,
    required: true
  },
  // 租金情况 0: 已缴纳 | 1: 待缴纳 | 2: 已逾期
  rentalStatus: {
    type: String,
  },
  // 累计出租时长
  rentalTime: {
    type: String,
    default: 0
  },
  // 累计出租次数
  rentalTimes: {
    type: Number,
    default: 0
  },
  // 累计清扫次数
  cleaningTimes: {
    type: Number,
    default: 0
  },
  // 累计维修次数
  maintenanceTimes: {
    type: Number,
    default: 0
  },
  // 累计装修次数
  decorationTimes: {
    type: Number,
    default: 0
  },
  // 房屋类型 0:电梯高层 | 1:别墅
  houseType: {
    type: String,
    required: true
  },
  // 房屋楼层 不写那么多/所在楼层
  buildingFloor: {
    type: String,
    required: true
  },
  // 房屋面积 默认单位是平方米
  houseArea: {
    type: String,
    required: true
  },
  // 房屋格局 {卧室houseRoom:Number | 客厅saloon:Number | 卫浴bathroom:Number | 阳台balcony:Number}
  housePattern: {
    type: Object,
    required: true
  },
  // 车位数量
  carPark: {
    type: Number,
    required: true
  },
  // 家具设备 0:普通 | 1:优越 | 2:高级
  furnitureType: {
    type: String,
    required: true
  },
  // 封面图片
  housePic: {
    type: String,
    default: "http://dummyimage.com/'300x300'/c6f279"
  },
  // 房客身份要求 0: 不限 | 1:男 | 2:女 | 3: 单身 | 4:情侣 | 5: 家庭
  tenantRes: {
    type: String,
    default: 0
  }

}));


// 添加房屋
module.exports.add = async (houseInfo) => {
  const house = new House(houseInfo)
  return await house.save();
}

// 修改房屋
module.exports.modifyHouseInfo = async (houseId, houseInfo) => {
  let id = mongoose.Types.ObjectId(houseId);
  return await House.findByIdAndUpdate(id, houseInfo);
}

// 根据房屋 id 来查找房屋
module.exports.findHouseById = async (houseId) => {
  let id = mongoose.Types.ObjectId(houseId);
  return await House.findById({
    "_id": id
  });
}



