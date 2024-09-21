const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const path = require('path');
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'html', 'login.html')); 
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

   
    if (!username || !password) {
        return res.status(400).json({ message: 'กรุณากรอก User และ Password' });
    }

    try {
        req.db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
            if (err) return res.status(500).json({ message: 'Error querying database' });
            if (results.length === 0) return res.status(401).json({ message: 'Username not found' });

            const user = results[0];
            const match = await bcrypt.compare(password, user.password);
            if (!match) return res.status(401).json({ message: 'Password was wrong' });

            //Session
            req.session.username = username;
            return res.json({ message: 'Login Success' });
        });
    } catch (err) {
        console.error('Server Error:', err);
        return res.status(500).json({ message: 'Server Error' });
    }
});



module.exports = router;