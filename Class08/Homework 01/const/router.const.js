const router = require("express").Router();

const postsRouter = require("../routes/posts.routes");
const authRouter = require("../routes/auth.routes");
const rouletteRouter = require("../routes/roulette.routes")

router.use("/posts", postsRouter)
router.use("/auth", authRouter)
router.use("/roulette", rouletteRouter)

router.get('*', (req, res) => {
    res.status(404).send({ msg: "Page not found!" });
});

module.exports = router;