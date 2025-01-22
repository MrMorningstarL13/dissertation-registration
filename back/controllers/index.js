const professor = require("./professor")
const request = require("./request")
const session = require("./session")
const student = require("./student")

module.exports = {
    professorController: professor,
    requestController: request,
    sessionController: session,
    studentController: student
}