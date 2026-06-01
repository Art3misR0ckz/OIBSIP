const express = require("express");
const Inventory = require("../models/Inventory");

const router = express.Router();

const defaultInventory = [
    ["Classic Hand Tossed", "Base", 50, 20, 0],
    ["Thin Crust", "Base", 50, 20, 20],
    ["Cheese Burst", "Base", 50, 20, 60],
    ["Whole Wheat", "Base", 50, 20, 30],
    ["Gluten Free", "Base", 50, 20, 45],
    ["Tomato Basil", "Sauce", 60, 20, 0],
    ["Pesto", "Sauce", 60, 20, 25],
    ["Barbecue", "Sauce", 60, 20, 20],
    ["Peri Peri", "Sauce", 60, 20, 20],
    ["Alfredo", "Sauce", 60, 20, 30],
    ["Mozzarella", "Cheese", 45, 15, 35],
    ["Cheddar", "Cheese", 45, 15, 30],
    ["Parmesan", "Cheese", 45, 15, 40],
    ["Feta", "Cheese", 45, 15, 35],
    ["Vegan Cheese", "Cheese", 45, 15, 45],
    ["Onion", "Veggie", 80, 20, 15],
    ["Capsicum", "Veggie", 80, 20, 15],
    ["Mushroom", "Veggie", 80, 20, 25],
    ["Sweet Corn", "Veggie", 80, 20, 20],
    ["Olives", "Veggie", 80, 20, 25],
    ["Chicken", "Meat", 35, 10, 60],
    ["Pepperoni", "Meat", 35, 10, 70],
];

const seedInventoryIfEmpty = async () => {
    const count = await Inventory.countDocuments();

    if (count === 0) {
        await Inventory.insertMany(
            defaultInventory.map(([ingredient, category, stock, threshold, price]) => ({
                ingredient,
                category,
                stock,
                threshold,
                price,
            }))
        );
    }
};

router.get("/", async (req, res) => {
    try {
        await seedInventoryIfEmpty();
        const inventory = await Inventory.find().sort({ category: 1, ingredient: 1 });
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const ingredient = await Inventory.create({
            ingredient: req.body.ingredient,
            category: req.body.category,
            stock: Number(req.body.stock || 0),
            threshold: Number(req.body.threshold || 5),
            price: Number(req.body.price || 0),
        });

        res.status(201).json(ingredient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const ingredient = await Inventory.findById(req.params.id);

        if (!ingredient) {
            return res.status(404).json({ message: "Ingredient not found" });
        }

        if (req.body.ingredient !== undefined) ingredient.ingredient = req.body.ingredient;
        if (req.body.category !== undefined) ingredient.category = req.body.category;
        if (req.body.stock !== undefined) ingredient.stock = Number(req.body.stock);
        if (req.body.threshold !== undefined) ingredient.threshold = Number(req.body.threshold);
        if (req.body.price !== undefined) ingredient.price = Number(req.body.price);

        const updated = await ingredient.save();
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await Inventory.findByIdAndDelete(req.params.id);
        res.json({ message: "Ingredient deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
