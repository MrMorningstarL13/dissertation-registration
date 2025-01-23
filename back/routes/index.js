const studentRouter = require("./student")
const professorRouter = require("./professor")
const sessionRouter = require("./session")
const requestRouter = require("./request")

const express = require('express')
const router = express.Router()

router.use('/student', studentRouter)
router.use('/professor', professorRouter)
router.use('/session', sessionRouter)
router.use('/request', requestRouter)

module.exports = router