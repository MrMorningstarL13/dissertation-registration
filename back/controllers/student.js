const {UserModel} = require("../models")

const controller = {
    registerStudent: async (req, res) => {
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

        
        
    },

    getUserById: async (req, res) => {
        try{
            let searchedStudent = await UserModel.findByPk(req.params.id)
            if(searchedStudent != null) {
                res.status(200).json(searchedStudent)
            } else res.status(404).json("Student with specified ID not found!")
        } catch(err){
            console.warn(err)
            res.status(500).json("Server error!")
        }

    }
}