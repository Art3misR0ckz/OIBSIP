import { useEffect, useState } from "react";

import axios from "axios";

import PizzaCard from "../components/PizzaCard";

function Home() {

    const [pizzas, setPizzas] =
        useState([]);

    const [cart, setCart] =
        useState([]);

    const userInfo = JSON.parse(
        localStorage.getItem(
            "userInfo"
        )
    );

    // FETCH PIZZAS

    const fetchPizzas =
        async () => {

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

    // ADD TO CART

    const addToCart =
        (pizza) => {

        const existingPizza =
            cart.find(

                (item) =>

                    item._id ===
                    pizza._id &&

                    JSON.stringify(
                        item.extras
                    ) ===

                    JSON.stringify(
                        pizza.extras
                    ) &&

                    item.size ===
                    pizza.size
            );

        if (existingPizza) {

            const updatedCart =
                cart.map((item) =>

                    item === existingPizza

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

    // REMOVE ITEM

    const removeFromCart =
        (pizzaId) => {

        const updatedCart =
            cart.filter(
                (item) =>
                    item._id !== pizzaId
            );

        setCart(updatedCart);
    };

    // TOTAL PRICE

    const totalPrice =
        cart.reduce(

            (total, item) =>

                total +
                item.price *
                item.quantity,

            0
        );

    // PAYMENT

    const placeOrder =
        async () => {

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

                key:
                    "rzp_test_Ss3qL9QJ39or03",

                amount:
                    order.amount,

                currency:
                    order.currency,

                name:
                    "PizzaVerse 🍕",

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

                                    userId:
                                        userInfo._id,
                                }
                            );

                            alert(
                                "Payment Successful 🎉"
                            );

                            setCart([]);

                        } catch (error) {

                            console.log(error);
                        }
                    },

                theme: {
                    color:
                        "#ff0080",
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

        <div className="app">

            {/* HERO */}

            <div
                style={{
                    textAlign:
                        "center",

                    marginBottom:
                        "50px",
                }}
            >

                <h1 className="title">

                    PizzaVerse 🍕

                </h1>

                <p
                    style={{
                        color:
                            "#b3b3b3",

                        marginTop:
                            "10px",

                        fontSize:
                            "1.1rem",
                    }}
                >

                    Crazzyy Pizza Ordering Experience

                </p>

            </div>

            {/* PIZZA GRID */}

            <div className="pizza-grid">

                {pizzas.map((pizza) => (

                    <PizzaCard

                        key={pizza._id}

                        pizza={pizza}

                        addToCart={
                            addToCart
                        }
                    />
                ))}

            </div>

            {/* CART */}

            <div className="cart-section">

                <h2 className="cart-title">

                    Your Cart 🛒

                </h2>

                {cart.length === 0 ? (

                    <p>
                        Cart is empty
                    </p>

                ) : (

                    <>
                        {cart.map((item) => (

                            <div

                                key={item._id}

                                className="
                                cart-item
                                "
                            >

                                <div>

                                    <h3>
                                        {item.name}
                                    </h3>

                                    {/* SIZE */}

                                    {item.size && (

                                        <p>
                                            Size:
                                            {" "}
                                            {item.size}
                                        </p>
                                    )}

                                    {/* EXTRAS */}

                                    {item.extras &&
                                        item.extras.length > 0 && (

                                        <p>

                                            Extras:
                                            {" "}

                                            {item.extras.join(
                                                ", "
                                            )}

                                        </p>
                                    )}

                                    <p>

                                        Qty:
                                        {" "}

                                        {item.quantity}

                                    </p>

                                </div>

                                <div
                                    style={{
                                        textAlign:
                                            "right",
                                    }}
                                >

                                    <p>

                                        ₹

                                        {item.price *
                                        item.quantity}

                                    </p>

                                    <button

                                        className="
                                        btn
                                        custom-btn
                                        "

                                        onClick={() =>
                                            removeFromCart(
                                                item._id
                                            )
                                        }
                                    >

                                        Remove

                                    </button>

                                </div>

                            </div>
                        ))}

                        {/* TOTAL */}

                        <div className="total">

                            Total:
                            {" "}

                            ₹{totalPrice}

                        </div>

                        {/* PAY BUTTON */}

                        <div
                            style={{
                                marginTop:
                                    "25px",

                                textAlign:
                                    "right",
                            }}
                        >

                            <button

                                className="
                                btn
                                cart-btn
                                "

                                onClick={
                                    placeOrder
                                }
                            >

                                Pay Now 💳

                            </button>


                            <button
                                className="
                                btn
                                custom-btn
                                "

                                style={{
                                     marginTop: "15px",
                                     width: "100%",
                                }}

                                onClick={async () => {
                                    try {
                                         await axios.post(
                                            "http://localhost:5000/api/orders",
                                            {
                                                items: cart,
                                                totalPrice,
                                                userId: userInfo._id,
                                            }
                                        );

                                        alert("Fake Test Order Added 🚀");

                                        setCart([]);
                                    } catch (error) {
                                        console.log(error);
                                    }
                                }}
                            >
                                Fake Order (DEV MODE) 🧪
                            </button>
    









                        </div>

                    </>
                )}

            </div>

        </div>
    );
}

export default Home;