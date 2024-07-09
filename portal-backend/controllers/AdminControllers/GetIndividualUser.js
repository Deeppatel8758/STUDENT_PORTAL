const ResponseCodes = require("../../helper/ResponseCodes");
const AdminQueries = require("../../Queries/AdminQueries");

const GetIndividualUser = [
  async (req, res) => {
    const { username } = req.params;
    const admin = await AdminQueries.GetProfileDetails(username);
    console.log(admin)
    if (admin) {
      return ResponseCodes.successResponseWithData(res, "Success", admin);
    } else {
      return ResponseCodes.errorResponse(
        res,
        "Error in getting profile details"
      );
    }
  },
];

module.exports = GetIndividualUser;
