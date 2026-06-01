import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/auth.css";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [devLink, setDevLink] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(
                "http://localhost:5000/api/auth/forgot-password",
                { email }
            );

            setMessage(data.message);

            if (data.resetToken) {
                setDevLink(`/reset-password/${data.resetToken}`);
            }
        } catch (error) {
            setMessage(error.response?.data?.message || "Could not send reset link");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1 className="auth-title">Reset Password</h1>
                <p className="auth-subtitle">Enter your registered email</p>

                <form onSubmit={submitHandler}>
                    <input
                        type="email"
                        placeholder="Email"
                        className="auth-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <button type="submit" className="auth-btn">
                        Send Link
                    </button>
                </form>

                {message && <p className="auth-message">{message}</p>}

                {devLink && (
                    <div className="auth-footer">
                        <Link to={devLink} className="auth-link">
                            Open reset link
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ForgotPassword;
