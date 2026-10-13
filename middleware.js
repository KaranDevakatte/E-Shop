const { verifyJsonWebToken } = require("./services/authService.js");

const isLoggedIn = (req, res, next) => {
    const { token } = req.cookies;
    if(!token) {
        return res.redirect("/users/login");
    }
    const user = verifyJsonWebToken(token);
    if(!user) {
        return res.redirect("/users/login");
    }
    req.user = user; 
    next();
}

const checkAuth = (req, res, next) => {
    const { token } = req.cookies;
    if(!token) {
        return next();
    }
    const user = verifyJsonWebToken(token);
    if(!user) {
        return next();
    }
    req.user = user;
    next();
}

module.exports = { isLoggedIn, checkAuth };