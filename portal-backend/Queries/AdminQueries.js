const CertificateDynamicSchema = require("../Schema/CertificateDynamic");
const AllSchemaAccess = require("../helper/DbConnect");

const AdminQueries = {
  UploadStudentExcel: async function (obj, transaction) {
    await AllSchemaAccess.StudentCollegeDetails.create(obj, { transaction });
  },

  SemesterProgression: async function (semester, branch, listOfStudent) {
    await AllSchemaAccess.StudentCollegeDetails.update(
      {
        semester:
          semester == 8 ? 0 : AllSchemaAccess.sequelize.literal("semester + 1"),
      },
      {
        where: {
          semester: semester,
          branch: branch,
          // enrollment: {
          //     [Sequelize.Op.in]: listOfStudent
          // }
          enrollment: listOfStudent,
        },
      },
    );
  },

  GetSearchStudent: async function (query) {
    const students = await AllSchemaAccess.StudentCollegeDetails.findAll(query);
    return students;
  },

  AdminUpdatePassword: async function (username) {
    const user = await AllSchemaAccess.AdminAndDepartment.findOne({
      where: { username: username },
    });

    return user;
  },

  AdminUpdateUsername: async function (username) {
    const user = await AllSchemaAccess.AdminAndDepartment.findOne({
      where: { username: username },
    });

    return user;
  },

  AdminUpdateDetails: async function (username) {
    const admin = await AllSchemaAccess.AdminAndDepartment.findOne({
      where: { username: username },
    });

    return admin;
  },

  CreateDynamicCategory: async function (categoryName, categoryType) {
    await AllSchemaAccess.documentCategory.create({
      categoryname: categoryName,
      categorydatatype: categoryType,
    });
  },

  GetAllDynamicCategory: async function () {
    const category = await AllSchemaAccess.documentCategory.findAll();
    return category;
  },

  GetDynamicCategoryById: async function (id) {
    const category = await AllSchemaAccess.documentCategory.findOne({
      where: { categoryid: id },
    });
    return category;
  },

  UpdateDynamicCategory: async function (categoryName, categoryType, id) {
    console.log("query: ", categoryName, categoryType, id);
    const category = await AllSchemaAccess.documentCategory.update(
      {
        categoryname: categoryName,
        categorydatatype: categoryType,
      },
      {
        where: { categoryid: id },
      },
    );
    console.log("category: ", category);
    return category;
  },

  DeleteDynamicCategory: async function (id) {
    const deletedRows = await AllSchemaAccess.documentCategory.destroy({
      where: {
        categoryid: id,
      },
    });

    return deletedRows;
  },

  CreateDynamicCertificate: async function (data) {
    console.log(data);
    const datas = await AllSchemaAccess.certificateDynamic.create(data);

    if (datas) {
      return datas;
    }

    return null;
  },
  DeleteDynamicCertificate: async function (id) {
    const data = await AllSchemaAccess.certificateDynamic.update({
      status:false
    },
      {
      where: {
        id: id,
      },
    });

    if (data) {
      return data;
    }

    return null;
  },
  UpdateDynamicCertificate: async function (data) {
    const datas = await AllSchemaAccess.certificateDynamic.findOne({
      where: {
        id: data.id,
      },
    });

    if (datas) {
      datas.dataValues = data;
      await datas.save();
      return datas;
    }

    return null;
  },
  GetAllCertificate: async function () {
    const certificate =
      await AllSchemaAccess.certificateDynamic.findAndCountAll();

    return certificate;
  },
  checkCertificateSerial: async function (CertificateSerial) {
    const certificate = await AllSchemaAccess.certificateDynamic.findOne({
      where: {
        CertificateSerial: CertificateSerial,
      },
    });
    return certificate;
  },
  checkForDynamicId: async function (id) {
    const certificate = await AllSchemaAccess.certificateDynamic.findOne({
      where: {
        id: id,
      },
    });
    return certificate;
  },
  GetRegisteredStudents: async function (
    sem,
    department,
    SEMESTER,
    DEPARTMENT,
  ) {
    // DOUBT: what to do when sem is undefined, department is undefined
    if (!sem || !SEMESTER.some((el) => el === sem)) {
      // if semester is undefined or not valid select all semester [1, ...9]
      sem = {
        [Op.in]: SEMESTER,
      };
    }

    if (!department || !DEPARTMENT.some((el) => el === department)) {
      department = {
        [Op.in]: DEPARTMENT,
      };
    }
    console.log("pela");
    const students = await AllSchemaAccess.StudentCollegeDetails.findAll({
      where: {
        semester: sem,
        branch: department,
      },
    });
    console.log("dusra");
    return students;
  },
  QueryCertificateRequests: async function (filter) {
    let whereClause = {};

    if (filter.startDate && filter.endDate) {
      whereClause = {
        createdAt: {
          [Op.gte]: filter.startDate,
          [Op.lte]: filter.endDate,
        },
      };
    }

    if (filter.enrollmentNo) {
      whereClause.enrollment = filter.enrollmentNo;
    }

    const requests = await CertificateRequest.findAll({
      where: whereClause,
    });

    return requests;
  },
  GetProfileDetails: async function (username) {
    const user = await AllSchemaAccess.AdminAndDepartment.findOne({
      where: {
        username: username,
      },
    });
    return user;
  },
};

module.exports = AdminQueries;
