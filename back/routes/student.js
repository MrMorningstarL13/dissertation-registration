const express = require("express");
const router = express.Router();
const { uploadStudent } = require("../controllers/multerStudent");
const { studentController } = require("../controllers");
const { RequestModel } = require("../models");

router.post(
  "/uploadRequest/:studentId/:sessionId",
  uploadStudent.single(),
  async function (req, res, next) {
    try {
      console.log(req.params);
      const userId = req.params.studentId;
      const sessionId = req.params.sessionId;

      const updateData = { hasUploaded: true };

      const [updatedRows] = await RequestModel.update(updateData, {
        where: {
          studentId: userId,
          sessionId: sessionId,
        },
      });

      if (updatedRows === 0) {
        return res
          .status(404)
          .json("No matching request found or no updates made.");
      }

      res.status(200).json("Request updated successfully!");
    } catch (error) {
      console.warn(error);
      console.warn("Error in upload");
    }
  }
);
router.post("/signUp", studentController.createStudent);
router.post("/logIn", studentController.logIn);
router.get("/logOut", studentController.logOut);
router.get("/get/:id", studentController.getStudentById);
router.put("/update/:id", studentController.updateStudent);

module.exports = router;
