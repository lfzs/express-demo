import { env } from '../utils/env.js'
export default (err, req, res, next) => {
  const data = {
    name: err.name,
    message: '系统开小差了，请稍后再试',
    ...(env === 'development' && {
      stack: err.stack,
      ...err
    }),
  }

  // 数据库验证错误
  if (err.name === 'SequelizeValidationError') {
    data.message = err.errors[0].message
    return res.status(400).json(data)
  }

  // 其他错误
  res.status(500).json(data)
}