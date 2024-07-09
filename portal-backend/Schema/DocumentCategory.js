const { DataTypes } = require("sequelize");

const DocumentCategorySchema = {
  DocumentCategory: {
    categoryid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    categoryname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    categorydatatype: {
      type: DataTypes.ENUM,
      values: ["STRING", "INTEGER", "FLOAT", "DATEONLY", "FILE", "BIGINT"],
    },
  },
};

module.exports = DocumentCategorySchema;
