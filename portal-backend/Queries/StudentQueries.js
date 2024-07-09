const AllSchemaAccess = require("../helper/DbConnect");
const EncryptPassword = require("../helper/EncryptPassword");
const ComparePassword = require("../helper/ComparePassword");
const bcrypt = require("bcryptjs");
const { Sequelize } = require("sequelize");
const { pool } = require("../helper/DbConnect");
const StudentQueries = {
  getCertificateInfo: async function (certificateId) {
    const certificate = await AllSchemaAccess.certificateDynamic.findOne({
      where: {
        id: certificateId,
      },
    });

    return certificate.dataValues;
  },

  getApprovedCertificateDetails: async function (requestId) {
    const request = await AllSchemaAccess.CertificateRequest.findOne({
      where: {
        requestid: requestId,
      },
    });

    return request.dataValues;
  },

  modifyAllUpdateAndTime: async function (enrollment) {
    const updatevalues = await AllSchemaAccess.StudentCollegeDetails.update(
      {
        AllowUpdate: false,
        LockInDuration: null,
      },
      {
        where: {
          username: enrollment,
        },
      }
    );
    console.log(updatevalues);
    return updatevalues;
  },

  UploadDocumentEntry: async function (
    files,
    inputValues,
    requestid,
    imageCategory,
    inputcategory
  ) {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const newInputCategoryValues = [];

    for (let i = 0; i < inputcategory.length; i++) {
      if (inputcategory[i] !== "enrollment") {
        newInputCategoryValues.push(inputcategory[i]);
      }
    }

    if (files.length == imageCategory.length) {
      for (let i = 0; i < files.length; i++) {
        try {
          const value = await connection.query(
            "INSERT INTO UPLOADEDDOCUMENTS (documentValue, requestid,categoryid) VALUES (?, ?,?)",
            [files[i], requestid, imageCategory[i]]
          );
          console.log("Inserted:", value);
        } catch (error) {
          console.error("Error inserting:", error);
          await connection.rollback();
        } finally {
          connection.release();
        }
      }
    }

    if (newInputCategoryValues.length == Object.keys(inputValues).length) {
      for (let i = 0; i < newInputCategoryValues.length; i++) {
        try {
          const value = await connection.query(
            "INSERT INTO UPLOADEDDOCUMENTS (documentValue, requestid,categoryid) VALUES (?, ?,?)",
            [
              inputValues[newInputCategoryValues[i]],
              requestid,
              newInputCategoryValues[i],
            ]
          );
          console.log("Inserted:", value);
        } catch (error) {
          console.error("Error inserting:", error);
          await connection.rollback();
        } finally {
          connection.release();
        }
      }
    }

    await connection.commit();
  },

  findDocumentDetails: async function (id) {
    const documentDetails = await AllSchemaAccess.documentCategory.findOne({
      where: {
        categoryid: id,
      },
    });
    return documentDetails;
  },

  getAllStudents: async function () {
    const student = await AllSchemaAccess.StudentCollegeDetails.findAll();
    return student;
  },

  checkUsername: async function (username) {
    const student = await AllSchemaAccess.StudentCollegeDetails.findOne({
      where: {
        username: username,
      },
    });
    return student;
  },
  createNewStudent: async function (studentCollegeObj, studentPersonalObj) {
    try {
      const user = await AllSchemaAccess.StudentCollegeDetails.findOne({
        where: {
          username: studentCollegeObj.enrollment,
        },
      });
      console.log("Create new student console");
      console.log(user);

      if (user) {
        const updateDetails =
          await AllSchemaAccess.StudentCollegeDetails.update(
            {
              ...studentCollegeObj,
              AllowUpdate: false,
              registeredStudent: true,
            },
            {
              where: {
                username: studentCollegeObj.enrollment,
              },
            }
          );
        console.log("Update Details");
      }
      console.log("First Executed");

      const findExistingPersonalDetails =
        await AllSchemaAccess.StudentPersonalDetails.findOne({
          where: {
            enrollment: studentCollegeObj.enrollment,
          },
        });
      console.log("Find Existing", findExistingPersonalDetails);

      console.log(studentPersonalObj);
      if (findExistingPersonalDetails) {
        const data = await AllSchemaAccess.StudentPersonalDetails.update(
          studentPersonalObj,
          {
            where: {
              enrollment: studentCollegeObj.enrollment,
            },
          }
        );
        return data;
      } else {
        const data = await AllSchemaAccess.StudentPersonalDetails.create(
          studentPersonalObj
        );
        return data;
      }
    } catch (error) {
      console.log("---");
      console.log(error.message);
    }
  },
  userLogin: async function (data) {
    const user = await AllSchemaAccess.StudentCollegeDetails.findOne({
      where: {
        username: data.username,
      },
    });

    console.log(user.dataValues.password);

    if (user) {
      const comparePassword = await bcrypt.compareSync(
        data.password,
        user.dataValues.password
      );

      console.log(comparePassword);
      if (comparePassword) {
        return user;
      } else {
        return null;
      }
    }
  },

  RequestCertificate: async function (data) {
    try {
      const response = await AllSchemaAccess.CertificateRequest.create(data);
      return response;
    } catch (error) {
      throw error;
    }
  },

  getStudentProfileDetails: async function (username) {
    const connection = await pool.getConnection();
    console.log("Username", username);
    const query =` SELECT * FROM studentcollegedetails JOIN studentpersonaldetails ON studentcollegedetails.enrollment = studentpersonaldetails.enrollment WHERE studentcollegedetails.enrollment = ?`;

    try {
      const data = await connection.query(query, [username]);
      return data;
    } catch (error) {
      return null;
    }
  },
  getCollegeDetails: async function (username) {
    const findDepartmentId =
      await AllSchemaAccess.StudentCollegeDetails.findOne({
        where: {
          username: username,
        },
      });
    return findDepartmentId;
  },
  updateStudentDetails: async function (username, data) {},
  getAllCertificateRequests: async function (username) {
    const certificateRequests =
      await AllSchemaAccess.CertificateRequest.findAndCountAll({
        where: {
          enrollment: username,
        },
      });
    return certificateRequests;
  },
  checkRequestId: async function (requestId) {
    const request = await AllSchemaAccess.CertificateRequest.findOne({
      where: {
        requestid: requestId,
      },
    });
    return request;
  },
  deleteRequest: async function (requestId) {
    const deleteRequest = await AllSchemaAccess.CertificateRequest.destroy({
      where: {
        requestid: requestId,
      },
    });
    return deleteRequest;
  },
  getCertificateDetails: async function (requestId) {
    const connection = await pool.getConnection();

    const approvedCertificateDetails = await connection.query(
      "SELECT* FROM CERTIFICATEREQUESTS INNER JOIN UPLOADEDDOCUMENTS ON CERTIFICATEREQUESTS.REQUESTID=UPLOADEDDOCUMENTS.REQUESTID WHERE CERTIFICATEREQUESTS.REQUESTID=?",
      [requestId]
    );
    /*  await AllSchemaAccess.CertificateRequest.findOne({
        where: {
          requestid: requestId,
        },
      }); */
    console.log(approvedCertificateDetails);
    return approvedCertificateDetails;
  },
  getAllCertificateType: async function () {
    const certificateType = await AllSchemaAccess.certificateDynamic.findAll({
      where: {
        status: true,
      },
    });
    return certificateType;
  },
  getAllCertificateTypeOnAdmin: async function () {
    const certificateType = await AllSchemaAccess.certificateDynamic.findAll();
    return certificateType;
  },
  getCertificateOnId: async function (id) {
    const certificateType = await AllSchemaAccess.certificateDynamic.findOne({
      where: {
        id: id,
      },
    });
    return certificateType;
  },
  checkDynamicCertiId: async function (dynamicId) {
    const certificate = await AllSchemaAccess.certificateDynamic.findOne({
      where: {
        id: dynamicId,
      },
    });

    return certificate;
  },
  getDocumentDetails: async function (docId) {
    const documentDetails = await AllSchemaAccess.documentCategory.findOne({
      where: {
        categoryid: docId,
      },
    });

    return documentDetails;
  },
  getAllCertificateRequestOnType: async function (username, req) {
    console.log(req.params.requestType);
    const connection = await pool.getConnection();
    const data = await connection.query(
      "SELECT * FROM CERTIFICATEREQUESTS INNER JOIN CERTIFICATEDYNAMICS ON CERTIFICATEREQUESTS.CERTIFICATETYPE = CERTIFICATEDYNAMICS.ID WHERE CERTIFICATEREQUESTS.ENROLLMENT=? AND CERTIFICATEREQUESTS.requestSTATUS=?",
      [username, req.params.requestType]
    );

    await connection.destroy();
    return data[0];
  },
};

module.exports = StudentQueries;
