import { useEffect, useState } from "react";

import axios from "axios";

function InventoryAdmin() {

    const [inventory, setInventory] =
        useState([]);

    const [ingredient, setIngredient] =
        useState("");

    const [category, setCategory] =
        useState("");

    const [stock, setStock] =
        useState("");

    const [threshold, setThreshold] =
        useState("");

    const [price, setPrice] =
        useState("");

    // FETCH INVENTORY

    const fetchInventory =
        async () => {

        try {

            const response =
                await axios.get(
                    "http://localhost:5000/api/inventory"
                );

            setInventory(
                response.data
            );

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        fetchInventory();

    }, []);

    // ADD INGREDIENT

    const addIngredient =
        async (e) => {

        e.preventDefault();

        try {

            await axios.post(

                "http://localhost:5000/api/inventory",

                {
                    ingredient,
                    category,
                    stock,
                    threshold,
                    price,
                }
            );

            alert(
                "Ingredient Added ✅"
            );

            setIngredient("");
            setCategory("");
            setStock("");
            setThreshold("");
            setPrice("");

            fetchInventory();

        } catch (error) {

            console.log(error);
        }
    };

    // UPDATE STOCK

    const updateStock =
        async (id, newStock) => {

        try {

            const item =
                inventory.find(
                    (inv) =>
                        inv._id === id
                );

            await axios.put(

                `http://localhost:5000/api/inventory/${id}`,

                {
                    stock: newStock,
                    threshold:
                        item.threshold,
                    price:
                        item.price,
                }
            );

            fetchInventory();

        } catch (error) {

            console.log(error);
        }
    };

    // DELETE

    const deleteIngredient =
        async (id) => {

        try {

            await axios.delete(

                `http://localhost:5000/api/inventory/${id}`
            );

            fetchInventory();

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div
            style={{
                marginTop: "60px",
            }}
        >

            <h1
                style={{
                    marginBottom:
                        "30px",
                }}
            >

                Inventory Management 📦

            </h1>

            {/* FORM */}

            <form

                onSubmit={
                    addIngredient
                }

                style={{

                    display:
                        "flex",

                    flexDirection:
                        "column",

                    gap: "15px",

                    background:
                        "rgba(255,255,255,0.05)",

                    padding:
                        "25px",

                    borderRadius:
                        "20px",

                    marginBottom:
                        "40px",
                }}
            >

                <input

                    type="text"

                    placeholder="Ingredient"

                    value={ingredient}

                    onChange={(e) =>
                        setIngredient(
                            e.target.value
                        )
                    }
                />

                <select
                    value={category}
                    onChange={(e) =>
                        setCategory(
                            e.target.value
                        )
                    }
                    required
                >
                    <option value="">
                        Select Category
                    </option>
                    <option value="Base">
                        Base
                    </option>
                    <option value="Sauce">
                        Sauce
                    </option>
                    <option value="Cheese">
                        Cheese
                    </option>
                    <option value="Veggie">
                        Veggie
                    </option>
                    <option value="Meat">
                        Meat
                    </option>
                </select>

                <input

                    type="number"

                    placeholder="Stock"

                    value={stock}

                    onChange={(e) =>
                        setStock(
                            e.target.value
                        )
                    }
                />

                <input

                    type="number"

                    placeholder="Extra Price"

                    value={price}

                    onChange={(e) =>
                        setPrice(
                            e.target.value
                        )
                    }
                />

                <input

                    type="number"

                    placeholder="Threshold"

                    value={threshold}

                    onChange={(e) =>
                        setThreshold(
                            e.target.value
                        )
                    }
                />

                <button type="submit">

                    Add Ingredient

                </button>

            </form>

            {/* INVENTORY LIST */}

            {inventory.map((item) => (

                <div

                    key={item._id}

                    style={{

                        background:
                            item.stock <=
                            item.threshold

                            ? "rgba(255,0,0,0.2)"

                            : "rgba(255,255,255,0.05)",

                        padding:
                            "20px",

                        borderRadius:
                            "15px",

                        marginBottom:
                            "20px",

                        display:
                            "flex",

                        justifyContent:
                            "space-between",

                        alignItems:
                            "center",
                    }}
                >

                    <div>

                        <h3>
                            {
                                item.ingredient
                            }
                        </h3>

                        <p>
                            Category:
                            {" "}
                            {
                                item.category
                            }
                        </p>

                        <p>

                            Stock:
                            {" "}

                            {item.stock}

                        </p>

                        <p>

                            Threshold:
                            {" "}

                            {
                                item.threshold
                            }

                        </p>

                        <p>

                            Price:
                            {" "}

                            ₹
                            {
                                item.price || 0
                            }

                        </p>

                        {item.stock <=
                            item.threshold && (

                            <p
                                style={{
                                    color:
                                        "red",

                                    fontWeight:
                                        "bold",
                                }}
                            >

                                ⚠ LOW STOCK

                            </p>
                        )}

                    </div>

                    <div
                        style={{
                            display:
                                "flex",

                            gap: "10px",
                        }}
                    >

                        <button

                            onClick={() =>
                                updateStock(

                                    item._id,

                                    item.stock + 1
                                )
                            }
                        >

                            +1

                        </button>

                        <button

                            onClick={() =>
                                updateStock(

                                    item._id,

                                    item.stock - 1
                                )
                            }
                        >

                            -1

                        </button>

                        <button

                            onClick={() =>
                                deleteIngredient(
                                    item._id
                                )
                            }
                        >

                            Delete

                        </button>

                    </div>

                </div>
            ))}

        </div>
    );
}

export default InventoryAdmin;
