const nodemailer =
    require("nodemailer");

const sendVerificationEmail =
    async (
        email,
        verificationLink
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
                    "Verify Your PizzaVerse Account",

                html: `

                    <h2>Email Verification</h2>

                    <p>
                        Click below to verify your account
                    </p>

                    <a href="${verificationLink}">
                        Verify Account
                    </a>
                `,
            };

            await transporter.sendMail(
                mailOptions
            );

            console.log(
                "Verification email sent"
            );

        } catch (error) {

            console.log(error);
        }
    };

module.exports =
    sendVerificationEmail;

