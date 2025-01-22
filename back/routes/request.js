const express = require('express')
const router = express.Router()
const {requestController} = require("../controllers")

router.post('/create/:studId/:sessionId', requestController.createRequest)
router.patch('/upload/:id', requestController.upload)
router.put('/accept/:id', requestController.acceptRequest)
router.put('/deny/:id',requestController.denyRequest)

module.exports = router