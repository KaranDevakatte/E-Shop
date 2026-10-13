const bcrypt = require("bcrypt");

const { User } = require("../models/users.js");

const { createJsonWebToken } = require("../services/authService.js");

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        name,
        email,
        password: hashedPassword
    });

    await newUser.save();
    res.redirect("/users/login");
}

const showSignup = (req, res) => {
    res.render("users/signup.ejs");
}

const showLogin = (req, res) => {
    let error;
    res.render("users/login.ejs", { error });
}

const verifyUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) {
        return res.render("users/login.ejs", { error : "Email or Password is Incorrect!"});
    }
    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid) {
        return res.render("users/login.ejs", { error : "Email or Password is Incorrect!"});
    }
    const token = createJsonWebToken(user);
    res.cookie("token", token);
    res.redirect("/");
}

const logoutUser = (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
}

module.exports = { createUser, showSignup, showLogin, verifyUser, logoutUser };