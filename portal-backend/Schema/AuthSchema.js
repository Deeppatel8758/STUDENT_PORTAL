const { DataTypes } = require("sequelize");

const AuthSchema = {
  AdminAndDepartment: {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
      unique: true,
    },
    role: {
      type: DataTypes.ENUM,
      values: ["1", "2"],
      allowNull: false,
    },
    departmentid: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
};

module.exports = AuthSchema;
