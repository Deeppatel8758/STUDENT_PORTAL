const DepartmentQueries = require("../../Queries/DepartmentQueries");
const ResponseCodes = require("../../helper/ResponseCodes");

const GetAllUsers = [
  async (req, res) => {
    try {
      const users = await DepartmentQueries.getAllUsers();

      if (users) {
        return ResponseCodes.successResponseWithData(
          res,
          "Users Fetched Successfully",
          users
        );
      } else {
        return ResponseCodes.errorResponse(res, "Error in fetching users");
      }
    } catch (error) {
      console.log(error);
      return ResponseCodes.errorResponse(res, "Error in fetching users");
    }
  },
];

module.exports = GetAllUsers;
