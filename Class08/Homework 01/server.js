const express = require("express");
const app = express();

const path = require("path");
const publicPath = path.join(__dirname, "public");

const router = require("./const/router.const");
const createSession = require("./const/session.const");

const cors = require("cors");


const PORT = process.env.PORT || 2000;
const HOST = process.env.HOST || "0.0.0.0";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicPath));

app.use(createSession);
app.use(router);

app.listen(PORT, HOST, () => {
    console.log(`Server is up and running on Port: ${PORT}`)
})