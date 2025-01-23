const {DataTypes} = require('sequelize')

module.exports = (db) => {
    const Session = db.define('session', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        profId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        requestId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },{
        freezeTableName: true,
    })
}