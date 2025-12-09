import { sequelize } from "../config/sequelize.js";
import { bankAccount } from "./bankaccount.js";
import { transaction } from "./transaction.js";
import { User } from "./user.js";

//Associations

//one user can have many accounts
User.hasMany(bankAccount, {
  foreignKey: "userId",
  as: "accounts"
});

bankAccount.belongsTo(User, {
  foreignKey: 'userId',
  as: 'owner'
});


// one bank account can have many transactions
bankAccount.hasMany(transaction, {
foreignKey: 'sourceAccount',
as: 'sender'
});

bankAccount.hasMany(transaction, {
foreignKey: 'destinationAccount',
as: 'reciever'
});

transaction.belongsTo(bankAccount, {
  foreignKey: 'sourceAccount',
  as: 'sender'
});

transaction.belongsTo(bankAccount, {
  foreignKey: 'destinationAccount',
  as: 'reciever'
});


export const initDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('connection has been established successfully.');
    
  } catch (error) {
    console.error(`Database connection error ${error}`)
  }
  
};

export {User, bankAccount, transaction};




// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const process = require('process');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/database.js')[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;
