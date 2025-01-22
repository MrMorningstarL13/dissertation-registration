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
        try {
            let evaluatedRequest = await RequestModel.findByPk(req.params.id)
            if(evaluatedRequest){
                let updatedRequest = await RequestModel.update({
                    wasApproved: true,
                    appTitle: appTitle,
                    appDescription: appDescription,
                    denialJustification: null
                }, {where: {id:req.params.id}})
            
            let sessionUpdated = await SessionModel.update({
                availableSlots: availableSlots -= 1
            }, {where: {id: updatedRequest.sessionId}})
            
            } else {
                res.status(404).json("No request found")
            }
        } catch (error) {
            console.warn("error: accept request")
            res.status(500).json("error: accept request")
        }
    },
    //params: id, body: denialJustification
    denyRequest: async(req, res) => {
        try {
            let evaluatedRequest = await RequestModel.findByPk(req.params.id)
            if(evaluatedRequest){
                let updatedRequest = await RequestModel.update({
                    wasApproved: false,
                    appTitle: appTitle,
                    appDescription: appDescription,
                    denialJustification: req.body.denialJustification
                }, {where: {id:req.params.id}})
                res.status(200).json("Request denied successfully")
            } else {
                res.status(404).json("No request found")
            }
        } catch (error) {
            console.warn("error: deny request")
            res.status(500).json("error: deny request")
        }
    }
}

module.exports = controller