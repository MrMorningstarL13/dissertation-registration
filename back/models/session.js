const {DataTypes} = require('sequelize')

module.exports = (db) => {
    const SessionModel = db.define('session', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
        maximumSlots: {
            type: DataTypes.INTEGER,
            defaultValue: 20,
        }
    },{
        freezeTableName: true,
    })

    return SessionModel
}