import { useEffect, useState }
from "react";

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


    // DELETE ORDER

    const deleteOrder =
        async (id) => {

        try {

            await axios.delete(

                `http://localhost:5000/api/orders/${id}`
            );

            alert(
                "Order Deleted 🗑"
            );

            fetchOrders();

        } catch (error) {

            console.log(error);
        }
    };


    return (

        <div
            style={{

                marginTop:
                    "50px",
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

                        boxShadow:
                            "0 0 20px rgba(255,0,150,0.1)",
                    }}
                >

                    {/* ORDER ID */}

                    <h2>

                        Order ID:
                        {" "}

                        {order._id}

                    </h2>


                    {/* TOTAL */}

                    <p
                        style={{

                            marginTop:
                                "10px",

                            fontSize:
                                "18px",
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

                        <h3
                            style={{

                                marginBottom:
                                    "10px",
                            }}
                        >

                            Ordered Items 🍕

                        </h3>

                        {order.items.map(

                            (
                                item,
                                index
                            ) => (

                                <div
                                    key={index}

                                    style={{

                                        marginBottom:
                                            "10px",

                                        padding:
                                            "10px",

                                        background:
                                            "rgba(255,255,255,0.03)",

                                        borderRadius:
                                            "10px",
                                    }}
                                >

                                    <p>

                                        <strong>
                                            {item.name}
                                        </strong>

                                        {" "}

                                        ×

                                        {" "}

                                        {item.quantity}

                                    </p>

                                    <p>

                                        Size:
                                        {" "}

                                        {
                                            item.size
                                        }

                                    </p>

                                    <p>

                                        Base:
                                        {" "}

                                        {
                                            item.base
                                        }

                                    </p>

                                    <p>

                                        Sauce:
                                        {" "}

                                        {
                                            item.sauce
                                        }

                                    </p>

                                    <p>

                                        Cheese:
                                        {" "}

                                        {
                                            item.cheese
                                        }

                                    </p>

                                    <p>

                                        Veggies:
                                        {" "}

                                        {
                                            item.veggies?.join(
                                                ", "
                                            )
                                        }

                                    </p>

                                </div>
                            )
                        )}

                    </div>


                    {/* STATUS */}

                    <div
                        style={{

                            marginTop:
                                "25px",
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

                                {
                                    order.status
                                }

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
                                In the Kitchen
                            </option>

                            <option>
                                Sent to Delivery
                            </option>

                            <option>
                                Delivered
                            </option>

                        </select>


                        {/* DELETE BUTTON */}

                        {
                            order.status ===
                            "Delivered" && (

                            <button

                                onClick={() =>
                                    deleteOrder(
                                        order._id
                                    )
                                }

                                style={{

                                    marginTop:
                                        "20px",

                                    marginLeft:
                                        "15px",

                                    padding:
                                        "12px 20px",

                                    background:
                                        "#ff0033",

                                    color:
                                        "white",

                                    border:
                                        "none",

                                    borderRadius:
                                        "10px",

                                    cursor:
                                        "pointer",

                                    fontWeight:
                                        "bold",
                                }}
                            >

                                Delete Order 🗑

                            </button>
                        )}

                    </div>

                </div>
            ))}

        </div>
    );
}

export default OrdersAdmin;
