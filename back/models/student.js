const {DataTypes} = require('sequelize')

module.exports = (db) => {
    const Student = db.define("student", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dateOfBirth: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        faculty: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        specialization: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        yearOfEnrollment: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        isInSuplementaryYear: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        series: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        group: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    })
}