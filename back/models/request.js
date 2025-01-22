const {DataTypes} = require('sequelize')

module.exports = (db) => {
    const RequestModel = db.define("request", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        wasApproved:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        appTitle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        appDescription: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        denialJustification: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        requestDate: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },{
        freezeTableName: true
    })

    return RequestModel
}