'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('bankAccounts', 'id', {
      type: Sequelize.STRING,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    });
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.changeColumn('bankAccounts', 'id', {
      type: Sequelize.INTEGER
    });
  }
};
