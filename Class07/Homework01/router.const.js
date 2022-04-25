const router = require("express").Router();
const contactsRouter = require("./routes/contacts.routes");

router.use("/contacts", contactsRouter);


module.exports = router;