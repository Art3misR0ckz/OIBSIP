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

                meat: String,

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

        paymentId: String,

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
