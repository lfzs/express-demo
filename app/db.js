import { Sequelize } from 'sequelize'
import { isUndefined } from 'lodash-es'
import { env } from '../utils/env.js'
import config from '../config/db.json' with { type: 'json' }

// 初始化数据库连接
const initSequelize = () => {
  const sequelize = new Sequelize({
    ...config[env],
    define: {
      freezeTableName: true, // 强制表名等于模型名称
      hooks: {
        beforeFind: options => {
          // 全局限制每个模型查询数量（不包含关联查询）
          if (isUndefined(options.limit)) options.limit = 100
        },
      },
    }
  })
  return sequelize
}

const sequelize = initSequelize()
export {
  sequelize
}
