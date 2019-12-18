
const mongoose = require('mongoose');

const Order = mongoose.model('order', new mongoose.Schema({
  // 房屋编号
  houseId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'House',
    required: true,
  },
  // 房东姓名
  ownerName: {
    type: String,
    required: true,
  },
  // 房客姓名
  tenantName: {
    type: String,
    required: true,
  },
  // Agent 姓名
  agentName: {
    type: String,
    required: true
  },
  // 订单发起人 0:房东 / 1:房客 / 2:Agent / 3:平台
  orderAuthor: {
    type: String,
    required: true,
  },
  // 发起人联系方式
  orderAuthorTel: {
    type: String,
    required: true,
  },
  // 订单类型 0:管理费 / 1:年度税金 / 2:生活代缴 / 3:维修服务 / 4:清扫服务 / 5:装修费
  orderType: {
    type: String,
    required: true
  },
  // 具体内容 0:基础清洁 / 1:卫浴清洁 / 2:玻璃清洁 / 3:墙壁漏水 / 4:马桶维修 / 5:家电故障 / 6:门锁故障 / 7:代缴电费 / 8: 代缴水费 / 9:代缴物业费 / 10:代缴煤气费 / 11:其他
  content: {
    type: String,
    default: 0,
  },
  // 预约时间
  appointment: {
    type: String,
    required: true
  },
  // 下单时间
  orderTime: {
    type: String,
    required: true
  },
  // 订单状态 0:已完成 / 1:进行中
  orderStatus: {
    type: String,
    required: true
  },
  // 订单完成时间
  orderFinishedTime: {
    type: String,
  },
  // 服务人员
  attendantName: {
    type: String,
  },
  // 订单基础金额
  orderMoney: {
    type: String,
    required: true,
  },
  // 订单 VAT 0:6% 1:9% 2:10% 3:15% 4:20% 5:25%
  orderVAT: {
    type: String,
    required: true,
  },
  // 订单总金额
  orderSum: {
    type: String,
  },
  // 支付方式 0:WeChat / 1:银行卡
  payWay: {
    type: String,
  },
  // 银行账号
  bankAccount: {
    type: String,
  },
  // 银行名称
  bankName: {
    type: String,
  },
  // 银行流水号
  bankTranslateNum: {
    type: String,
  },
  // 支付时间
  payTime: {
    type: String
  }

}));

// 添加订单
module.exports.add = async (orderInfo) => {
  const order = new Order(orderInfo)
  return await order.save();
}

// 修改订单
module.exports.modify = async (orderId, orderInfo) => {
  let id = mongoose.Types.ObjectId(orderId);
  return await Order.findByIdAndUpdate(id, orderInfo);
}

// 根据订单 id 来查找订单
module.exports.findOrderById = async (orderId) => {
  let id = mongoose.Types.ObjectId(orderId);
  return await Order.findById({
    "_id": id
  });
}

// 根据房屋 id 搜索订单
module.exports.findOrderByhouseId = async (houseId, skip, count) => {
  let id = mongoose.Types.ObjectId(houseId);
  return await Order.find({
    houseId: id
  }).skip(Number(skip)).limit(Number(count));
}

// 根据多个参数搜索订单
module.exports.findOrderByMultiParams = async (orderType, payWay, orderStatus, skip, count) => {
  return await Order.find({ orderType, payWay, orderStatus }).skip(Number(skip)).limit(Number(count));
}


