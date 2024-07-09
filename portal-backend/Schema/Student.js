const { DataTypes } = require("sequelize");

const StudentSchema = {
  StudentCollegeDetails: {
    role: {
      type: DataTypes.ENUM,
      values: ["1", "2", "3"],
      allowNull: false,
      defaultValue: "3",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    middleName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    enrollment: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
      len: [12, 12],
      primaryKey: true,
    },
    caste: {
      type: DataTypes.ENUM,
      values: ["OPEN", "OBC", "SC", "ST", "VJ", "NT", "OTHER"],
      allowNull: true,
    },
    admissionCategory: {
      type: DataTypes.ENUM,
      values: ["OPEN", "OBC", "SC", "ST", "VJ", "NT", "OTHER"],
      allowNull: true,
    },
    gender: {
      type: DataTypes.ENUM,
      values: ["MALE", "FEMALE", "OTHER"],
      allowNull: false,
    },
    admissionYear: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    semester: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
      min: 1,
      max: 8,
    },
    branch: {
      type: DataTypes.INTEGER,
      allowNull: false,
      min: 1,
      max: 17,
    },
    course: {
      type: DataTypes.INTEGER,
      allowNull: true,
      min: 1,
      max: 100,
    },
    religion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    verifiedDepartment: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    registeredStudent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    verifiedStudentSection: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    profileUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    signatireUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    AllowUpdate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    LockInDuration: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    // comment when the faculty rejects the update profile request (lock in request)
    comments: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  StudentPersonalDetails: {
    enrollment: {
      type: DataTypes.BIGINT,
      unique: true,
      allowNull: false,
      references: {
        model: "StudentCollegeDetails",
        key: "enrollment",
      },
    },
    contactNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
      len: [10, 10],
    },
    aadhar: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
      len: [12, 12],
    },
    voterId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      len: [10, 10],
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    bloodGroup: {
      type: DataTypes.ENUM,
      values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      allowNull: false,
    },

    residentalAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    residentalCity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    residentalState: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reisentalCountry: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    residentalPincode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [6, 6],
    },
    permanentAddress1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permanentAddress2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permanentCity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permanentState: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permanentCountry: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permanentPincode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [6, 6],
    },
    sscyear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sscpr: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    hscyear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hscpr: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    fathername: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    mothername: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fatheroccupation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fathercontactNumber: {
      type: DataTypes.BIGINT,
      allowNull: true,
      unique: true,
      len: [10, 10],
    },
    officeAdd1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    officeAdd2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    officeCity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    officeState: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    officeCountry: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    officePincode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [6, 6],
    },
    motheroccupation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    familyincome: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
};

module.exports = StudentSchema;
