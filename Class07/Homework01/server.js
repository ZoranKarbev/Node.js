const express = require("express");
const path = require("path");
const router = require("./router.const");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.options("*", (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    next();
})

app.use((req, res, next) => {
    console.log(`${req.method} Request was made on ${req.url} at ${new Date().toLocaleTimeString()}`);
    next();
});

app.use(router);

app.use(express.static(path.join(__dirname, "public")));

// app.get("*", (req, res) => {
//     res.status(404).send({ err: "PAGE NOT FOUND" });
// });

app.listen(PORT, HOST, () => {
    console.log(`Server is up and running on port: ${PORT}`)
});