const RouletteModel = require("../models/roulette.model");

class RouletteController {

    //1.Get all Betts
    static async getAllBets(req, res) {
        try {
            const bets = await RouletteModel.getAllBets();
            res.status(200).send(bets);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    // 2. Place new Bet
    static async placeNewBet(req, res) {
        try {
            let { amount, betType, status } = req.body;

            const winningNum = Math.floor((Math.random() * 37))
            console.log("Winning Number:", winningNum)

            let betSingle, winningStatus, winningAmount;

            if (betType !== "1-18" && betType !== "19-36" && betType !== "1st 12" && betType !== "2nd 12" && betType !== "3rd 12") {
                betSingle = parseInt(betType);
                betType = "single";
            }
            if (
                (betType === "single" && winningNum === betSingle) ||
                (betType === "1-18" && (winningNum > 0 && winningNum < 19)) ||
                (betType === "19-36" && (winningNum > 18 && winningNum < 37)) ||
                (betType === "1st 12" && (winningNum > 0 && winningNum < 13)) ||
                (betType === "2nd 12" && (winningNum > 12 && winningNum < 25)) ||
                (betType === "3rd 12" && (winningNum > 24 && winningNum < 37))
            ) {
                winningAmount = amount * 2;
                winningStatus = true;
            } else {
                winningAmount = null;
                winningStatus = false;
            }
            console.log("Bet Amount:", amount, ", Status:", status, ",  Bet Type:", betType, ", Winning Status:", winningStatus, ", Winning amount", winningAmount)

            const validatedBet = {
                amount,
                betType,
                status: "completed",
                winningStatus,
                winningAmount
            };

            const createdBet = await RouletteModel.placeNewBet(validatedBet);
            console.log("Created Bet", createdBet);

            if (!winningStatus) {
                console.log("No WIN");
                res.status(201).send({ msg: "Better luck next time", createdBet });
            } else {
                console.log("You WON");
                res.status(201).send({ msg: `You have just won ${winningAmount} euro!`, createdBet });
            }
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    }
}

module.exports = RouletteController;