import { useEffect, useState } from "react";

import axios from "axios";

import PizzaCard from "../components/PizzaCard";

import AdminDashboard
from "../components/AdminDashboard";

import OrdersAdmin
from "../components/OrdersAdmin";

function Home() {

    const [pizzas, setPizzas] =
        useState([]);

    // load cart
    const [cart, setCart] =
        useState(() => {

            const savedCart =
                localStorage.getItem(
                    "cart"
                );

            return savedCart
                ? JSON.parse(savedCart)
                : [];
        });

    const userInfo = JSON.parse(
        localStorage.getItem(
            "userInfo"
        )
    );

    // fetch pizzas
    const fetchPizzas = async () => {

        try {

            const response =
                await axios.get(
                    "http://localhost:5000/api/pizzas"
                );

            setPizzas(
                response.data
            );

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {
        fetchPizzas();
    }, []);

    // save cart
    useEffect(() => {

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

    }, [cart]);

    // add to cart
    const addToCart = (pizza) => {

        const existingPizza =
            cart.find(
                (item) =>
                    item._id === pizza._id
            );

        if (existingPizza) {

            const updatedCart =
                cart.map((item) =>
                    item._id === pizza._id
                        ? {
                            ...item,
                            quantity:
                                item.quantity + 1,
                        }
                        : item
                );

            setCart(updatedCart);

        } else {

            setCart([
                ...cart,
                {
                    ...pizza,
                    quantity: 1,
                },
            ]);
        }
    };

    // remove item
    const removeFromCart =
        (pizzaId) => {

            const updatedCart =
                cart.filter(
                    (item) =>
                        item._id !== pizzaId
                );

            setCart(updatedCart);
        };

    // total
    const totalPrice =
        cart.reduce(
            (total, item) =>
                total +
                item.price *
                item.quantity,
            0
        );

    // payment
    const placeOrder = async () => {

        try {

            const response =
                await axios.post(
                    "http://localhost:5000/api/payment/create-order",
                    {
                        amount:
                            totalPrice,
                    }
                );

            const order =
                response.data;

            const options = {

                key: "rzp_test_Ss3qL9QJ39or03",

                amount:
                    order.amount,

                currency:
                    order.currency,

                name:
                    "Pizza App 🍕",

                description:
                    "Pizza Payment",

                order_id:
                    order.id,

                handler:
                    async function () {

                        try {

                            await axios.post(
                                "http://localhost:5000/api/orders",
                                {
                                    items: cart,
                                    totalPrice,
                                }
                            );

                            alert(
                                "Payment Successful 🎉"
                            );

                            setCart([]);

                            localStorage.removeItem(
                                "cart"
                            );

                        } catch (error) {

                            console.log(error);
                        }
                    },

                theme: {
                    color:
                        "#3399cc",
                },
            };

            const razor =
                new window.Razorpay(
                    options
                );

            razor.open();

        } catch (error) {

            console.log(error);

            alert(
                "Payment Failed"
            );
        }
    };

    return (
        <div
            style={{
                padding: "20px",
            }}
        >

            {/* Pizzas */}
            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    flexWrap: "wrap",
                    justifyContent:
                        "center",
                }}
            >

                {pizzas.map(
                    (pizza) => (
                        <PizzaCard
                            key={
                                pizza._id
                            }

                            pizza={pizza}

                            addToCart={
                                addToCart
                            }
                        />
                    )
                )}

            </div>

            {/* Cart */}
            <h2
                style={{
                    marginTop:
                        "40px",
                }}
            >
                Cart 🛒
            </h2>

            {cart.length === 0 ? (

                <p>
                    Cart is empty
                </p>

            ) : (

                <div>

                    {cart.map(
                        (item) => (

                            <div
                                key={
                                    item._id
                                }

                                style={{
                                    border:
                                        "1px solid gray",

                                    padding:
                                        "10px",

                                    marginBottom:
                                        "10px",
                                }}
                            >

                                <h3>
                                    {item.name}
                                </h3>

                                <p>
                                    Qty:
                                    {" "}
                                    {
                                        item.quantity
                                    }
                                </p>

                                <p>
                                    ₹
                                    {item.price *
                                        item.quantity}
                                </p>

                                <button
                                    onClick={() =>
                                        removeFromCart(
                                            item._id
                                        )
                                    }
                                >
                                    Remove
                                </button>

                            </div>
                        )
                    )}

                    <h2>
                        Total:
                        {" "}
                        ₹{totalPrice}
                    </h2>

                    <button
                        onClick={
                            placeOrder
                        }
                    >
                        Pay Now 💳
                    </button>

                </div>
            )}

            {/* Admin */}
            {userInfo?.isAdmin && (
                <>
                    <AdminDashboard />

                    <OrdersAdmin />
                </>
            )}

        </div>
    );
}

export default Home;