import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/auth.css";

function VerifyEmail() {
    const { token } = useParams();
    const [message, setMessage] = useState("Verifying your email...");

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const { data } = await axios.get(
                    `http://localhost:5000/api/auth/verify-email/${token}`
                );

                localStorage.setItem("userInfo", JSON.stringify(data.user));
                localStorage.setItem("token", data.user.token);
                setMessage(data.message);
            } catch (error) {
                setMessage(error.response?.data?.message || "Verification failed");
            }
        };

        verifyEmail();
    }, [token]);

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1 className="auth-title">Email Verification</h1>
                <p className="auth-subtitle">{message}</p>
                <Link to="/login" className="auth-btn auth-button-link">
                    Continue
                </Link>
            </div>
        </div>
    );
}

export default VerifyEmail;
