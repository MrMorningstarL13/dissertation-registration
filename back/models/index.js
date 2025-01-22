const db = require('../config/db');

const StudentModel = require('./student')(db);
const RequestModel = require('./request')(db);
const SessionModel = require('./session')(db);
const ProfessorModel = require("./professor")(db);

StudentModel.hasMany(RequestModel)
RequestModel.belongsTo(StudentModel)

ProfessorModel.hasMany(SessionModel)
SessionModel.belongsTo(ProfessorModel)

SessionModel.hasMany(RequestModel)
RequestModel.belongsTo(SessionModel)


module.exports = {
    connection: db,
    StudentModel,
    RequestModel,
    SessionModel,
    ProfessorModel,
}