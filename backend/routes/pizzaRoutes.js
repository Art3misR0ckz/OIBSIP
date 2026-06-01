const express = require("express");

const router = express.Router();

const {
    createPizza,
    getPizzas,
    deletePizza,
} = require("../controllers/pizzaController");

router.post("/", createPizza);

router.get("/", getPizzas);

router.delete("/:id", deletePizza);

module.exports = router;

