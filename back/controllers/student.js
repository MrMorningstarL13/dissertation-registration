const { StudentModel, ProfessorModel } = require("../models");
const path = require("path");
const fs = require("fs");

const controller = {
  createStudent: async (req, res) => {
    try {
      let studentData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        faculty: req.body.faculty,
        specialization: req.body.specialization,
        yearOfEnrollment: req.body.year,
        phoneNumber: req.body.phone,
        formOfEducation: req.body.edFormat,
        series: req.body.series,
        group: req.body.group,
        email: req.body.email,
        password: req.body.password,
      };

      let studentCreat = await StudentModel.create(studentData);
      console.log(studentCreat.dataValues.password);

      res.status(200).json(studentCreat);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  logIn: async (req, res) => {
    try {
      let data = { email: req.body.email, password: req.body.password };

      let studentCautat = await StudentModel.findOne({
        where: { email: data.email },
      });

      if (!studentCautat) {
        let professorCautat = await ProfessorModel.findOne({
          where: { email: data.email },
        });

        if (!professorCautat) {
          res.status(404).json("no account was found");
        } else {
          if (professorCautat.password === password) {
            req.session.id = studentCautat.id;
            req.session.email = studentCautat.email;
            res.status(200).json("log in successful");
          }
        }
      } else {
        if (studentCautat.password === data.password) {
          res.status(200).json(studentCautat);
        } else {
          res.status(403).json("incorrect password");
        }
      }
    } catch (error) {
      res.status(500).json("error logging in");
    }
  },

  logOut: async (req, res) => {
    if (req.session.id) {
      req.session.destroy((error) => {
        if (error) {
          res.status(500).json("Error logging out");
        } else res.status(200).json("Logged out");
      });
    } else {
      res.status(404).json("No active session");
    }
  },

  getStudentById: async (req, res) => {
    try {
      let searchedStudent = await StudentModel.findByPk(req.params.id);
      if (searchedStudent != null) {
        res.status(200).json(searchedStudent);
      } else res.status(404).json("Student with specified ID not found!");
    } catch (err) {
      console.warn(err);
      res.status(500).json("Server error!");
    }
  },

  updateStudent: async (req, res) => {
    try {
      let student = await StudentModel.update(
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phoneNumber: req.body.phoneNumber,
          faculty: req.body.faculty,
          specialization: req.body.specialization,
          yearOfEnrollment: req.body.yearOfEnrollment,
          isInSuplementaryYear: req.body.isInSuplementaryYear,
          series: req.body.series,
          group: req.body.group,
          email: req.body.email,
          password: req.body.password,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      if (student) {
        res.status(200).json("update successful");
      }
    } catch (error) {
      console.warn("error in update");
      res.status(500).json("error in update");
    }
  },

  getRequestFile: async(req, res) =>{
      try{
        let profId = req.params.profId;
        let sessionId = req.params.sessionId;
        let prof = await ProfessorModel.findByPk(profId);
        // let request = await RequestModel.findByPk(requestId, {include: 'student'});
        // console.log(request);
        // if(!request)
        //   res.status(404).send('Request not found!')
       
        const filePath = path.join(__dirname, `../uploads/professors/professor-${profId}.${sessionId}-${prof.firstName}${prof.lastName}.pdf`);
        console.log(filePath);
        if (!filePath)
          return res.status(500).send('Server error!');  
        await fs.readFile(filePath, (err, file) => {
          if (err) 
            console.log(err); 
          else {
            console.log(filePath);
            res.download(filePath, `${prof.firstName}_${prof.lastName}.pdf`);
          } 
        }) 
      }catch(err)
      {
        console.log(err)
        res.status(404).send('File not found!')
  
      }
    },

  // verifyLogIn = async (req, res, next) => {
  //     const { id } = req.session;  // Only check the user ID in the session
  //     if (!id) {
  //       return res.status(403).send({ message: "User not logged in." });
  //     }

  //     const user = await User.findByPk(id); // You can use this if you're verifying user existence
  //     if (!user) {
  //       return res.status(403).send({ message: "User not found in the session." });
  //     }
  //     next();
  //   },
};

module.exports = controller;
