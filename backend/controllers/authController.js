
const User = require("../models/User");

const jwt = require("jsonwebtoken");


// GENERATE TOKEN

const generateToken = (id) => {

    return jwt.sign(

        { id },

        process.env.JWT_SECRET,

        {
            expiresIn: "30d",
        }
    );
};


// REGISTER USER

const registerUser = async (
    req,
    res
) => {

    try {

        const {
            name,
            email,
            password,
        } = req.body;

        // CHECK USER

        const userExists =
            await User.findOne({
                email,
            });

        if (userExists) {

            return res
                .status(400)
                .json({

                    message:
                        "User already exists",
                });
        }

        // CREATE USER

        const user =
            await User.create({

                name,
                email,
                password,
            });

        res.status(201).json({

            _id: user._id,

            name: user.name,

            email: user.email,

            isAdmin:
                user.isAdmin,

            token:
                generateToken(
                    user._id
                ),
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message:
                error.message,
        });
    }
};


// LOGIN USER

const loginUser = async (
    req,
    res
) => {

    try {

        const {
            email,
            password,
        } = req.body;

        // FIND USER

        const user =
            await User.findOne({
                email,
            });

        if (!user) {

            return res
                .status(401)
                .json({

                    message:
                        "Invalid Credentials",
                });
        }

        // CHECK PASSWORD

        const isMatch =
            await user.matchPassword(
                password
            );

        if (!isMatch) {

            return res
                .status(401)
                .json({

                    message:
                        "Invalid Credentials",
                });
        }

        // SUCCESS LOGIN

        res.json({

            _id: user._id,

            name: user.name,

            email: user.email,

            isAdmin:
                user.isAdmin,

            token:
                generateToken(
                    user._id
                ),
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message:
                error.message,
        });
    }
};

module.exports = {

    registerUser,

    loginUser,
};
