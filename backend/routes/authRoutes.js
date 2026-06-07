const express =
    require("express");

const router =
    express.Router();

const {

    registerUser,

    loginUser,

    forgotPassword,

    resetPassword,

    verifyEmail,

} = require(
    "../controllers/authController"
);


// REGISTER

router.post(
    "/register",
    registerUser
);


// LOGIN

router.post(
    "/login",
    loginUser
);


// FORGOT PASSWORD

router.post(
    "/forgot-password",
    forgotPassword
);


// RESET PASSWORD

router.post(
    "/reset-password/:token",
    resetPassword
);


// VERIFY EMAIL

router.get(
    "/verify-email/:token",
    verifyEmail
);

module.exports =
    router;
