const AuthModel = require("../models/auth.model");

const adminValidator = async (req, res, next) => {

    const userID = req.session.userId
    const user = await AuthModel.findUserById(userID)

    if (user.role === "admin") {
        next();
    } else {
        res.sendStatus(403);
    }
}

module.exports = adminValidator;