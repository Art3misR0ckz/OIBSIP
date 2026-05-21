import { Link } from "react-router-dom";

function Navbar() {

    const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
    );

    const logoutHandler = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("userInfo");

        window.location.href = "/";
    };

    return (

        <nav className="navbar">

            {/* LOGO */}

            <h1 className="logo">

                PizzaVerse 🍕

            </h1>

            {/* LINKS */}

            <div className="nav-links">

                <Link to="/">
                    Home
                </Link>

                <Link to="/orders">
                    Orders
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
                        {userInfo.isAdmin && (

                            <Link to="/admin">
                                Admin
                            </Link>
                        )}

                        <button
                            className="
                            logout-btn
                            "

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
    );
}

export default Navbar;