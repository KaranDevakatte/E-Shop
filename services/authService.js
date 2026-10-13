const jwt = require("jsonwebtoken");
const secret = "$uperMan@123";

function createJsonWebToken(user) {

    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email
    }
    const token = jwt.sign(payload, secret);
    return token;

}

function verifyJsonWebToken(token) {
    try {
        const payload = jwt.verify(token, secret);
        return payload;
    } catch (error) {
        return null;
    }
}

module.exports = { createJsonWebToken, verifyJsonWebToken };