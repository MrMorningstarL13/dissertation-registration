const express = require('express')
const router = express.Router()
const {uploadStudent} = require('../controllers/multerStudent')

router.post('/uploadRequest/:studentId', uploadStudent.single())

module.exports = router