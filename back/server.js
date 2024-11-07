const express = require('express')
const db = require('./config/db');

const app = express()
const port = 8080

app.use(express.json())

app.listen(port, () => {
    console.log(`App started at http://localhost:${port}`)
})

app.get("/salut", (req, res) => {
    res.status(200).send("Salut")
})

app.get("/reset-db", async (req, res) => {
    try{
        await db.sync({force: true})
        res.status(200).send("Database reset succesfully")
    } catch(err){
        console.log(err)
    }
})