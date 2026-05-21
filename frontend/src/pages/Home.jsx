import { useEffect, useState } from "react";
import axios from "axios";

import PizzaCard from "../components/PizzaCard";
import AdminDashboard from "../components/AdminDashboard";
import OrdersAdmin from "../components/OrdersAdmin";

function Home() {

    const [pizzas, setPizzas] = useState([]);

    const [cart, setCart] = useState(() => {

        const savedCart =
            localStorage.getItem("cart");

        return savedCart
            ? JSON.parse(savedCart)
            : [];
    });

    const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
    );

    // fetch pizzas
    const fetchPizzas = async () => {

        try {

            const response =
                await axios.get(
                    "http://localhost:5000/api/pizzas"
                );

            setPizzas(response.data);

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
                        "#ff0077",
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
            className="
            min-h-screen
            bg-gradient-to-br
            from-black
            via-zinc-900
            to-black
            text-white
            px-6
            py-10
            "
        >

            {/* HERO */}

            <div className="text-center mb-16">

                <h1
                    className="
                    text-7xl
                    font-black
                    tracking-wider
                    bg-gradient-to-r
                    from-pink-500
                    via-red-500
                    to-yellow-400
                    bg-clip-text
                    text-transparent
                    drop-shadow-lg
                    "
                >
                    PIZZA VERSE 🍕
                </h1>

                <p
                    className="
                    text-zinc-400
                    mt-4
                    text-lg
                    tracking-wide
                    "
                >
                    Neon powered pizza ordering experience
                </p>

            </div>

            {/* PIZZAS */}

            <div
                className="
                flex
                flex-wrap
                justify-center
                gap-10
                "
            >

                {pizzas.map(
                    (pizza) => (

                        <PizzaCard
                            key={pizza._id}
                            pizza={pizza}
                            addToCart={addToCart}
                        />
                    )
                )}

            </div>

            {/* CART */}

            <div
                className="
                mt-20
                max-w-4xl
                mx-auto
                bg-zinc-900/60
                backdrop-blur-lg
                border
                border-zinc-700
                rounded-3xl
                p-8
                shadow-2xl
                "
            >

                <h2
                    className="
                    text-4xl
                    font-bold
                    mb-8
                    text-center
                    "
                >
                    Your Cart 🛒
                </h2>

                {cart.length === 0 ? (

                    <p
                        className="
                        text-center
                        text-zinc-400
                        text-lg
                        "
                    >
                        Cart is empty
                    </p>

                ) : (

                    <div>

                        {cart.map(
                            (item) => (

                                <div
                                    key={item._id}

                                    className="
                                    flex
                                    justify-between
                                    items-center
                                    bg-black/40
                                    border
                                    border-zinc-700
                                    rounded-2xl
                                    p-5
                                    mb-4
                                    "
                                >

                                    <div>

                                        <h3
                                            className="
                                            text-2xl
                                            font-semibold
                                            "
                                        >
                                            {item.name}
                                        </h3>

                                        <p className="text-zinc-400">
                                            Qty:
                                            {" "}
                                            {item.quantity}
                                        </p>

                                    </div>

                                    <div className="text-right">

                                        <p
                                            className="
                                            text-xl
                                            font-bold
                                            "
                                        >
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

                                            className="
                                            mt-3
                                            bg-red-600
                                            hover:bg-red-700
                                            px-4
                                            py-2
                                            rounded-lg
                                            transition
                                            "
                                        >
                                            Remove
                                        </button>

                                    </div>

                                </div>
                            )
                        )}

                        <div
                            className="
                            mt-10
                            text-center
                            "
                        >

                            <h2
                                className="
                                text-5xl
                                font-black
                                mb-6
                                "
                            >
                                Total:
                                {" "}
                                ₹{totalPrice}
                            </h2>

                            <button
                                onClick={placeOrder}

                                className="
                                bg-gradient-to-r
                                from-pink-500
                                via-red-500
                                to-yellow-500
                                hover:scale-105
                                transition
                                duration-300
                                px-10
                                py-4
                                rounded-2xl
                                text-xl
                                font-bold
                                shadow-xl
                                "
                            >
                                Pay Now 💳
                            </button>

                        </div>

                    </div>
                )}

            </div>

            {/* ADMIN */}

            {userInfo?.isAdmin && (

                <div className="mt-20">

                    <AdminDashboard />

                    <OrdersAdmin />

                </div>
            )}

        </div>
    );
}

export default Home;