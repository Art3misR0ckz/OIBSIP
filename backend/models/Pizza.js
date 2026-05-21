const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    category: {
        type: String,
        required: true,
    },

    baseOptions: [
        {
            type: String,
        },
    ],

    sauces: [
        {
            type: String,
        },
    ],

    cheeses: [
        {
            type: String,
        },
    ],

    veggies: [
        {
            type: String,
        },
    ],
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("Pizza", pizzaSchema);