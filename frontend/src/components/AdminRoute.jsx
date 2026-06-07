import { Navigate } from "react-router-dom";

function AdminRoute({

    children,
}) {

    const userInfo =
        JSON.parse(

            localStorage.getItem(
                "userInfo"
            )
        );

    if (

        !userInfo ||

        !userInfo.isAdmin
    ) {

        return (
            <Navigate
                to="/login"
            />
        );
    }

    return children;
}

export default AdminRoute;