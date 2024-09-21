const express = require('express');
const mysql = require('mysql');
const path = require('path');
const session = require('express-session');
const { configureSession, setUserSession, getUserSession, clearUserSession } = require('./Controller/sessionController');
const isAuthenticated = require('./Controller/authMiddleware');
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const dotenv = require('dotenv');
dotenv.config();

const { HOST_NAME, USER, PASSWORD, DATABASE_NAME ,SECRET_KEY} = process.env;

const db = mysql.createConnection({
    host: HOST_NAME,
    user: USER,
    password:'',  
    database: DATABASE_NAME
});
db.connect((err) => {
    if (err) {
        console.log('Database Error: ' + err);
        return;
    }
});

app.use((req, res, next) => {
    req.db = db; 
    next();
});


app.use(session({
    secret: SECRET_KEY, 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // true if HTTPS
}));


const RegisterController = require('./Controller/RegisterController');
app.use(RegisterController);

const LoginController = require('./Controller/LoginController');
app.use(LoginController);

const IndexController = require('./Controller/IndexController');
app.use(isAuthenticated,IndexController);

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.json({ message: 'Logout Success' });
    });
});

app.use((req, res) => {
    const filePath = path.resolve(__dirname, 'public', 'html', 'error404.html');
    console.log('Sending file:', filePath); // Debugging line
    res.status(404).sendFile(filePath, (err) => {
        if (err) {
            console.error('ไม่สามารถส่งไฟล์ได้:', err);
            res.status(err.status).end();
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
