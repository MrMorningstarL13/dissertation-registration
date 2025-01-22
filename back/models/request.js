const {DataTypes} = require('sequelize')

module.exports = (db) => {
    const RequestModel = db.define("request", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        wasApproved:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        appTitle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        denialJustification: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        requstDate: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },{
        freezeTableName: true
    })

    return RequestModel
}