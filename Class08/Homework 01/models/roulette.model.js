const path = require("path");
const DataService = require("../services/data.service");
const { v4: uuid } = require("uuid");

const betsPath = path.join(__dirname, "..", "db", "bets.json")

class RouletteModel {

    //1. Get All Bets
    static async getAllBets() {
        return DataService.readJSONFile(betsPath);
    }

    //2. Place new Bet
    static async placeNewBet(newBetData) {
        const bets = await this.getAllBets();
        const newBet = {
            id: uuid(),
            ...newBetData,

        };
        const updatedBets = [...bets, newBet]
        await DataService.saveJSONFile(betsPath, updatedBets);
        return newBet;
    }

    // static async saveBet(newBetData){
    //     const bets = await this.getAllBets();
    //     const newBet = 
    // }
}

module.exports = RouletteModel;