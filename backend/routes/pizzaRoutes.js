const express = require("express");

const router = express.Router();

const Pizza = require("../models/Pizza");

const {
    createPizza,
    getPizzas,
    deletePizza,
} = require("../controllers/pizzaController");

router.post("/", createPizza);

router.get("/", getPizzas);

router.delete("/:id", deletePizza);

router.delete("/:id", async (req, res) => {

    try {

        await Pizza.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message: "Pizza deleted",
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
});

module.exports = router;

