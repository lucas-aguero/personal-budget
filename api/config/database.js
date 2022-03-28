const Sequelize = require("sequelize");

const TransactionModel = require('../models/transactions');
const CategoryModel = require('../models/categories');
const UserModel = require('../models/users');

const sequelize = new Sequelize("personal_budget","personal_budget_db","JjqqE7AXoNo3Zg",{
    host: "localhost",
    dialect: "mysql",
  }
);

const Transaction = TransactionModel(sequelize,Sequelize);
const Category = CategoryModel(sequelize,Sequelize);
const User = UserModel(sequelize,Sequelize);


sequelize.sync({ force: false })
.then(()=> {
  console.log('DATABASE TABLES: SYNCHRONIZATION OK')
})

module.exports = {
  Transaction,
  Category,
  User
}
