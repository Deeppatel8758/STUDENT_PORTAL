const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../uploads/certificateFormat"), // Absolute path to the uploads directory
  filename: (req, file, cb) => {
    const uniqueFilename = `${Date.now()}-${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  },
});

const imageMimeAllowedOnly = (req, file, cb) => {
  if (
    file.mimetype ==
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.mimetype == "application/msword"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: imageMimeAllowedOnly,
});

module.exports = upload;
