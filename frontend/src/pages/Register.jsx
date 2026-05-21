import { useState } from "react";
import axios from "axios";

function Register() {

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const handleRegister = async (
        e
    ) => {

        e.preventDefault();

        try {

            const response =
                await axios.post(
                    "http://localhost:5000/api/auth/register",
                    {
                        name,
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
                "Registration Successful 🎉"
            );

            window.location.href = "/";

        } catch (error) {

            console.log(error);

            alert(
                "Registration Failed"
            );
        }
    };

    return (
        <div
            style={{
                maxWidth: "400px",
                margin: "50px auto",
            }}
        >

            <h1>Register 📝</h1>

            <form
                onSubmit={handleRegister}
            >

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) =>
                        setName(
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
                    Register
                </button>

            </form>

        </div>
    );
}

export default Register;