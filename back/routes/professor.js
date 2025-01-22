const express = require('express')
const router = express.Router()
const {uploadProf} = require('../controllers/multerProf')

router.post('/uploadRequest/:professorId', uploadProf.single())

module.exports = router