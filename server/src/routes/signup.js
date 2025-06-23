const express = require('express');
const router = express.Router();
const connectMYSQL = require('../config/connection');
const bcrypt = require('bcrypt');

router.post('/login-google', async(req, res) => {
    const { email, password} = req.body
    //find user command
    const CheckUser = 'SELECT * FROM users WHERE email =  ?';
    try {
        const [rows] = await connectMYSQL.execute(sql, [email])
        if (rows.length === 0) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.json({ msg: "User exist", user:rows[0]})

        const hashedPassword = rows[0].password;
        const matchUser = await bcrypt.compare(password, hashedPassword);
        if (matchUser) {
            // Generate JWT token
        } else {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

    } catch (err) {
        res.status(500).json({ msg: "Database error", error: err });
    }

    
})

module.exports = router;