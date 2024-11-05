const {DataTypes} = require('sequelize')

module.exports = (db) => {
    const Professor = db.define('professor', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        freeSpots: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },{
        freezeTableName: true,
    })
}