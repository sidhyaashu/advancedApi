const express = require('express')
const router = express.Router()
const noteControllers = require('../controllers/noteC.js')

router.post('/',noteControllers.createNote) //create a note
router.get('/',noteControllers.getNote) //get a note
router.put('/:id',noteControllers.updateNote) //update a note
router.delete('/:id',noteControllers.deleteNote) //delete a note

module.exports = router