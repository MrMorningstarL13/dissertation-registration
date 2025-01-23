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
            allowNull: false,
        },
        yearOfEnrollment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        formOfEducation: {
            type: DataTypes.ENUM(["IF","IFR", "ID"])
        },
        isInSuplementaryYear: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        series: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        group: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },{
        freezeTableName: true
    })
}