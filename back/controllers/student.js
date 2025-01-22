const { StudentModel, ProfessorModel } = require("../models")

const controller = {
    createStudent: async (req, res) => {
        try {
            let studentData = {
                firstName: req.body.firstName,
                lastname: req.body.lastname,
                faculty: req.body.faculty,
                specialization: req.body.specialization,
                yearOfEnrollment: req.body.yearOfEnrollment,
                isInSuplementaryYear: req.body.isInSuplementaryYear,
                series: req.body.series,
                group: req.body.group,
                email: req.body.email,
                password: req.body.password,
            }

            let studentCreat = await StudentModel.create(studentData)
            res.status(200).json(studentCreat)

        } catch (error) {
            res.status(500).json("error in creating student")
        }
    },

    logIn: async (req, res) => {
        try {
            let data = { email: req.body.email, password: req.body.password }

            let studentCautat = await StudentModel.findOne({
                where: { email: data.email }
            })

            if (!studentCautat) {
                let professorCautat = await ProfessorModel.findOne({
                    where: { email: data.email }
                })

                if(!professorCautat){
                    res.status(404).json('no account was found')
                } else {
                    if(professorCautat.password ===password){
                        res.status(200).json("log in successful")
                    }
                }
            } else {
                if (studentCautat.password === data.password) {
                    res.status(200).json("log in successful")
                } else {
                    res.status(403).json("incorrect password")
                }
            }
        } catch (error) {
            res.status(500).json("error logging in")
        }

    },

    getStudentById: async (req, res) => {
        try {
            let searchedStudent = await StudentModel.findByPk(req.params.id)
            if (searchedStudent != null) {
                res.status(200).json(searchedStudent)
            } else res.status(404).json("Student with specified ID not found!")
        } catch (err) {
            console.warn(err)
            res.status(500).json("Server error!")
        }
    },

    updateStudent: async (req, res) => {
        try {
            let student = await StudentModel.update({
                firstName: req.body.firstName,
                lastname: req.body.lastname,
                phoneNumber: req.body.phoneNumber,
                faculty: req.body.faculty,
                specialization: req.body.specialization,
                yearOfEnrollment: req.body.yearOfEnrollment,
                isInSuplementaryYear: req.body.isInSuplementaryYear,
                series: req.body.series,
                group: req.body.group,
                email: req.body.email,
                password: req.body.password,
            }, {
                where: {
                    id: req.params.id
                }
            })

            if(student){
                res.status(200).json("update successful")
            }

        } catch (error) {
            console.warn("error in update")
            res.status(500).json("error in update")
        }
    }
}

module.exports = controller