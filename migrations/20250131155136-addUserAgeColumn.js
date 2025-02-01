import { DataTypes } from 'sequelize'

export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('user', 'age', {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '年龄',
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('user', 'age')
  }
}
