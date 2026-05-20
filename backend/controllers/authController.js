const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER USER
const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        // check if user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        // create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // generate token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// LOGIN USER
const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        // check user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        // compare password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        // generate token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
};