const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../uploads"), 
  
  filename: (req, file, cb) => {
    const enrollment = req.body.enrollment;
    

    const uniqueFilename = `${enrollment}-${Date.now()}${path.extname(
      file.originalname,
    )}`;
    cb(null, uniqueFilename);
  },
});

const upload = multer({ storage });

module.exports = upload;
