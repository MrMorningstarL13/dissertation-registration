const { SessionModel, RequestModel, StudentModel } = require("../models");

const controller = {
  getAllSessions: async (req, res) => {
    try {
      let allSessions = await SessionModel.findAll({ include: "professor" });
      res.status(200).json(allSessions);
    } catch (error) {
      console.warn(error);
      res.status(500).json(error.message);
    }
  },
  getSessionsByProf: async (req, res) => {
    try {
        console.log(req.params.id)
      let allSessions = await SessionModel.findAll({
        where: { professorId: req.params.profId },
        include: [{model: RequestModel, include: [StudentModel]} ],
      });
      res.status(200).json(allSessions);
    } catch (error) {
      console.warn(error);
      res.status(500).json(error.message);
    }
  },
  createSession: async (req, res) => {
    try {
      let data = {
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        availableSlots: req.body.availableSlots,
        professorId: req.params.id,
      };

      if (data.availableSlots > 20) {
        res
          .status(400)
          .json("You can't have more than 20 students per session!");
      } else {
        let allSessions = await SessionModel.findAll();
        let flag = 0;
        for (let session of allSessions) {
          if (
            data.startDate < session.endDate ||
            data.endDate > session.startDate
          ) {
            flag = 1;
            break;
          }
        }
        console.log(flag);

        if (flag === 1) {
          res.status(400).json("Sessions are not allowed to overlap");
        } else {
          let createdSession = await SessionModel.create(data);
          res.status(200).json("createdSession");
        }
      }
    } catch (error) {
      console.warn(error);
      res.status(500).json(error.message);
    }
  },
};

module.exports = controller;
