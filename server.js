require('dotenv').config()

const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.on('open', () => console.log('Connected to Database'))

const mahasiswaRouter = require('./routes/mahasiswa')
app.use('/mahasiswa',mahasiswaRouter)

app.listen(3000, () => console.log('Server started'))