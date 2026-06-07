const nodemailer =
    require("nodemailer");

const sendResetEmail =
    async (
        email,
        resetLink
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

                to: email,

                subject:
                    "PizzaVerse Password Reset",

                html: `

                    <h2>Password Reset</h2>

                    <p>
                        Click below to reset your password
                    </p>

                    <a href="${resetLink}">
                        Reset Password
                    </a>
                `,
            };

            await transporter.sendMail(
                mailOptions
            );

            console.log(
                "Reset email sent"
            );

        } catch (error) {

            console.log(error);
        }
    };

module.exports =
    sendResetEmail;