const express = require('express')
const router = express.Router()
const Mahasiswa = require('../modules/mahasiswa')

// Getting all data
router.get('/', async (req, res) => {
    try {
        const mahasiswa = await Mahasiswa.find()
        res.json(mahasiswa)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting One data
router.get('/:id', getMahasiswa, (req, res) => {
    res.json(res.mahasiswa)
})

// Creating one data
router.post('/', async (req, res) => {
    const mahasiswa = new Mahasiswa({
        name: req.body.name,
        nim: req.body.nim
    })
    try {
        const newMahasiswa = await mahasiswa.save()
        res.status(201).json(newMahasiswa)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Updating One data
router.put('/:id', getMahasiswa, async (req, res) => {
    if (req.body.name != null) {
        res.mahasiswa.name = req.body.name
    }
    if (req.body.nim != null) {
        res.mahasiswa.nim = req.body.nim
    }
    try {
        const updatedMahasiswa = await res.mahasiswa.save()
        res.json(updatedMahasiswa)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting One data
router.delete('/:id', getMahasiswa, async (req, res) => {
    try {
        await res.mahasiswa.remove()
        res.json({ message: 'Deleted Mahasiswa' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getMahasiswa(req, res, next) {
    let mahasiswa
    try {
        mahasiswa = await Mahasiswa.findById(req.params.id)
        if (mahasiswa == null) {
            return res.status(404).json({ message: 'Cannot find mahasiswa' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.mahasiswa = mahasiswa
    next()
}


module.exports = router