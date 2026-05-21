import { useState } from "react";

import axios from "axios";

function Login() {

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const handleLogin =
        async (e) => {

        e.preventDefault();

        try {

            const response =
                await axios.post(

                    "http://localhost:5000/api/auth/login",

                    {
                        email,
                        password,
                    }
                );

            localStorage.setItem(

                "userInfo",

                JSON.stringify(
                    response.data
                )
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            alert(
                "Login Successful 🎉"
            );

            window.location.href = "/";

        } catch (error) {

            console.log(error);

            alert(
                "Invalid Credentials"
            );
        }
    };

    return (

        <div className="auth-page">

            <form
                className="auth-form"

                onSubmit={
                    handleLogin
                }
            >

                <h1>
                    Login 🔑
                </h1>

                <input

                    type="email"

                    placeholder="Email"

                    value={email}

                    onChange={(e) =>
                        setEmail(
                            e.target.value
                        )
                    }
                />

                <input

                    type="password"

                    placeholder="Password"

                    value={password}

                    onChange={(e) =>
                        setPassword(
                            e.target.value
                        )
                    }
                />

                <button type="submit">

                    Login

                </button>

            </form>

        </div>
    );
}

export default Login;