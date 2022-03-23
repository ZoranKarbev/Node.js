const fs = require("fs");
const path = require("path");

const getUsers = (file) => {
    return fs.readFileSync(path.join(__dirname, file), (error) => {
        if (error) {
            throw error;
        }
    });
};

module.exports = {
    getUsers,
};