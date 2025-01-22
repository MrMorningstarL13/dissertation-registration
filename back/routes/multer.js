const express = require('express')
const multerRouter = express.Router()
const {upload} = require('../controllers/multer')

multerRouter.post('/uploadRequest/:userId', upload.single())

module.exports = multerRouter