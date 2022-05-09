module.exports = (sequelize, type) => {
  return sequelize.define("transactions", {
    id: {
      type: type.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
    },
    date: type.DATEONLY,
    detail: type.STRING(150),
    amount: type.FLOAT(10,2),
    isIncome: type.BOOLEAN,
    userId: type.INTEGER(11),
    categoryId: type.INTEGER(11),
  });
};
