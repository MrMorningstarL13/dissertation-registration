const multer = require("multer");
const path = require("path");
const { ProfessorModel } = require("../models");

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./uploads/professors");
  },
  filename: async (req, file, cb) => {
    try {
        console.log(req.params)
      let professor = await ProfessorModel.findByPk(req.params.professorId);

      const extension = path.extname(file.originalname);

      const uniqueName =
        "professor-" +
        professor.id +
        "." +
        req.params.sessionId +
        "-" +
        professor.firstName +
        professor.lastName +
        extension;

      cb(null, uniqueName);
    } catch (error) {
        console.log(error)
      console.warn("Error in upload");
    }
  },
});

const uploadProf = multer({ storage: storage });

module.exports = { uploadProf };
