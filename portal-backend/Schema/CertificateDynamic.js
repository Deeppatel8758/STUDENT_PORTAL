const { DataTypes } = require("sequelize");

const CertificateDynamicSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  certificatename: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  documentsrequired: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  CertificateSerial: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  CertificateVariables: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  certificateFormatPath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    default: true,
  }
};

module.exports = CertificateDynamicSchema;
