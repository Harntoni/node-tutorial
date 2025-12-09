'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('transactions', 'id', {
      type: Sequelize.STRING,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    });
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.changeColumn('transactions', 'id', {
      type: Sequelize.INTEGER,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    });
  }
};
