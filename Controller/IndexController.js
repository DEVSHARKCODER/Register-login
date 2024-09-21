const express = require('express');
const path = require('path');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcryptjs')

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'html', 'index.html')); 
});


module.exports= router;