const Pizza = require("../models/Pizza");

// ADD PIZZA
const createPizza = async (req, res) => {
    try {

        const pizza = await Pizza.create(req.body);

        res.status(201).json(pizza);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// GET ALL PIZZAS
const getPizzas = async (req, res) => {
    try {

        const pizzas = await Pizza.find();

        res.status(200).json(pizzas);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// DELETE PIZZA
const deletePizza = async (req, res) => {
    try {

        const pizza = await Pizza.findByIdAndDelete(req.params.id);

        if (!pizza) {
            return res.status(404).json({
                message: "Pizza not found",
            });
        }

        res.status(200).json({
            message: "Pizza deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    createPizza,
    getPizzas,
    deletePizza,
};