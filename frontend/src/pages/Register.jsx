import { useState } from "react";

import axios from "axios";

function Register() {

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const handleRegister =
        async (e) => {

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

        <div className="auth-page">

            <form
                className="auth-form"

                onSubmit={
                    handleRegister
                }
            >

                <h1>
                    Register 📝
                </h1>

                <input

                    type="text"

                    placeholder="Name"

                    value={name}

                    onChange={(e) =>
                        setName(
                            e.target.value
                        )
                    }
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

                    Register

                </button>

            </form>

        </div>
    );
}

export default Register;