const multer = require("multer");
const path = require("path");
const { StudentModel } = require("../models");

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./uploads/students");
  },
  filename: async (req, file, cb) => {
    try {
      let student = await StudentModel.findByPk(req.params.studentId);
      console.log(student);
      const extension = path.extname(file.originalname);

      const uniqueName =
        "student-" +
        student.id + 
        "." +
        req.params.sessionId +
        "-" +
        student.firstName +
        student.lastName +
        extension;

      cb(null, uniqueName);
    } catch (error) {
      console.warn(error);
      console.warn("Error in upload");
    }
  },
});

const uploadStudent = multer({ storage: storage });

module.exports = { uploadStudent };
