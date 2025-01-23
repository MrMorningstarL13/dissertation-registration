const express = require("express");
const router = express.Router();
const { requestController } = require("../controllers");

router.post("/create/:studId/:sessionId", requestController.createRequest);
router.patch("/upload/:requestId", requestController.upload);
router.put("/accept/:id", requestController.acceptRequest);
router.put("/deny/:id", requestController.denyRequest);
router.get("/get/:id", requestController.getRequests);
router.get("/get/:studentId/:sessionId", requestController.getRequestFile);

module.exports = router;
