const DataService = require("../services/data.service");
const path = require("path");
const { v4: uuid } = require("uuid");
const bcrypt = require("bcryptjs");

const usersPath = path.join(__dirname, "..", "db", "users.json");

class User {
    constructor(firstName, lastName, age, email, password, role = "user") {
        this.id = uuid();
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.email = email;
        this.password = password;
        this.role = role
    }
}

class AuthModel {
    static async getAllUsers() {
        return DataService.readJSONFile(usersPath);
    }

    // 1. Create a User
    static async createUser(userData) {
        // check if user exist
        const users = await this.getAllUsers();
        const userExists = users.some(user => user.email === userData.email);

        if (userExists) return Promise.reject({ msg: "Email already exists" });

        // Hashing the user's password
        const hashedPassword = await bcrypt.hash(userData.password, 8);
        // Create new User
        const newUser = new User(
            userData.firstName,
            userData.lastName,
            userData.age,
            userData.email,
            hashedPassword
        );

        // Update and save users
        const updatedUsers = [...users, newUser];

        await DataService.saveJSONFile(usersPath, updatedUsers);

        // Remove hashed password and user's role before sending user data to client
        const { password, ...userWithoutPasswordAndRole } = newUser;

        return userWithoutPasswordAndRole
    }

    // 2. Login User
    static async loginUser(credentials) {
        const { email, password } = credentials;
        // Getting the Users
        const users = await this.getAllUsers();

        // Check if User exists
        const foundUser = users.find(user => user.email === email);
        if (!foundUser) return Promise.reject({ msg: "Invalid Credentials" });

        // Check if password is valid
        const isPasswordValid = await bcrypt.compare(password, foundUser.password);
        if (!isPasswordValid) return Promise.reject({ msg: "Invalid Credentials" });

        // Remove hashed password
        const { password: hashedPassword, ...userWithoutPassword } = foundUser;

        return userWithoutPassword;
    }

    // 4. Find User by Id
    static async findUserById(userId) {
        const users = await this.getAllUsers();
        const foundUser = users.find(user => user.id === userId);

        if (!foundUser) return Promise.reject({ msg: "User not found" });

        return foundUser;
    }
}

module.exports = AuthModel;