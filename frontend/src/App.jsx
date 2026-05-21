import {
    Routes,
    Route,
    Link,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {

    const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
    );

    const logoutHandler = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("userInfo");

        window.location.href = "/login";
    };

    return (
        <div>

            {/* Navbar */}
            <nav
                style={{
                    padding: "15px",
                    borderBottom:
                        "1px solid gray",

                    display: "flex",

                    justifyContent:
                        "space-between",

                    alignItems: "center",
                }}
            >

                <h2>
                    Pizza App 🍕
                </h2>

                <div
                    style={{
                        display: "flex",
                        gap: "15px",
                    }}
                >

                    <Link to="/">
                        Home
                    </Link>

                    {!userInfo ? (

                        <>
                            <Link to="/login">
                                Login
                            </Link>

                            <Link to="/register">
                                Register
                            </Link>
                        </>

                    ) : (

                        <>
                            <span>
                                Hello,
                                {" "}
                                {userInfo.name}
                            </span>

                            <button
                                onClick={
                                    logoutHandler
                                }
                            >
                                Logout
                            </button>
                        </>
                    )}

                </div>

            </nav>

            {/* Routes */}
            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

            </Routes>

        </div>
    );
}

export default App;