const db = require('../config/db');

const User = require('./user')(db);
const Request = require('./request')(db);
const Session = require('./session')(db);

User.hasMany(Request, {foreignKey: 'studentId'})
Request.belongsTo(User, {foreignKey: 'studentId'})

User.hasMany(Session, {foreignKey: 'professorId'})
Session.belongsTo(User, {foreignKey: 'professorId'})

Session.hasMany(Request, {foreignKey: 'sessionId'})
Request.belongsTo(Session, {foreignKey: 'sessionId'})


module.exports = {
    connection: db,
    UserModel,
    RequestModel,
    SessionModel,
}