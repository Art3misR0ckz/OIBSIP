import { useEffect, useState } from "react";
import axios from "axios";

function OrdersAdmin() {

    const [orders, setOrders] = useState([]);

    // fetch orders
    const fetchOrders = async () => {

        try {

            const response = await axios.get(
                "http://localhost:5000/api/orders"
            );

            setOrders(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // update order status
    const updateStatus = async (
        orderId,
        status
    ) => {

        try {

            await axios.put(
                `http://localhost:5000/api/orders/${orderId}`,
                { status }
            );

            alert("Status Updated 🚚");

            fetchOrders();

        } catch (error) {

            console.log(error);

            alert("Update failed");
        }
    };

    return (
        <div
            style={{
                marginTop: "50px",
                padding: "20px",
                border: "1px solid gray",
                borderRadius: "10px",
            }}
        >

            <h2>
                Orders Management 📦
            </h2>

            {orders.length === 0 ? (

                <p>No Orders Yet</p>

            ) : (

                orders.map((order) => (

                    <div
                        key={order._id}
                        style={{
                            border: "1px solid gray",
                            padding: "15px",
                            marginTop: "20px",
                            borderRadius: "10px",
                        }}
                    >

                        <h3>
                            Order ID:
                        </h3>

                        <p>
                            {order._id}
                        </p>

                        <h4>Status:</h4>

                        <p>
                            {order.status}
                        </p>

                        <h4>Items:</h4>

                        {order.items.map((item, index) => (

                            <div key={index}>

                                <p>
                                    {item.name}
                                    {" "}
                                    ×
                                    {" "}
                                    {item.quantity}
                                </p>

                            </div>
                        ))}

                        <h4>
                            Total:
                            {" "}
                            ₹{order.totalPrice}
                        </h4>

                        <select
                            onChange={(e) =>
                                updateStatus(
                                    order._id,
                                    e.target.value
                                )
                            }
                            value={order.status}
                            style={{
                                marginTop: "10px",
                                padding: "8px",
                            }}
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
                ))
            )}

        </div>
    );
}

export default OrdersAdmin;