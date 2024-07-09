const { DataTypes } = require("sequelize");

const DocumentVariable = {
  VariableName: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  VariableType: {
    type: DataTypes.STRING,
    enum: ["STRING", "INTEGER", "FLOAT", "DATEONLY", "FILE", "BIGINT"],
    allowNull: false,
  },
};
module.exports = DocumentVariable;
