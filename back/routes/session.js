const express = require('express')
const router = express.Router()
const {sessionController} = require("../controllers")

router.post('/create/:id', sessionController.createSession)

module.exports = router