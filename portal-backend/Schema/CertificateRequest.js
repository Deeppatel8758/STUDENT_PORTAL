const { DataTypes } = require("sequelize");

const CertificateRequestSchema = {
  CertificateRequest: {
    requestid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    certificateid: {
      type: DataTypes.STRING,
      allowNull:true,
      defaultValue:null
    },

    enrollment: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "StudentCollegeDetails",
        key: "enrollment",
      },
    },
    certificatetype: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    requestdate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    statusupdatedate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
   
    requeststatus: {
      type: DataTypes.ENUM,
      values: ["PENDING", "APPROVED", "REJECTED"],
      allowNull: false,
      defaultValue: "PENDING",
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "DepartmentSchemas",
        key: "departmentId",
      },
    },
  },
};

module.exports = CertificateRequestSchema;
