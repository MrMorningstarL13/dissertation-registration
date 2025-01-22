const {DataTypes} = require('sequelize')

module.exports = (db) => {
    const SessionModel = db.define('session', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        availableSlots: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },{
        freezeTableName: true,
    })

    return SessionModel
}