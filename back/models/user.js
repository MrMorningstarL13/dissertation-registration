const {DataTypes} = require('sequelize')

module.exports = (db) => {
    const User = db.define("user", {
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
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        faculty: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        specialization: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        yearOfEnrollment: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        formOfEducation: {
            type: DataTypes.ENUM(["IF","IFR", "ID"])
        },
        isInSuplementaryYear: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        series: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        group: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },{
        freezeTableName: true
    })
}