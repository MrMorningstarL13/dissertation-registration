const multer = require('multer')
const { ProfessorModel } = require('../models')

const storage = multer.diskStorage({

    destination: (req, res, cb) => {
        cb(null, '../uploads/professors')
    },
    filename: async (req, file, cb) => {
        try {
            let professor = await ProfessorModel.findByPk(req.params.professorId)

            const extension = path.extname(file.originalname)

            const uniqueName = "professor-" + professor.id + '-' + professor.firstName + professor.lastName + Date.now() + extension

            cb(null, uniqueName)
        } catch (error) {
            console.warn("Error in upload")
        }

    }
})

const uploadProf = multer({ storage: storage })

module.exports = { uploadProf }