const db = require('../config/db');

const StudentModel = require('./student')(db);
const RequestModel = require('./request')(db);
const SessionModel = require('./session')(db);
const ProfessorModel = require('./professor')(db);

Student.hasMany(RequestModel, {foreignKey: 'studentId'})
Request.belongsTo(StudentModel, {foreignKey: 'studentId'})

Professor.hasMany(SessionModel, {foreignKey: 'profId'})
Session.belongsTo(ProfessorModel, {foreignKey: 'profId'})

Session.belongsToMany(RequestModel, {through: 'SessionRequestJunction'})
Request.belongsToMany(SessionModel, {through: 'SessionRequestJunction'})

module.exports = {
    StudentModel,
    RequestModel,
    SessionModel,
    ProfessorModel,
}