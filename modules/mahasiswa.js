const mongoose = require('mongoose')

const mahasiswaSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    nim: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Mahasiswa', mahasiswaSchema)