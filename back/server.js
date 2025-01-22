const express = require('express')
const db = require('./models/index').connection;
const router = require('./routes')

const app = express()
const port = 8080

app.use(express.json())

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})

app.use('/api',router)

app.get("/salut", (req, res) => {
    res.status(200).send("Salut")
})

app.get("/reset-db", async (req, res) => {
    try{
        await db.sync({force: true})
        res.status(200).send("db reset good")
    } catch(err){
        console.log(err)
    }
})