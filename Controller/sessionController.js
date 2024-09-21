

const setUserSession = (req, username) => {
    req.session.username = username;
};

const getUserSession = (req) => {
    return req.session.username;
};

const clearUserSession = (req) => {
    req.session.destroy((err) => {
        if (err) {
            console.log('Failed to destroy session:', err);
        }
    });
};

module.exports = {
    setUserSession,
    getUserSession,
    clearUserSession,
};
