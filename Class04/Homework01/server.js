const express = require("express");
const app = express();

const fileSystem = require("./db/file-system");

const router = express.Router();
const path = require("path");

const cors = require("cors");
const PORT = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/users", (req, res, next) => {
    let users = JSON.parse(fileSystem.getUsers("users.json"));
    res.send(users)
});

app.use(express.static("frontend"));

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
})