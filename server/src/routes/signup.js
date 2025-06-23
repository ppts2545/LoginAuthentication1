const express = require('express');
const router = express.Router();
const connectMYSQL = require('../config/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
    const { name, email, password} = req.body;

    // Check if user already exists
    const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
    try {
        const [rows] = await connectMYSQL.execute(checkUserQuery, [email]);
        if (rows.length > 0) {
            return res.status(400).json({ msg: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into the database
        const insertUserQuery = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        await connectMYSQL.execute(insertUserQuery, [name, email, hashedPassword]);

        //Generate JWT token
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ msg: "User registered successfully", token });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
})