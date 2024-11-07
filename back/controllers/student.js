const {StudentModel} = require("../models")

const controller = {
    registerUser: async (req, res) => {
        let userData = {
            firstName: req.body.firstName,
            lastname: req.body.lastname,
            dateOfBirth: req.body.dateOfBirth,
            faculty: req.body.faculty,
            specialization: req.body.specialization,
            yearOfEnrollment: req.body.yearOfEnrollment,
            isInSuplementaryYear: req.body.isInSuplementaryYear,
            series: req.body.series,
            group: req.body.group,
        }

        let errorArr = []

        
        
    }
}