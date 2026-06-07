import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/auth.css";

function Login() {

    const [email,
        setEmail] =
        useState("");

    const [password,
        setPassword] =
        useState("");

    const submitHandler =
        async (e) => {

            e.preventDefault();

            try {

                const { data } =
                    await axios.post(

                        "http://localhost:5000/api/auth/login",

                        {
                            email,
                            password,
                        }
                    );

                localStorage.setItem(

                    "userInfo",

                    JSON.stringify(data)
                );

                localStorage.setItem(

                    "token",

                    data.token
                );

                // FORCE FULL RELOAD

                if (data.isAdmin) {

                    window.location.href =
                        "/admin";

                } else {

                    window.location.href =
                        "/";
                }

            } catch (error) {

                alert(

                    error.response?.data?.message ||

                    "Login failed"
                );
            }
        };

    return (

        <div className="auth-page">

            <div className="auth-glow glow-1" />

            <div className="auth-glow glow-2" />

            <div className="auth-card">

                <h1 className="auth-title">

                    PizzaVerse

                </h1>

                <p className="auth-subtitle">

                    Welcome back

                </p>

                <form
                    onSubmit={
                        submitHandler
                    }
                >

                    <input
                        type="email"

                        placeholder="Email"

                        className="auth-input"

                        value={email}

                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }

                        required
                    />

                    <input
                        type="password"

                        placeholder="Password"

                        className="auth-input"

                        value={password}

                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }

                        required
                    />

                    <button
                        type="submit"

                        className="auth-btn"
                    >

                        Login

                    </button>

                </form>

                <div className="auth-footer">

                    New here?{" "}

                    <Link
                        to="/register"

                        className="auth-link"
                    >

                        Create Account

                    </Link>

                </div>

                <div className="auth-footer">

                    <Link
                        to="/forgot-password"

                        className="auth-link"
                    >

                        Forgot Password?

                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Login;
