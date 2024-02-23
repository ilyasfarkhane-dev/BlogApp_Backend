const express = require('express');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    
    const users = [
        {
            username: "ilyas",
            password: "admin",
            id: 123 
        }
    ];

    const { username, password } = req.body;

   
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }
    const token = jwt.sign({ userId: user.id, username }, 'secret_key', { expiresIn: '2h' });
    
    res.json({ token });
};
