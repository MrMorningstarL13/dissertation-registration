const {ProfessorModel, SessionModel} = require("../models")

const controller = {
    createProfessor: async (req, res) => {
        try {
            let professorData = {
                firstName: req.body.firstName,
                lastname: req.body.lastname,
                faculty: req.body.faculty,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                password: req.body.password,
            }

            let professorCreat = await ProfessorModel.create(professorData)
            res.status(200).json(professorCreat)

        } catch (error) {
            res.status(500).json("error in creating professor")
        }
    },

    getProfessorById: async (req, res) => {
        try {
            let searchedProfessor = await ProfessorModel.findByPk(req.params.id)
            if (searchedProfessor != null) {
                res.status(200).json(searchedProfessor)
            } else res.status(404).json("professor with specified ID not found!")
        } catch (err) {
            console.warn('server error')
            res.status(500).json("Server error!")
        }
    },

    getAllProfessors: async (req, res) => {
        try {
            let professorsArr = await ProfessorModel.findAll({
                include:[{
                    model: SessionModel,
                    attributes: ["availableSlots","maximumSlots"]
                }]
            })
            if(!professorsArr){
                res.status(404).json("No professors!")
            } else {
                res.status(200).json(professorsArr)
            }
        } catch (error) {
            console.warn('server error')
            res.status(500).json("Server error!")
        }
    },

    updateProfessor: async (req, res) => {
        try {
            let professor = await ProfessorModel.update({
                firstName: req.body.firstName,
                lastname: req.body.lastname,
                faculty: req.body.faculty,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                password: req.body.password,
            }, {
                where: {
                    id: req.params.id
                }
            })

            if(professor){
                res.status(200).json("update successful")
            }

        } catch (error) {
            console.warn("error in update")
            res.status(500).json("error in update")
        }
    }
}

module.exports = controller