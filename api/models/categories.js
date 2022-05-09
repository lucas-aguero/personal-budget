module.exports = (sequelize, type) => {
    return sequelize.define("categories", {
      id: {
        type: type.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
      },
      name: type.STRING(50),
      isIncome: type.BOOLEAN,
      userId: type.INTEGER(1),
    });
  };
  