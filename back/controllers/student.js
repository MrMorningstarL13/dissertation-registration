const { StudentModel } = require("../models")

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
            let studentData = { email: req.body.email, password: req.body.password }

            let studentCautat = await StudentModel.findOne({
                where: { email: studentData.email }
            })

            if (!studentCautat) {
                res.status(404).json("account not found")
            } else {
                if (studentCautat.password === studentData.password) {
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


        } catch (error) {
            console.warn("error in update")
            res.status(500).json("error in update")
        }
    }
}