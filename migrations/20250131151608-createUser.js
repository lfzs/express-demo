import { DataTypes } from 'sequelize'

// https://github.com/MRVMV/sequelize-mig
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
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
        comment: '用户名',
      },
      password: {
        type: DataTypes.STRING,
        defaultValue: '',
        allowNull: false,
        comment: '密码',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      deletedAt: {
        type: Sequelize.DATE,
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('user');
  }
}
