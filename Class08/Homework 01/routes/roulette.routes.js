const router = require("express").Router();
const RouletteController = require("../controllers/roulette.controller");
const sessionValidator = require("../middleware/session-validator-middleware");

router.use(sessionValidator);


//1. Get all Bets
router.get("/all-bets", RouletteController.getAllBets);

//2. Create new Bet
router.post("/new-bet", RouletteController.placeNewBet);

module.exports = router;