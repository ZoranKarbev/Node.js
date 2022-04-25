const Joi = require("joi");

//Creating a validation schema
const userSchema = Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    age: Joi.number().min(13).max(120).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
    role: Joi.string()
});

//Creating the user validator middleware
const userValidator = (req, res, next) => {
    const userData = req.body;

    //Validating the user data
    const validation = userSchema.validate(userData);

    // Check if there's validation error
    if (validation?.error) {
        res.status(400).send({
            msg: validation.error.details[0].message
        });
    } else {
        next();
    }
}

module.exports = userValidator