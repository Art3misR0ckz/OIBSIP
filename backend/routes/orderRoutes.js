const express = require("express");

const router = express.Router();

const Order = require("../models/Order");

const Inventory =
require("../models/Inventory");

// PLACE ORDER
router.post("/", async (req, res) => {

    try {

        const order = await Order.create({

            ...req.body,

            user: req.body.userId,
        });

        res.status(201).json(order);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
});

// AUTO REDUCE INVENTORY

for (const item of items) {

    // BASE

    if (item.base) {

        const base =
            await Inventory.findOne({

                ingredient:
                    item.base,
            });

        if (base) {

            base.stock -= 1;

            await base.save();
        }
    }

    // SAUCE

    if (item.sauce) {

        const sauce =
            await Inventory.findOne({

                ingredient:
                    item.sauce,
            });

        if (sauce) {

            sauce.stock -= 1;

            await sauce.save();
        }
    }

    // CHEESE

    if (item.cheese) {

        const cheese =
            await Inventory.findOne({

                ingredient:
                    item.cheese,
            });

        if (cheese) {

            cheese.stock -= 1;

            await cheese.save();
        }
    }

    // VEGGIES

    if (
        item.veggies &&
        item.veggies.length > 0
    ) {

        for (
            const veggie
            of item.veggies
        ) {

            const veg =
                await Inventory.findOne({

                    ingredient:
                        veggie,
                });

            if (veg) {

                veg.stock -= 1;

                await veg.save();
            }
        }
    }
}


// GET ORDERS
router.get("/", async (req, res) => {

    try {

        const orders = await Order.find();

        res.json(orders);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
});

// UPDATE ORDER STATUS
router.put("/:id", async (req, res) => {

    try {

        const order = await Order.findById(
            req.params.id
        );

        if (!order) {

            return res.status(404).json({
                message: "Order not found",
            });
        }

        order.status = req.body.status;

        const updatedOrder = await order.save();

        res.json(updatedOrder);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
});

// GET USER ORDERS

router.get(
    "/user/:userId",

    async (req, res) => {

        try {

            const orders =
                await Order.find({

                    user:
                        req.params.userId,
                });

            res.json(orders);

        } catch (error) {

            res.status(500).json({
                message:
                    error.message,
            });
        }
    }
);


module.exports = router;