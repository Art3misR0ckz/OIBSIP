import { useEffect, useState } from "react";

import axios from "axios";

function OrdersAdmin() {

    const [orders, setOrders] =
        useState([]);

    // FETCH ORDERS

    const fetchOrders =
        async () => {

        try {

            const response =
                await axios.get(
                    "http://localhost:5000/api/orders"
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

    // UPDATE STATUS

    const updateStatus =
        async (id, status) => {

        try {

            await axios.put(

                `http://localhost:5000/api/orders/${id}`,

                { status }
            );

            alert(
                "Status Updated 🚚"
            );

            fetchOrders();

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div
            style={{
                marginTop: "50px",
            }}
        >

            <h1
                style={{
                    marginBottom:
                        "30px",
                }}
            >

                Manage Orders 📦

            </h1>

            {orders.map((order) => (

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

                        Order ID:
                        {" "}

                        {order._id}

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
                        {order.totalPrice}

                    </p>

                    {/* ITEMS */}

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

                                <p
                                    key={index}
                                >

                                    {item.name}

                                    {" "}

                                    ×

                                    {" "}

                                    {item.quantity}

                                </p>
                            )
                        )}

                    </div>

                    {/* STATUS */}

                    <div
                        style={{
                            marginTop:
                                "20px",
                        }}
                    >

                        <h3>

                            Current Status:
                            {" "}

                            <span
                                style={{
                                    color:
                                        "#ff0080",
                                }}
                            >

                                {order.status}

                            </span>

                        </h3>

                        <select

                            style={{

                                marginTop:
                                    "15px",

                                padding:
                                    "12px",

                                borderRadius:
                                    "10px",

                                background:
                                    "#1f2937",

                                color:
                                    "white",

                                border:
                                    "none",
                            }}

                            value={
                                order.status
                            }

                            onChange={(e) =>
                                updateStatus(

                                    order._id,

                                    e.target.value
                                )
                            }
                        >

                            <option>
                                Order Received
                            </option>

                            <option>
                                Preparing
                            </option>

                            <option>
                                Out For Delivery
                            </option>

                            <option>
                                Delivered
                            </option>

                        </select>

                    </div>

                </div>
            ))}

        </div>
    );
}

export default OrdersAdmin;