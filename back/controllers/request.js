const {RequestModel, SessionModel} = require("../models")

const controller = {
    createRequest: async(req, res) => {
        try {
            let data = {
                appTitle: req.body.appTitle,
                appDescription: req.body.appDescription,
            }
    
            let createdRequest = await RequestModel.create({
                appTitle:data.appTitle,
                appDescription: data.appDescription,
                requestDate: new Date()
            })
            res.status(200).json(createdRequest)
        } catch (error) {
            console.warn(error)
            res.status(500).json("error creating request")
        }
        
    },
    acceptRequest: async(req, res) => {

    },
    denyRequest: async(req, res) => {

    }
}

module.exports = controller