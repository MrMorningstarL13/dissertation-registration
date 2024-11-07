const db = require('../config/db');

const Student = require('./student')(db);
const Request = require('./request')(db);
const Session = require('./session')(db);
const Professor = require('./professor')(db);

Student.hasMany(Request, {foreignKey: 'studentId'})
Request.belongsTo(Student, {foreignKey: 'studentId'})

Professor.hasMany(Session, {foreignKey: 'profId'})
Session.belongsTo(Professor, {foreignKey: 'profId'})

Session.belongsToMany(Request, {through: 'SessionRequestJunction'})
Request.belongsToMany(Session, {through: 'SessionRequestJunction'})

module.exports = {
    Student,
    Request,
    Session,
    Professor,
}