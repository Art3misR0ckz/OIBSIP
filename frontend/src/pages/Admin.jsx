import { useEffect, useState } from "react";

import axios from "axios";

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
                "Failed to add pizza"
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

            <h1
                style={{
                    textAlign:
                        "center",

                    marginBottom:
                        "40px",
                }}
            >

                Admin Dashboard 👑

            </h1>

            {/* ADD PIZZA */}

            <form

                onSubmit={addPizza}

                style={{

                    maxWidth:
                        "500px",

                    margin:
                        "0 auto",

                    display:
                        "flex",

                    flexDirection:
                        "column",

                    gap: "15px",

                    background:
                        "rgba(255,255,255,0.05)",

                    padding:
                        "30px",

                    borderRadius:
                        "20px",
                }}
            >

                <input

                    type="text"

                    placeholder="Pizza Name"

                    value={name}

                    onChange={(e) =>
                        setName(
                            e.target.value
                        )
                    }
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
                />

                <button type="submit">

                    Add Pizza 🍕

                </button>

            </form>

            {/* PIZZA LIST */}

            <div
                style={{
                    marginTop:
                        "50px",
                }}
            >

                <h2
                    style={{
                        marginBottom:
                            "20px",
                    }}
                >
                    Manage Pizzas
                </h2>

                {pizzas.map(
                    (pizza) => (

                        <div

                            key={pizza._id}

                            style={{

                                display:
                                    "flex",

                                justifyContent:
                                    "space-between",

                                alignItems:
                                    "center",

                                padding:
                                    "15px",

                                background:
                                    "rgba(255,255,255,0.05)",

                                marginBottom:
                                    "15px",

                                borderRadius:
                                    "15px",
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

                                    color:
                                        "white",

                                    border:
                                        "none",

                                    padding:
                                        "10px 15px",

                                    borderRadius:
                                        "10px",

                                    cursor:
                                        "pointer",
                                }}
                            >

                                Delete

                            </button>

                        </div>
                    )
                )}

            </div>

        </div>
    );
}

export default Admin;