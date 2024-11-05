const {DataTypes} = require('sequelize')

module.exports = (db) => {
    const Request = db.define("request", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        studentId:{
            type: DataTypes.INTEGER,
            allowNull: false,
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
    },{
        freezeTableName: true
    })
}