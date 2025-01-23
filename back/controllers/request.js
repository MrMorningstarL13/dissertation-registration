const { RequestModel, SessionModel, StudentModel } = require("../models");
const path = require("path");
const fs = require("fs");

const controller = {
  createRequest: async (req, res) => {
    try {
      console.log(req.body, req.params);
      let data = {
        appTitle: req.body.title,
        appDescription: req.body.description,
        studentId: req.params.studId,
        sessionId: req.params.sessionId,
      };

      console.log(data);

      let createdRequest = await RequestModel.create({
        appTitle: data.appTitle,
        appDescription: data.appDescription,
        requestDate: new Date(),
        studentId: data.studentId,
        sessionId: data.sessionId,
      });
      res.status(200).json(createdRequest);
    } catch (error) {
      console.warn(error);
      res.status(500).json("error creating request");
    }
  },

  upload: async (req, res) => {
    try {
      const { requestId } = req.params; // Use requestId for precise targeting
      console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",requestId ,"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",);
      const updateData = {
        ...req.body, 
      };

      console.log(updateData);
      const [updatedRows] = await RequestModel.update(updateData, {
        where: {
          id: requestId,
        },
      });

      if (updatedRows === 0) {
        return res
          .status(404)
          .json("No matching request found or no updates made.");
      }

      res.status(200).json("Request updated successfully!");
    } catch (error) {
      console.warn(error);
      res.status(500).json("Server error!");
    }
  },

  getRequestFile: async (req, res) => {
    try {
      let studentId = req.params.studentId;
      let sessionId = req.params.sessionId;
      let student = await StudentModel.findByPk(studentId);
      // let request = await RequestModel.findByPk(requestId, {include: 'student'});
      // console.log(request);
      // if(!request)
      //   res.status(404).send('Request not found!')

      const filePath = path.join(
        __dirname,
        `../uploads/students/student-${studentId}.${sessionId}-${student.firstName}${student.lastName}.pdf`
      );
      if (!filePath) return res.status(500).send("Server error!");
      await fs.readFile(filePath, (err, file) => {
        if (err) console.log(err);
        else {
          console.log(filePath);
          res.download(
            filePath,
            `${studentId}_${student.firstName}_${student.lastName}.pdf`
          );
        }
      });
    } catch (err) {
      res.status(404).send("File not found!");
    }
  },

  getRequests: async (req, res) => {
    try {
      let requests = await RequestModel.findAll({
        where: { studentId: req.params.id },
        include: [
          {
            model: SessionModel,
            as: "session",
            include: "professor",
          },
        ],
      });
      res.status(200).json(requests);
    } catch (error) {
      console.warn(error);
      res.status(500).json("error: get requests");
    }
  },

  acceptRequest: async (req, res) => {
    try {
      let evaluatedRequest = await RequestModel.findByPk(req.params.id);
      if (evaluatedRequest) {
        let updatedRequest = await RequestModel.update(
          {
            wasApproved: true,
          },
          { where: { id: req.params.id } }
        );

        let sessionUpdated = await SessionModel.update(
          {
            availableSlots: (availableSlots -= 1),
          },
          { where: { id: updatedRequest.sessionId } }
        );

        let requests = await RequestModel.update(
          {
            wasApproved: false,
          },
          {
            where: { studentId: evaluatedRequest.studentId },
          }
        );

        for (let request of requests) {
        }

        res.status(200).json("Request accepted!");
      } else {
        res.status(404).json("No request found");
      }
    } catch (error) {
      console.warn("error: accept request");
      res.status(500).json("error: accept request");
    }
  },
  //params: id, body: denialJustification
  denyRequest: async (req, res) => {
    try {
      let evaluatedRequest = await RequestModel.findByPk(req.params.id);
      if (evaluatedRequest) {
        let updatedRequest = await RequestModel.update(
          {
            wasApproved: false,
            appTitle: appTitle,
            appDescription: appDescription,
            denialJustification: req.body.denialJustification,
          },
          { where: { id: req.params.id } }
        );
        res.status(200).json("Request denied!");
      } else {
        res.status(404).json("No request found");
      }
    } catch (error) {
      console.warn("error: deny request");
      res.status(500).json("error: deny request");
    }
  },
};

module.exports = controller;
