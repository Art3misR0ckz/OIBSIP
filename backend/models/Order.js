const mongoose =
    require("mongoose");

const orderSchema =
    new mongoose.Schema({

        user: {

            type:
                mongoose.Schema.Types.ObjectId,

            ref: "User",
        },

        items: [

            {

                name: String,

                image: String,

                category: String,

                quantity: Number,

                price: Number,


                // CUSTOMIZATION

                size: String,

                base: String,

                sauce: String,

                cheese: String,

                veggies: [String],
            },
        ],

        totalPrice: {

            type: Number,

            required: true,
        },

        status: {

            type: String,

            default:
                "Order Received",
        },

    },

    {

        timestamps: true,
    }
);

module.exports =
    mongoose.model(
        "Order",
        orderSchema
    );