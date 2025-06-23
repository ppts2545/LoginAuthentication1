const express = require('express');
const router = express.Router()
const connectMYSQL = require('../config/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const authMiddleware = require('../middleware/authMiddleware');


router.get('/', (req, res) => {

})

router.post('/posts', authMiddleware, (req, res) => {
    
})

module.exports = router