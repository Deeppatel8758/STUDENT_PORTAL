const { DataTypes } = require("sequelize");

const UploadedDocumentsSchema = {
  UploadedDocuments: {
    documentid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    documentValue: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    requestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "CertificateRequest",
        key: "requestid",
      },
    },
    categoryid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "documentCategory",
        key: "categoryid",
      },
    },
  },
};

module.exports = UploadedDocumentsSchema;
