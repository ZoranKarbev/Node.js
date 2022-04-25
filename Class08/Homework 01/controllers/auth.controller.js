const AuthModel = require("../models/auth.model");

class AuthController {
    // 1.Register a User
    static async registerUser(req, res) {
        try {
            const userData = req.body;

            const registeredUser = await AuthModel.createUser(userData);
            res.status(201).send(registeredUser);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    // 2. Login a User
    static async loginUser(req, res) {
        try {
            const credentials = req.body;
            const user = await AuthModel.loginUser(credentials);

            req.session.loggedIn = true;
            req.session.userId = user.id;

            res.status(200).send(user);
        } catch (error) {
            res.status(401).send(error);
        }
    }

    // 3. Logоut a User
    static logoutUser(req, res) {
        try {
            req.session.destroy();
            res.sendStatus(200);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

module.exports = AuthController;