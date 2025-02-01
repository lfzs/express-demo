import { Sequelize } from 'sequelize'
import { isUndefined } from 'lodash-es'
import { glob } from 'glob'
import { env } from '../utils/env.js'
import config from './config.json' with { type: 'json' }
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

// 初始化所有模型
const initModels = async () => {
  const files = await glob(`${import.meta.dirname}/**/*.js`)
  await Promise.all(files.map(async file => {
    const { defineModel  } = await import(file)
    if (defineModel) {
      await defineModel(sequelize)
    }
  }))
}

const models = sequelize.models
export {
  sequelize,
  initModels,
  models,
}
