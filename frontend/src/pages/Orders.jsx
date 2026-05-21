import { useEffect, useState } from "react";

import axios from "axios";

function Orders() {

    const [orders, setOrders] =
        useState([]);

    const userInfo = JSON.parse(
        localStorage.getItem(
            "userInfo"
        )
    );

    const fetchOrders =
        async () => {

        try {

            const response =
                await axios.get(

                    `http://localhost:5000/api/orders/user/${userInfo._id}`
                );

            setOrders(
                response.data
            );

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        fetchOrders();

    }, []);

    return (

        <div
            style={{
                padding: "40px",
            }}
        >

            <h1
                style={{
                    marginBottom:
                        "40px",
                }}
            >

                My Orders 📦

            </h1>

            {orders.length === 0 ? (

                <p>
                    No Orders Yet
                </p>

            ) : (

                orders.map(
                    (order) => (

                        <div

                            key={order._id}

                            style={{

                                background:
                                    "rgba(255,255,255,0.05)",

                                padding:
                                    "25px",

                                borderRadius:
                                    "20px",

                                marginBottom:
                                    "25px",
                            }}
                        >

                            <h2>

                                Order Status:
                                {" "}

                                <span
                                    style={{
                                        color:
                                            "#ff0080",
                                    }}
                                >

                                    {
                                        order.status
                                    }

                                </span>

                            </h2>

                            <p
                                style={{
                                    marginTop:
                                        "10px",
                                }}
                            >

                                Total:
                                {" "}

                                ₹
                                {
                                    order.totalPrice
                                }

                            </p>

                            <div
                                style={{
                                    marginTop:
                                        "20px",
                                }}
                            >

                                {order.items.map(
                                    (
                                        item,
                                        index
                                    ) => (

                                        <div
                                            key={index}
                                        >

                                            <p>

                                                {
                                                    item.name
                                                }

                                                {" "}

                                                ×

                                                {" "}

                                                {
                                                    item.quantity
                                                }

                                            </p>

                                        </div>
                                    )
                                )}

                            </div>

                        </div>
                    )
                )
            )}

        </div>
    );
}

export default Orders;