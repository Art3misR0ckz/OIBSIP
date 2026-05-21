import { useState } from "react";
import axios from "axios";

function Login() {

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const handleLogin = async (
        e
    ) => {

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
                "token",
                response.data.token
            );

            localStorage.setItem(
                "userInfo",
                JSON.stringify(
                    response.data
                )
            );

            alert(
                "Login Successful 🎉"
            );

            window.location.href = "/";

        } catch (error) {

            console.log(error);

            alert("Invalid Credentials");
        }
    };

    return (
        <div
            style={{
                maxWidth: "400px",
                margin: "50px auto",
            }}
        >

            <h1>Login 🔑</h1>

            <form onSubmit={handleLogin}>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(
                            e.target.value
                        )
                    }
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "10px",
                    }}
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
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "10px",
                    }}
                />

                <button
                    type="submit"
                    style={{
                        padding: "10px",
                        width: "100%",
                    }}
                >
                    Login
                </button>

            </form>

        </div>
    );
}

export default Login;