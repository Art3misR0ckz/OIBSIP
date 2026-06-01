const crypto = require("crypto");
const express = require("express");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendMail");

const router = express.Router();

const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

const buildUserResponse = (user) => ({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    isVerified: user.isVerified,
    token: generateToken(user._id),
});

const sendVerificationEmail = async (user) => {
    const verifyUrl = `${clientUrl}/verify-email/${user.verificationToken}`;

    await sendEmail(
        user.email,
        "Verify your PizzaVerse account",
        `
            <h2>Welcome to PizzaVerse, ${user.name}</h2>
            <p>Click the link below to verify your email address.</p>
            <p><a href="${verifyUrl}">Verify email</a></p>
        `
    );

    if (process.env.NODE_ENV !== "production") {
        console.log(`Email verification link: ${verifyUrl}`);
    }
};

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const verificationToken = crypto.randomBytes(32).toString("hex");

        const user = await User.create({
            name,
            email,
            password,
            verificationToken,
        });

        await sendVerificationEmail(user);

        res.status(201).json({
            message: "Registration successful. Please verify your email.",
            user: buildUserResponse(user),
            verificationToken:
                process.env.NODE_ENV === "production" ? undefined : verificationToken,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/verify-email/:token", async (req, res) => {
    try {
        const user = await User.findOne({
            verificationToken: req.params.token,
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired verification link" });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        res.json({
            message: "Email verified successfully",
            user: buildUserResponse(user),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        if (!user.isVerified && process.env.REQUIRE_EMAIL_VERIFICATION === "true") {
            return res.status(403).json({
                message: "Please verify your email before logging in",
            });
        }

        res.json(buildUserResponse(user));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({
                message: "If that email exists, a reset link has been sent.",
            });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");

        user.resetPasswordToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");
        user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
        await user.save();

        const resetUrl = `${clientUrl}/reset-password/${resetToken}`;

        await sendEmail(
            user.email,
            "Reset your PizzaVerse password",
            `
                <h2>Password reset request</h2>
                <p>Click the link below to set a new password. This link expires in 15 minutes.</p>
                <p><a href="${resetUrl}">Reset password</a></p>
            `
        );

        if (process.env.NODE_ENV !== "production") {
            console.log(`Password reset link: ${resetUrl}`);
        }

        res.json({
            message: "If that email exists, a reset link has been sent.",
            resetToken: process.env.NODE_ENV === "production" ? undefined : resetToken,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/reset-password/:token", async (req, res) => {
    try {
        const resetPasswordToken = crypto
            .createHash("sha256")
            .update(req.params.token)
            .digest("hex");

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired reset token" });
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        res.json({ message: "Password reset successful" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
