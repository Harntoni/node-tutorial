'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bankAccounts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        defaultValue: DataTypes.UUIDV4
      },
      userId: {
        type: Sequelize.STRING,
        alowNull: false,
        refrences: {model: "users", key:"id"},
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      bankName: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 'Horizon'
      },

      accountNumber: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
      },

      accountType: {
          type: Sequelize.ENUM('savings', 'checking'),
          allowNull: false
      },

      Balance: {
          type: Sequelize.DECIMAL,
          allowNull: false,
          defaultValue: 0.00
      },

      currency: {
          type: Sequelize.STRING,
          defaultValue: 'USD'
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('bankAccounts');
  }
};