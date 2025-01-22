const multer = require('multer')
const {UserModel} = require('../models')

const storage = multer.diskStorage({

    destination: (req, res, cb) => {
        cb(null, '../uploads/students')
    },
    filename: async (req, file, cb) => {
        try {
        let student = await UserModel.findByPk(req.params.userId)
        const extension = path.extname(file.originalname)
        const uniqueName = student.studentId+ '-' + student.firstName + student.lastName + Date.now() + extension
        cb(null, uniqueName)
        } catch (error) {
            console.warn("Error in upload")
        }

    }
})

const upload = multer({storage: storage})