import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/auth.css";

function ResetPassword() {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(
                `http://localhost:5000/api/auth/reset-password/${token}`,
                { password }
            );

            setMessage(data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || "Password reset failed");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1 className="auth-title">New Password</h1>
                <p className="auth-subtitle">Choose a fresh password</p>

                <form onSubmit={submitHandler}>
                    <input
                        type="password"
                        placeholder="New password"
                        className="auth-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                    />

                    <button type="submit" className="auth-btn">
                        Update Password
                    </button>
                </form>

                {message && <p className="auth-message">{message}</p>}

                <div className="auth-footer">
                    <Link to="/login" className="auth-link">
                        Back to login
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
