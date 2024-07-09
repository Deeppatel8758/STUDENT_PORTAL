const { DataTypes } = require("sequelize");

const DepartmentSchemas = {
  departmentId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  departmentName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};
module.exports = DepartmentSchemas;
