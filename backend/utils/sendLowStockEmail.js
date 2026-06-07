const nodemailer =
    require("nodemailer");

const sendLowStockEmail =
    async (
        itemName,
        quantity
    ) => {

        try {

            const transporter =
                nodemailer.createTransport({

                    service:
                        "gmail",

                    auth: {

                        user:
                            process.env.EMAIL_USER,

                        pass:
                            process.env.EMAIL_PASS,
                    },
                });

            const mailOptions = {

                from:
                    process.env.EMAIL_USER,

                to:
                    process.env.ADMIN_EMAIL,

                subject:
                    "⚠️ Low Stock Alert",

                html: `

                    <h2>Inventory Warning</h2>

                    <p>
                        Stock for
                        <b>${itemName}</b>
                        is low.
                    </p>

                    <h3>
                        Remaining Quantity:
                        ${quantity}
                    </h3>
                `,
            };

            await transporter.sendMail(
                mailOptions
            );

            console.log(
                "Low stock email sent"
            );

        } catch (error) {

            console.log(error);
        }
    };

module.exports =
    sendLowStockEmail;

