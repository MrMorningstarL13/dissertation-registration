const express = require('express')
const router = express.Router()
const {sessionController} = require("../controllers")

router.post('/create/:id', sessionController.createSession)
router.get('/', sessionController.getAllSessions)
router.get('/:profId', sessionController.getSessionsByProf)

module.exports = router