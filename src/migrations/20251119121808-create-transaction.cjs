'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        defaultValue: DataTypes.UUIDV4  
      },

      sourceAccount: {
        type: Sequelize.STRING,
        refrences: {model: "bankAccount", key:"id"},
        allowNull: true,
        onDelete: 'SETNULL',
        onUpdate: 'CASCADE' 
      },

      destinationAccount: {
        type: DataTypes.INTEGER, 
        refrences: {model: "bankAccount", key:"id"},
         onDelete: 'SETNULL',
        onUpdate: 'CASCADE' 
      },


      recipientEmail: {
        type: Sequelize.STRING,
      },

      note: {
        type: Sequelize.STRING,
      },

      amount: {
        type: Sequelize.DECIMAL,
          allowNull: false,
      },

      status: {
        type: Sequelize.ENUM('processing', 'success', 'failed'),
          defaultValue: 'processing'
      },

      category: {
        type: Sequelize.ENUM('deposit', 'withdrawal', 'transfer'),
          allowNull: false
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
    await queryInterface.dropTable('transactions');
  }
};