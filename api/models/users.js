module.exports = (sequelize, type) => {
  return sequelize.define("users", {
    id: {
      type: type.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
    },
    email: type.STRING(50),
    password: type.STRING(150),
    nameFirst: type.STRING(30),
    nameLast: type.STRING(30),
  });
};
