import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize.js";
export class transaction extends Model {};

transaction.init(
  {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        defaultValue: DataTypes.UUIDV4  
      },

      sourceAccount: {
        type: DataTypes.STRING,
        refrences: {model: "bankAccount", key:"id"},
        allowNull: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE' 
      },

      destinationAccount: {
        type: DataTypes.INTEGER, 
        refrences: {model: "bankAccount", key:"id"},
         onDelete: 'SET NULL',
        onUpdate: 'CASCADE' 
      },

      recipientEmail: {
        type: DataTypes.STRING,
      },

      note: {
        type: DataTypes.STRING,
      },

      amount: {
        type: DataTypes.DECIMAL,
          allowNull: false,
      },

      status: {
        type: DataTypes.ENUM('processing', 'success', 'failed'),
          defaultValue: 'processing'
      },

      category: {
        type: DataTypes.ENUM('deposit', 'withdrawal', 'transfer'),
          allowNull: false
      },
    },
     {
    sequelize,
    modelName: "transaction",
    tableName: "transactions",
  }
);