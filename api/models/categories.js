module.exports = (sequelize, type) => {
    return sequelize.define("categories", {
      id: {
        type: type.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
      },
      name: type.STRING(50),
      is_income: type.BOOLEAN,
      user_id: type.INTEGER(1),
    });
  };
  