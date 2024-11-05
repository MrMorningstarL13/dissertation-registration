import express from 'express'

const app = express()
const port = 8080

app.use(express.json())

app.listen(port, () => {
    console.log(`App started at http://localhost:${port}`)
})

app.get("/salut", (req, res) => {
    res.status(200).send("Salut")
})