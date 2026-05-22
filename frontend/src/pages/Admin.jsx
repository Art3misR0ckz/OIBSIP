import { useEffect, useState } from "react";

import axios from "axios";

import OrdersAdmin
from "../components/OrdersAdmin";

function Admin() {

    const [pizzas, setPizzas] =
        useState([]);

    const [name, setName] =
        useState("");

    const [price, setPrice] =
        useState("");

    const [image, setImage] =
        useState("");

    const [category, setCategory] =
        useState("");

    const userInfo = JSON.parse(
        localStorage.getItem(
            "userInfo"
        )
    );

    // PROTECT ADMIN PAGE

    useEffect(() => {

        if (
            !userInfo ||
            !userInfo.isAdmin
        ) {

            window.location.href =
                "/";
        }

    }, []);

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

    // ADD PIZZA

    const addPizza =
        async (e) => {

        e.preventDefault();

        try {

            await axios.post(

                "http://localhost:5000/api/pizzas",

                {
                    name,
                    price,
                    image,
                    category,
                }
            );

            alert(
                "Pizza Added 🍕"
            );

            setName("");
            setPrice("");
            setImage("");
            setCategory("");

            fetchPizzas();

        } catch (error) {

            console.log(error);

            alert(
                "Failed To Add Pizza"
            );
        }
    };

    // DELETE PIZZA

    const deletePizza =
        async (id) => {

        try {

            await axios.delete(

                `http://localhost:5000/api/pizzas/${id}`
            );

            alert(
                "Pizza Deleted ❌"
            );

            fetchPizzas();

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div
            style={{
                padding: "40px",
            }}
        >

            {/* TITLE */}

            <h1
                style={{

                    textAlign:
                        "center",

                    marginBottom:
                        "40px",

                    fontSize:
                        "3rem",
                }}
            >

                Admin Dashboard 👑

            </h1>

            {/* ADD PIZZA FORM */}

            <form

                onSubmit={addPizza}

                style={{

                    maxWidth:
                        "600px",

                    margin:
                        "0 auto",

                    display:
                        "flex",

                    flexDirection:
                        "column",

                    gap: "18px",

                    background:
                        "rgba(255,255,255,0.05)",

                    padding:
                        "35px",

                    borderRadius:
                        "25px",

                    border:
                        "1px solid rgba(255,255,255,0.1)",
                }}
            >

                <h2
                    style={{
                        textAlign:
                            "center",
                    }}
                >

                    Add New Pizza 🍕

                </h2>

                <input

                    type="text"

                    placeholder="Pizza Name"

                    value={name}

                    onChange={(e) =>
                        setName(
                            e.target.value
                        )
                    }

                    style={{
                        padding:
                            "15px",

                        borderRadius:
                            "12px",

                        border:
                            "none",

                        background:
                            "#1f2937",

                        color:
                            "white",
                    }}
                />

                <input

                    type="number"

                    placeholder="Price"

                    value={price}

                    onChange={(e) =>
                        setPrice(
                            e.target.value
                        )
                    }

                    style={{
                        padding:
                            "15px",

                        borderRadius:
                            "12px",

                        border:
                            "none",

                        background:
                            "#1f2937",

                        color:
                            "white",
                    }}
                />

                <input

                    type="text"

                    placeholder="Image URL"

                    value={image}

                    onChange={(e) =>
                        setImage(
                            e.target.value
                        )
                    }

                    style={{
                        padding:
                            "15px",

                        borderRadius:
                            "12px",

                        border:
                            "none",

                        background:
                            "#1f2937",

                        color:
                            "white",
                    }}
                />

                <input

                    type="text"

                    placeholder="Category"

                    value={category}

                    onChange={(e) =>
                        setCategory(
                            e.target.value
                        )
                    }

                    style={{
                        padding:
                            "15px",

                        borderRadius:
                            "12px",

                        border:
                            "none",

                        background:
                            "#1f2937",

                        color:
                            "white",
                    }}
                />

                <button

                    type="submit"

                    style={{

                        padding:
                            "15px",

                        border:
                            "none",

                        borderRadius:
                            "14px",

                        background:
                            "linear-gradient(90deg,#ff0080,#7928ca)",

                        color:
                            "white",

                        fontWeight:
                            "bold",

                        cursor:
                            "pointer",

                        fontSize:
                            "1rem",
                    }}
                >

                    Add Pizza 🚀

                </button>

            </form>

            {/* MANAGE PIZZAS */}

            <div
                style={{
                    marginTop:
                        "60px",
                }}
            >

                <h2
                    style={{
                        marginBottom:
                            "25px",

                        fontSize:
                            "2rem",
                    }}
                >

                    Manage Pizzas 🍕

                </h2>

                {pizzas.map((pizza) => (

                    <div

                        key={pizza._id}

                        style={{

                            display:
                                "flex",

                            justifyContent:
                                "space-between",

                            alignItems:
                                "center",

                            background:
                                "rgba(255,255,255,0.05)",

                            padding:
                                "20px",

                            borderRadius:
                                "18px",

                            marginBottom:
                                "18px",

                            border:
                                "1px solid rgba(255,255,255,0.08)",
                        }}
                    >

                        <div>

                            <h3>
                                {pizza.name}
                            </h3>

                            <p>
                                ₹
                                {pizza.price}
                            </p>

                            <p>
                                {
                                    pizza.category
                                }
                            </p>

                        </div>

                        <button

                            onClick={() =>
                                deletePizza(
                                    pizza._id
                                )
                            }

                            style={{

                                background:
                                    "red",

                                border:
                                    "none",

                                color:
                                    "white",

                                padding:
                                    "12px 18px",

                                borderRadius:
                                    "12px",

                                cursor:
                                    "pointer",
                            }}
                        >

                            Delete ❌

                        </button>

                    </div>
                ))}

            </div>

            {/* ORDER MANAGEMENT */}

            <OrdersAdmin />

        </div>
    );
}

export default Admin;