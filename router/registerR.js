const express = require('express')
const router = express.Router()
const register = require('../controllers/registerC.js')

router.post('/',register)


module.exports = router