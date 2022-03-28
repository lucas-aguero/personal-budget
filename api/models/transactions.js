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
    is_income: type.BOOLEAN,
    user_id: type.INTEGER(11),
    category_id: type.INTEGER(11),
  });
};
