const express =
    require("express");

const router =
    express.Router();

const Inventory =
    require("../models/Inventory");


// GET ALL INVENTORY

router.get(
    "/",

    async (req, res) => {

        try {

            const inventory =
                await Inventory.find();

            res.json(inventory);

        } catch (error) {

            res.status(500).json({

                message:
                    error.message,
            });
        }
    }
);


// ADD INGREDIENT

router.post(
    "/",

    async (req, res) => {

        try {

            const ingredient =
                await Inventory.create(
                    req.body
                );

            res.status(201).json(
                ingredient
            );

        } catch (error) {

            res.status(500).json({

                message:
                    error.message,
            });
        }
    }
);


// UPDATE STOCK

router.put(
    "/:id",

    async (req, res) => {

        try {

            const ingredient =
                await Inventory.findById(
                    req.params.id
                );

            if (!ingredient) {

                return res
                    .status(404)
                    .json({

                        message:
                            "Ingredient not found",
                    });
            }

            ingredient.stock =
                req.body.stock;

            ingredient.threshold =
                req.body.threshold;

            const updated =
                await ingredient.save();

            res.json(updated);

        } catch (error) {

            res.status(500).json({

                message:
                    error.message,
            });
        }
    }
);


// DELETE INGREDIENT

router.delete(
    "/:id",

    async (req, res) => {

        try {

            await Inventory.findByIdAndDelete(
                req.params.id
            );

            res.json({

                message:
                    "Ingredient deleted",
            });

        } catch (error) {

            res.status(500).json({

                message:
                    error.message,
            });
        }
    }
);

module.exports =
    router;