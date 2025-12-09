import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize.js";
export class bankAccount extends Model {}
bankAccount.init(
  {
  id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4
      },
      userId: {
        type: DataTypes.STRING,
        alowNull: false,
        refrences: {model: "users", key:"id"}
      },
      bankName: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: 'Horizon'
      },

      accountNumber: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
      },

      accountType: {
          type: DataTypes.ENUM('savings', 'checking'),
          allowNull: false
      },

      Balance: {
          type: DataTypes.DECIMAL,
          allowNull: false,
          defaultValue: 0.00
      },

      currency: {
          type: DataTypes.STRING,
          defaultValue: 'USD'
      },
    },
    {
    sequelize,
    modelName: "bankAcccount",
    tableName: "bankAccounts",
  }

);



// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   User.init({
//     firstName: DataTypes.STRING,
//     lastName: DataTypes.STRING,
//     email: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'User',
//   });
//   return User;
// };