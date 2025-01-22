const {SessionModel} = require('../models')

const controller = {
    createSession: async(req, res) =>{
        try {
            let data = {
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                availableSlots: req.body.slots,
            }

            if(availableSlots > 20) {
                res.status(400).json("You can't have more than 20 students per session!")
            } else {
                let allSessions = await SessionModel.findAll()
                for(let session of allSessions){
                    if(session.startDate < data.endDate || session.endDate > data.startDate){
                        res.status(400).json("Sessions are not allowed to overlap")
                    } else {
                        let createdSession = await SessionModel.create(data)
                        res.status(200).json(createdSession)
                    }
                }
            }
        } catch (error) {
            console.warn(error)
            res.status(500).json('server error when creating session')
        }
        
    },
    // getRemainingSlots: async(req, res) => {
    //     try {
    //         let searchedSession = await SessionModel.findByPk(req.params.sessionId)
    //         if(searchedSession){
    //             let slots = [searchedSession.availableSlots, searchedSession.maximumSlots]
    //             res.status(200).json(slots)
    //         }
    //     } catch (error) {
    //         console.warn(error)
    //         res.status(500).json('server error when getting remaining slots')
    //     }
    // }
}

module.exports= controller