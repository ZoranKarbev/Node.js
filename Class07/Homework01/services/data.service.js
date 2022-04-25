const fs = require("fs");

const writeData = (path, data) => {
    fs.writeFileSync(path, data, (error) => {
        if (error) console.log(error);
    });
};

const readData = (path) => fs.readFileSync(path, { encoding: "utf-8" });

const dataService = {
    writeDataToDB: writeData,
    readDataFromDB: readData,
};

module.exports = dataService;