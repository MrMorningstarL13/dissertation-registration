const express = require('express')
const router = express.Router()
const {uploadProf} = require('../controllers/multerProfessor')
const {professorController} = require("../controllers")

router.post('/uploadRequest/:professorId/:sessionId', uploadProf.single(), 
async function (req, res, next) {
    try {
      console.log(req.params);  
      res.status(200).json("Request updated successfully!");
    } catch (error) {
      console.warn(error);
      console.warn("Error in upload");
    }
  }
)
router.post('/create', professorController.createProfessor)
router.put('/update/:id', professorController.updateProfessor)
router.post('/login', professorController.logIn)
router.get('/getById/:id', professorController.getProfessorById)
router.get('/getAll', professorController.getAllProfessors)

module.exports = router