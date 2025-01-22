const express = require('express')
const router = express.Router()
const {uploadStudent} = require('../controllers/multerStudent')
const {studentController} = require("../controllers")

router.post('/uploadRequest/:studentId', uploadStudent.single())
router.post('/signUp', studentController.createStudent)
router.post('/logIn', studentController.logIn)
router.get('/logOut', studentController.logOut)
router.get('/get/:id',studentController.getStudentById)
router.put('/update/:id', studentController.updateStudent)

module.exports = router