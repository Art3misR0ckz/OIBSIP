import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/auth.css";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [devLink, setDevLink] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(
                "http://localhost:5000/api/auth/register",
                { name, email, password }
            );

            setMessage(data.message);

            if (data.verificationToken) {
                setDevLink(`/verify-email/${data.verificationToken}`);
            }
        } catch (error) {
            setMessage(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-glow glow-1" />
            <div className="auth-glow glow-2" />

            <div className="auth-card">
                <h1 className="auth-title">Create Account</h1>
                <p className="auth-subtitle">Start your pizza order</p>

                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Name"
                        className="auth-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        className="auth-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="auth-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                    />

                    <button type="submit" className="auth-btn">
                        Register
                    </button>
                </form>

                {message && <p className="auth-message">{message}</p>}

                {devLink && (
                    <div className="auth-footer">
                        <Link to={devLink} className="auth-link">
                            Verify now
                        </Link>
                    </div>
                )}

                <div className="auth-footer">
                    Already registered?{" "}
                    <Link to="/login" className="auth-link">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Register;
