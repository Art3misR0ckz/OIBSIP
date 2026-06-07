const User =
    require("../models/User");

const jwt =
    require("jsonwebtoken");

const crypto =
    require("crypto");

const sendResetEmail =
    require("../utils/sendResetEmail");

const sendVerificationEmail =
    require(
        "../utils/sendVerificationEmail"
    );


// GENERATE TOKEN

const generateToken =
    (id) => {

        return jwt.sign(

            { id },

            process.env.JWT_SECRET,

            {

                expiresIn:
                    "30d",
            }
        );
    };


// REGISTER USER

const registerUser =
    async (
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


            // GENERATE VERIFICATION TOKEN

            const verificationToken =

                crypto.randomBytes(
                    32
                ).toString("hex");

            user.verificationToken =
                verificationToken;

            await user.save();


            // VERIFICATION LINK

            const verificationLink =

                `http://localhost:5173/verify-email/${verificationToken}`;


            // SEND EMAIL

            await sendVerificationEmail(

                user.email,

                verificationLink
            );


            // RESPONSE

            res.status(201).json({

                _id:
                    user._id,

                name:
                    user.name,

                email:
                    user.email,

                isAdmin:
                    user.isAdmin,

                isVerified:
                    user.isVerified,

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

const loginUser =
    async (
        req,
        res
    ) => {

        try {

            const {

                email,

                password,

            } = req.body;

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


            // EMAIL VERIFICATION CHECK

            if (!user.isVerified) {

                return res
                    .status(401)
                    .json({

                        message:
                            "Please verify your email first",
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

            // LOGIN SUCCESS

            res.json({

                _id:
                    user._id,

                name:
                    user.name,

                email:
                    user.email,

                isAdmin:
                    user.isAdmin,

                isVerified:
                    user.isVerified,

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


// FORGOT PASSWORD

const forgotPassword =
    async (
        req,
        res
    ) => {

        try {

            const { email } =
                req.body;

            const user =
                await User.findOne({

                    email,
                });

            if (!user) {

                return res
                    .status(404)
                    .json({

                        message:
                            "User not found",
                    });
            }

            const resetToken =
                crypto.randomBytes(
                    32
                ).toString("hex");

            user.resetPasswordToken =
                resetToken;

            user.resetPasswordExpire =
                Date.now() +
                15 *
                60 *
                1000;

            await user.save();

            const resetLink =

                `http://localhost:5173/reset-password/${resetToken}`;

            await sendResetEmail(

                user.email,

                resetLink
            );

            res.json({

                message:
                    "Reset email sent",
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({

                message:
                    error.message,
            });
        }
    };


// RESET PASSWORD

const resetPassword =
    async (
        req,
        res
    ) => {

        try {

            const { token } =
                req.params;

            const { password } =
                req.body;

            const user =
                await User.findOne({

                    resetPasswordToken:
                        token,

                    resetPasswordExpire: {

                        $gt:
                            Date.now(),
                    },
                });

            if (!user) {

                return res
                    .status(400)
                    .json({

                        message:
                            "Invalid or expired token",
                    });
            }

            // UPDATE PASSWORD

            user.password =
                password;

            // CLEAR TOKENS

            user.resetPasswordToken =
                undefined;

            user.resetPasswordExpire =
                undefined;

            await user.save();

            res.json({

                message:
                    "Password reset successful",
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({

                message:
                    error.message,
            });
        }
    };


// VERIFY EMAIL

const verifyEmail =
    async (
        req,
        res
    ) => {

        try {

            const { token } =
                req.params;

            const user =
                await User.findOne({

                    verificationToken:
                        token,
                });

            if (!user) {

                return res
                    .status(400)
                    .json({

                        message:
                            "Invalid token",
                    });
            }

            user.isVerified =
                true;

            user.verificationToken =
                undefined;

            await user.save();

            res.json({

                message:
                    "Email verified successfully",
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

    forgotPassword,

    resetPassword,

    verifyEmail,
};
