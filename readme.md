# Tyrone 后台

## 分类
+ 登录页
  - admin 登录
    + Tyroneyu / Tyroneyu
+ 首页
  - mock 数据 copy 老师的订单量变化趋势 / App 下载量
+ 财务管理
  - 历史进出账 mock
  - 根据订单编号查找
  - 根据用户编号查找
  - 根据银行账号查找
  - 充值方式 / 银行名称 / 状态 / 时间 来导出 excel 表格   需要分页功能 / 充值/提现标识
  - 提现审核
+ 订单管理
  -
+ 用户管理
  - 房东
  - 房客
  - Agent
+ 房屋管理
+ 数据管理
+ 内容管理


## mongoose 中 ObjectId 查找数据
```
  let id = mongoose.Types.ObjectId(userId);
  return await User.findById({
    "_id": id
  })
```
## robo 3t常见操作
+ https://blog.csdn.net/qq_27378621/article/details/80006734