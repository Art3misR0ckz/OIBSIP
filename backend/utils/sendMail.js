const nodemailer = require("nodemailer");

const hasEmailConfig = process.env.EMAIL_USER && process.env.EMAIL_PASS;

const sendEmail = async (to, subject, html) => {
    if (!hasEmailConfig) {
        console.log(`Email skipped: ${subject} -> ${to}`);
        return;
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        html,
    });
};

module.exports = sendEmail;
