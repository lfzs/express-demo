import { DataTypes } from 'sequelize'
import { hashSync } from 'bcrypt'

const saltRounds = 10
const defineModel = sequelize => sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '用户ID',
  },
  name: {
    type: DataTypes.STRING,
    defaultValue: '',
    allowNull: false,
    unique: true,
    validate: {
      len: {
        args: [4, 20],
        msg: '用户名长度应在 4-20 之间',
      },
    },
    comment: '用户名',
  },
  password: {
    type: DataTypes.STRING,
    defaultValue: '',
    allowNull: false,
    validate: {
      len: {
        args: [4, 30],
        msg: '密码长度应在 4-30 之间',
      },
    },
    comment: '密码',
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: {
        args: [0],
        msg: '年龄不能小于 0',
      },
    },
    comment: '年龄'
  }
}, {
  paranoid: true, // 软删除
  defaultScope: {
    attributes: {
      exclude: ['deletedAt', 'password']
    }
  },
  hooks: {
    afterValidate(data) { // 验证通过在存储
      data.password = hashSync(data.password, saltRounds) // 加密存储
    },
  },
})

export {
  defineModel
}
