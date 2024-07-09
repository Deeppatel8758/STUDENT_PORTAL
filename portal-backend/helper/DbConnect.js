const { Sequelize } = require("sequelize");
const AuthSchema = require("../Schema/AuthSchema");
const DocumentCategorySchema = require("../Schema/DocumentCategory");
const CertificateDynamic = require("../Schema/CertificateDynamic");
const CertificateRequestSchema = require("../Schema/CertificateRequest");
const StudentSchema = require("../Schema/Student");
const UploadedDocumentsSchema = require("../Schema/UploadedDocuments");
const DepartmentSchemas = require("../Schema/DepartmentSchema");
const DocumentVariable = require("../Schema/DocumentVariable");
const mysql = require('mysql2/promise'); // Import MySQL2 with Promises support

const dotenv = require("dotenv");
dotenv.config();

const USER = process.env.USER || "root";
const PASSWORD = process.env.PASSWORD || "";
const HOST = process.env.HOST || "localhost";
const DATABASE = process.env.DATABASE || "STUDENT_PORTAL";
 const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
  host: HOST,
  port: process.env.DB_PORT,
  dialect: "mysql",
});

const pool = mysql.createPool({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
});

const UploadedDocuments = sequelize.define(
  "UploadedDocuments",
  UploadedDocumentsSchema.UploadedDocuments,
);
const AdminAndDepartment = sequelize.define(
  "AdminAndDepartment",
  AuthSchema.AdminAndDepartment,
);

const DepartmentSchema = sequelize.define(
  "DepartmentSchema",
  DepartmentSchemas,
);

const DocumentVariableSchema = sequelize.define(
  "DocumentVariable",
  DocumentVariable,
);

const StudentCollegeDetails = sequelize.define(
  "StudentCollegeDetails",
  StudentSchema.StudentCollegeDetails,
);

const StudentPersonalDetails = sequelize.define(
  "StudentPersonalDetails",
  StudentSchema.StudentPersonalDetails,
);

const CertificateRequest = sequelize.define(
  "CertificateRequest",
  CertificateRequestSchema.CertificateRequest,
);

const documentCategory = sequelize.define(
  "documentCategory",
  DocumentCategorySchema.DocumentCategory,
);

const certificateDynamic = sequelize.define(
  "certificateDynamic",
  CertificateDynamic,
);

// UNCOMMENT this and run ONCE to initalize the database and then COMMENT it again to avoid re-initialization of database

/* sequelize.sync({ force: true })
  .then(() => {
    console.log('Schema created successfully.');

    // Close the connection
    sequelize.close();
  })
  .catch((err) => {
    console.error('Error creating schema:', err);

    // Close the connection
    sequelize.close();
  }); */

module.exports = {
  sequelize,
  AdminAndDepartment,
  StudentCollegeDetails,
  StudentPersonalDetails,
  CertificateRequest,
  documentCategory,
  certificateDynamic,
  UploadedDocuments,
  DepartmentSchema,
  DocumentVariableSchema,
  pool
};
