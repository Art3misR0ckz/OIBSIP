const express = require("express");
const Inventory = require("../models/Inventory");
const Order = require("../models/Order");
const sendEmail = require("../utils/sendMail");

const router = express.Router();

const statusOptions = [
    "Order Received",
    "In the Kitchen",
    "Sent to Delivery",
    "Delivered",
];

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const decreaseStock = async (ingredientName, quantity = 1) => {
    if (!ingredientName) return;

    const ingredient = await Inventory.findOne({
        ingredient: {
            $regex: new RegExp(`^${escapeRegex(ingredientName)}$`, "i"),
        },
    });

    if (!ingredient) return;

    ingredient.stock = Math.max(0, ingredient.stock - quantity);
    await ingredient.save();

    if (ingredient.stock <= ingredient.threshold) {
        const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;

        if (adminEmail) {
            await sendEmail(
                adminEmail,
                `Low stock alert: ${ingredient.ingredient}`,
                `
                    <h2>Low stock alert</h2>
                    <p>${ingredient.ingredient} stock is now ${ingredient.stock}.</p>
                    <p>Threshold: ${ingredient.threshold}</p>
                `
            );
        }
    }
};

const updateInventoryForOrder = async (items) => {
    for (const item of items) {
        const quantity = Number(item.quantity || 1);

        await decreaseStock(item.base, quantity);
        await decreaseStock(item.sauce, quantity);
        await decreaseStock(item.cheese, quantity);
        await decreaseStock(item.meat, quantity);

        for (const veggie of item.veggies || []) {
            await decreaseStock(veggie, quantity);
        }
    }
};

router.post("/", async (req, res) => {
    try {
        if (!req.body.userId) {
            return res.status(400).json({ message: "User is required" });
        }

        if (!Array.isArray(req.body.items) || req.body.items.length === 0) {
            return res.status(400).json({ message: "At least one item is required" });
        }

        const order = await Order.create({
            user: req.body.userId,
            items: req.body.items,
            totalPrice: req.body.totalPrice,
            paymentId: req.body.paymentId,
        });

        await updateInventoryForOrder(req.body.items);

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/user/:userId", async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.params.userId,
        }).sort({ createdAt: -1 });

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        if (!statusOptions.includes(req.body.status)) {
            return res.status(400).json({ message: "Invalid order status" });
        }

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.status = req.body.status;
        const updatedOrder = await order.save();

        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
