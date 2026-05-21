const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
{
    items: [
        {
            name: String,
            price: Number,
            quantity: Number,

            selectedBase: String,
            selectedSauce: String,
            selectedCheese: String,

            selectedVeggies: [String],
        },
    ],

    totalPrice: {
        type: Number,
        required: true,
    },

    status: {
        type: String,
        default: "Order Received",
    },
},
{
    timestamps: true,
}
);

module.exports = mongoose.model(
    "Order",
    orderSchema
);