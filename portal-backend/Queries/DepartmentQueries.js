const AllSchemaAccess = require("../helper/DbConnect");
const ComparePassword = require("../helper/ComparePassword");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const {pool}=require('../helper/DbConnect')

const DepartmentQueries = {
  getStudentData: async function (enrollment, departmentid = null) {
    let student = "";
    if (enrollment && departmentid) {
      student = await AllSchemaAccess.StudentCollegeDetails.findOne({
        where: { enrollment: enrollment },
        attributes: { exclude: ["password"] },
      });
    } else if (!departmentid) {
      student = await AllSchemaAccess.StudentCollegeDetails.findOne({
        where: { enrollment: enrollment },
      });
    }

    if (!student) {
      return null;
    }

    const findPersonalDetails =await AllSchemaAccess.StudentPersonalDetails.findOne({
        where: { enrollment: enrollment },
    });
    console.log()

    return {
      studentCollegeDetails: student,
      studentPersonalDetails: findPersonalDetails,
    };
  },
  getAllCertificateRequests: async function (departmentId) {
    console.log(departmentId);
    // Get certificate requests associated with the provided departmentId
    const certificateRequests =
      await AllSchemaAccess.CertificateRequest.findAndCountAll({
        where: {
          departmentid: departmentId,
        },
      });

    return certificateRequests;
  },
  getAllPendingCertificateRequests: async function (departmentId) {
    console.log(departmentId);
    // Get certificate requests associated with the provided departmentId
    const certificateRequests =
      await AllSchemaAccess.CertificateRequest.findAndCountAll({
        where: {
          departmentId,
          requeststatus: "PENDING",
        },
      });

    return certificateRequests;
  },
  GerAllRequestOnType: async function (departmentId, req) {
    // Get certificate requests associated with the provided departmentId
    const certificateRequests =
      await AllSchemaAccess.CertificateRequest.findAndCountAll({
        where: {
          departmentId,
          requeststatus: req.params.requestType,
        },
      });

    return certificateRequests;
  },
  getAllRejectedCertificateRequests: async function (departmentId) {
    // Get certificate requests associated with the provided departmentId
    const certificateRequests =
      await AllSchemaAccess.CertificateRequest.findAndCountAll({
        where: {
          departmentId,
          requeststatus: "REJECTED",
        },
      });

    return certificateRequests;
  },
  getStudentEnrollmentsByDepartmentId: async function (departmentId) {
    // Get student enrollments associated with the provided departmentId
    const studentEnrollments =
      await AllSchemaAccess.StudentCollegeDetails.findAll({
        where: { branch: departmentId },
      });

    // Extract the enrollments from the returned student records
    const enrollments = studentEnrollments.map((student) => student.enrollment);

    return enrollments;
  },
  updateCertificateRequestStatus: async function (requestId, status, comment) {
    const connection = await pool.getConnection()
    try {
      const updateData = { requeststatus: status };
      let newCertiSerial,sepreatedCerial
     await connection.beginTransaction()
      if (status == "APPROVED") {
        const GetCertificateSerial = await connection.query("SELECT CERTIFICATEDYNAMICS.CERTIFICATESERIAL FROM CERTIFICATEREQUESTS INNER JOIN CERTIFICATEDYNAMICS ON CERTIFICATEREQUESTS.CERTIFICATETYPE=CERTIFICATEDYNAMICS.ID WHERE REQUESTID=?", [requestId])
        
        let getCountofSerial
        
        if (GetCertificateSerial[0][0].CERTIFICATESERIAL) {
           getCountofSerial = await AllSchemaAccess.CertificateRequest.count({
            where: {
              certificateid: {
                [Op.regexp]: GetCertificateSerial[0][0].CERTIFICATESERIAL
              }
            }
          })
        }
        else {
          throw "Certificate Serial Not Found"
        }
         newCertiSerial = `${GetCertificateSerial[0][0].CERTIFICATESERIAL}/${getCountofSerial + 1}`

        
        updateData.certificateid=newCertiSerial
      }
      
      else if (status === "REJECTED" && comment !== null) {
        updateData.comment = comment;
      }
      
      updateData.statusupdatedate = new Date()
      updateData.requeststatus=status
console.log("Update Data",updateData)
  
      const updateCount = await AllSchemaAccess.CertificateRequest.update(
        updateData,
        { where: { requestid: requestId } },
      );
      await connection.commit()
      return {updateCount,newCertiSerial};
    } catch (err) {
      await connection.rollback()
      return err
   }
  },
  createNewUser: async function (data) {
    const newUser = await AllSchemaAccess.AdminAndDepartment.create(data);
    return newUser;
  },
  checkContactNumber: async function (contactNumber) {
    const user = await AllSchemaAccess.AdminAndDepartment.findOne({
      where: { contactnumber: contactNumber },
    });
    return user;
  },
  checkEmail: async function (email) {
    const user = await AllSchemaAccess.AdminAndDepartment.findOne({
      where: { email: email },
    });
    return user;
  },
  checkUsername: async function (username) {
    const user = await AllSchemaAccess.AdminAndDepartment.findOne({
      where: { username: username },
    });

    return user;
  },
  userLogin: async function (data) {
    const user = await AllSchemaAccess.AdminAndDepartment.findOne({
      where: {
        username: data.username,
      },
    });
    console.log(user);
    console.log(data.password);
    if (user) {
      const isMatch = bcrypt.compare(data.password, user.dataValues.password);
      if (isMatch) {
        return user;
      } else {
        return null;
      }
    }
  },
  getAllUsers: async function () {
    const users = await AllSchemaAccess.AdminAndDepartment.findAll({
      where: { role: "2" },
    });
    return users;
  },
  getUsersByDepartmentId: async function (departmentId) {
    const users = await AllSchemaAccess.AdminAndDepartment.findAll({
      where: { departmentid: departmentId },
    });
    return users;
  },
  deleteUser: async function (userId) {
    const deletedUser = await AllSchemaAccess.AdminAndDepartment.destroy({
      where: { username: userId },
    });
    return deletedUser;
  },
  addNewDepartment: async function (data) {
    const newDepartment = await AllSchemaAccess.DepartmentSchema.create(data);

    if (!newDepartment) {
      return null;
    }

    return newDepartment;
  },
  getAllDepartments: async function () {
    const departments = await AllSchemaAccess.DepartmentSchema.findAll();
    if (!departments) {
      return null;
    }
    return departments;
  },
  getDepartmentById: async function (departmentId) {
    const departments = await AllSchemaAccess.DepartmentSchema.findOne({
      where: { departmentId: departmentId },
    });
    if (!departments) {
      return null;
    }
    return departments;
  },
  deleteDepartment: async function (departmentId) {
    const deletedDepartment = await AllSchemaAccess.DepartmentSchema.destroy({
      where: { departmentId: departmentId },
    });

    if (!deletedDepartment) {
      return null;
    }
    return deletedDepartment;
  },
  updateDepartment: async function (departmentId, departmentName, oldDepId) {
    const findDepartment = await AllSchemaAccess.DepartmentSchema.findOne({
      where: { departmentId: oldDepId },
    });

    if (!findDepartment) {
      return null;
    }

    
    findDepartment.departmentName = departmentName;
    findDepartment.departmentId = departmentId;

    const update = await AllSchemaAccess.DepartmentSchema.update({
      departmentName,
      departmentId
    }, {
      where: {
        departmentId:oldDepId
      }
    })

    console.log("Find Department->", update);
    return findDepartment;
  },
  getDocumentLink: async function (documentId) {
    const allDocumentsPaths = await AllSchemaAccess.UploadedDocuments.findOne({
      where: { documentid: documentId },
    });

    if (!allDocumentsPaths) {
      return null;
    }

    return allDocumentsPaths;
  },
  findAssociatedVariables: async function (id) {
    const getAssociatedVariables =
      await AllSchemaAccess.certificateDynamic.findOne({
        where: { id: id },
      });

    if (!getAssociatedVariables) {
      return null;
    }
    return getAssociatedVariables;
  },
  getAllStudentVerificationRequests: async function (departmentId) {
    const currentDuration = new Date();
    console.log(departmentId);

    const studentVerificationRequests =
      await AllSchemaAccess.StudentCollegeDetails.findAll({
        where: {
          branch: departmentId,
          verifiedDepartment: false,
          registeredStudent:true,
          // remove the verification requests that have existing lockin duration (i.e. the time is less than lockInDuration)
          [Op.or]: [
            { LockInDuration: null },
            { LockInDuration: { [Op.lt]: currentDuration } },
          ],
        },
      });
      console.log("all requests", studentVerificationRequests);
    return studentVerificationRequests;
  },
  verifyStudent: async function (enrollment) {
    const studentUpdateCount =
      await AllSchemaAccess.StudentCollegeDetails.update(
        {
          verifiedDepartment: true,
          AllowUpdate: false,
          LockInDuration: null,
          comment: null,
        },
        { where: { enrollment: enrollment } },
      );

    return studentUpdateCount;
  },
  createUnlockRequest: async function (enrollment) {
    // Get the current date
    const currentDate = new Date();

    // Calculate tomorrow's date by adding 1 day to the current date
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(currentDate.getDate() + 1);

    const studentUpdateCount =
      await AllSchemaAccess.StudentCollegeDetails.update(
        // update the lockin duration for the next day
        // lockinduration to tomorrow's date
        {
          verifiedDepartment: false,
          AllowUpdate: true,
          LockInDuration: tomorrow,
        },
        { where: { enrollment: enrollment } },
      );

    return studentUpdateCount;
  },
  getUnlockRequest: async function (enrollment) {
    const student = await AllSchemaAccess.StudentCollegeDetails.findOne({
      where: { enrollment: enrollment },
    });

    if (!student) {
      return null;
    }

    return student;
  },
  getAllLockInRequests: async function (departmentId) {
    const studentVerificationRequests =
      await AllSchemaAccess.StudentCollegeDetails.findAll({
        where: {
          branch: departmentId,
          verifiedDepartment: false,
          // if lockInDuration is greater than current date then show PENDING in the student row else show APPROVE and REJECT buttons
          lockInDuration: { [Op.ne]: null },
        },
      });

    console.log("all requests", studentVerificationRequests);

    return studentVerificationRequests;
  },
  rejectLockInRequest: async function (enrollment, comment) {
    // Get the current date
    const currentDate = new Date();

    // Calculate tomorrow's date by adding 1 day to the current date
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(currentDate.getDate() + 1);

    const studentUpdateCount =
      await AllSchemaAccess.StudentCollegeDetails.update(
        // update the lockin duration for the next day
        // lockinduration to tomorrow's date
        {
          verifiedDepartment: false,
          AllowUpdate: true,
          LockInDuration: tomorrow,
          comment: comment,
        },
        { where: { enrollment: enrollment } },
      );

    return studentUpdateCount;
  },
};
module.exports = DepartmentQueries;
