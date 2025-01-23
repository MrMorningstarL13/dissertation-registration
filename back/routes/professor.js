const express = require('express')
const router = express.Router()
const {uploadProf} = require('../controllers/multerProfessor')
const {professorController} = require("../controllers")

router.post('/uploadRequest/:professorId', uploadProf.single())
router.post('/create', professorController.createProfessor)
router.put('/update/:id', professorController.updateProfessor)
router.get('/getById/:id', professorController.getProfessorById)
router.get('/getAll', professorController.getAllProfessors)

module.exports = router