const express = require('express');
const path = require('path');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcryptjs')

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'html', 'register.html')); 
});


router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
    }

    try {
        
        const db = req.db;
        const checkSql = `SELECT * FROM users WHERE username = ? OR email = ?`;

        db.query(checkSql, [username, email], async (err, result) => {
            if (err) {
                console.error('Error checking for duplicate user:', err);
                return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการตรวจสอบข้อมูล' });
            }

            if (result.length > 0) {
                
                return res.status(400).json({ message: 'username หรือ email นี้มีอยู่แล้ว' });
            }

            
            const hashPassword = await bcrypt.hash(password, 10);
            const insertSql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;

            db.query(insertSql, [username, email, hashPassword], (err, result) => {
                if (err) {
                    console.error('Error inserting user:', err);
                    return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' });
                }

                
                res.status(200).json({ message: 'ลงทะเบียนสำเร็จ!' });
            });
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'เกิดข้อผิดพลาด' });
    }
});

module.exports = router;