const isAuthenticated = (req, res, next) => {
    if (req.session.username) {
        return next(); 
    }
    res.redirect('/login');
};

module.exports = isAuthenticated;