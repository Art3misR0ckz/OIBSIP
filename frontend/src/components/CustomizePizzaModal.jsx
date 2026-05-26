import { useEffect, useState }
from "react";

import axios from "axios";

function CustomizePizzaModal({

    pizza,
    closeModal,
    addCustomizedPizza,

}) {

    const [inventory, setInventory] =
        useState([]);

    const [base, setBase] =
        useState("");

    const [sauce, setSauce] =
        useState("");

    const [cheese, setCheese] =
        useState("");

    const [veggies, setVeggies] =
        useState([]);

    const [size, setSize] =
        useState("Medium");


    // FETCH INVENTORY

    useEffect(() => {

        fetchInventory();

    }, []);

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


    // FILTER INVENTORY

    const bases =
        inventory.filter(

            (item) =>
                item.category ===
                "Base"
        );

    const sauces =
        inventory.filter(

            (item) =>
                item.category ===
                "Sauce"
        );

    const cheeses =
        inventory.filter(

            (item) =>
                item.category ===
                "Cheese"
        );

    const veggiesList =
        inventory.filter(

            (item) =>
                item.category ===
                "Veggie"
        );


    // SIZE PRICES

    const sizePrices = {

        Small: 0,

        Medium: 120,

        Large: 250,
    };


    // VEGGIE TOGGLE

    const toggleVeggie =
        (item) => {

        if (
            veggies.includes(item)
        ) {

            setVeggies(

                veggies.filter(
                    (veg) =>
                        veg !== item
                )
            );

        } else {

            setVeggies([
                ...veggies,
                item,
            ]);
        }
    };


    // SELECTED ITEMS

    const selectedBase =
        inventory.find(

            (item) =>
                item.ingredient ===
                base
        );

    const selectedSauce =
        inventory.find(

            (item) =>
                item.ingredient ===
                sauce
        );

    const selectedCheese =
        inventory.find(

            (item) =>
                item.ingredient ===
                cheese
        );


    // VEGGIE PRICE

    const veggiePrice =
        veggies.reduce(

            (total, veg) => {

                const foundVeg =
                    inventory.find(

                        (item) =>
                            item.ingredient ===
                            veg
                    );

                return (

                    total +

                    (
                        foundVeg?.price || 30
                    )
                );

            },

            0
        );


    // TOTAL PRICE

    const totalPrice =

        pizza.price +

        sizePrices[size] +

        (
            selectedBase?.price || 0
        ) +

        (
            selectedSauce?.price || 0
        ) +

        (
            selectedCheese?.price || 0
        ) +

        veggiePrice;


    // ADD CUSTOM PIZZA

    const handleAddPizza =
        () => {

        const customizedPizza = {

            ...pizza,

            size,

            base,

            sauce,

            cheese,

            veggies,

            price:
                totalPrice,
        };

        addCustomizedPizza(
            customizedPizza
        );

        closeModal();
    };


    return (

        <div
            style={{

                position:
                    "fixed",

                top: 0,
                left: 0,

                width: "100%",
                height: "100%",

                background:
                    "rgba(0,0,0,0.8)",

                display: "flex",

                justifyContent:
                    "center",

                alignItems:
                    "center",

                zIndex: 999,
            }}
        >

            <div
                style={{

                    width: "90%",

                    maxWidth: "500px",

                    maxHeight: "90vh",

                    overflowY: "auto",

                    background:
                        "#111827",

                    padding:
                        "35px",

                    borderRadius:
                        "25px",

                    color:
                        "white",

                    boxShadow:
                        "0 0 40px rgba(255,0,150,0.3)",
                }}
            >

                <h1
                    style={{

                        textAlign:
                            "center",

                        marginBottom:
                            "30px",
                    }}
                >

                    Customize 🍕

                </h1>


                {/* SIZE */}

                <h3>Size</h3>

                <select

                    value={size}

                    onChange={(e) =>
                        setSize(
                            e.target.value
                        )
                    }

                    style={{

                        width: "100%",

                        padding:
                            "12px",

                        marginBottom:
                            "20px",
                    }}
                >

                    <option>
                        Small
                    </option>

                    <option>
                        Medium
                    </option>

                    <option>
                        Large
                    </option>

                </select>


                {/* BASE */}

                <h3>Base</h3>

                <select

                    value={base}

                    onChange={(e) =>
                        setBase(
                            e.target.value
                        )
                    }

                    style={{

                        width: "100%",

                        padding:
                            "12px",

                        marginBottom:
                            "20px",
                    }}
                >

                    <option value="">
                        Select Base
                    </option>

                    {bases.map((item) => (

                        <option

                            key={item._id}

                            disabled={
                                item.stock <= 0
                            }

                            value={
                                item.ingredient
                            }
                        >

                            {
                                item.ingredient
                            }

                            {" "}
                            (+₹
                            {item.price || 0})

                        </option>
                    ))}

                </select>


                {/* SAUCE */}

                <h3>Sauce</h3>

                <select

                    value={sauce}

                    onChange={(e) =>
                        setSauce(
                            e.target.value
                        )
                    }

                    style={{

                        width: "100%",

                        padding:
                            "12px",

                        marginBottom:
                            "20px",
                    }}
                >

                    <option value="">
                        Select Sauce
                    </option>

                    {sauces.map((item) => (

                        <option

                            key={item._id}

                            disabled={
                                item.stock <= 0
                            }

                            value={
                                item.ingredient
                            }
                        >

                            {
                                item.ingredient
                            }

                            {" "}
                            (+₹
                            {item.price || 0})

                        </option>
                    ))}

                </select>


                {/* CHEESE */}

                <h3>Cheese</h3>

                <select

                    value={cheese}

                    onChange={(e) =>
                        setCheese(
                            e.target.value
                        )
                    }

                    style={{

                        width: "100%",

                        padding:
                            "12px",

                        marginBottom:
                            "20px",
                    }}
                >

                    <option value="">
                        Select Cheese
                    </option>

                    {cheeses.map((item) => (

                        <option

                            key={item._id}

                            disabled={
                                item.stock <= 0
                            }

                            value={
                                item.ingredient
                            }
                        >

                            {
                                item.ingredient
                            }

                            {" "}
                            (+₹
                            {item.price || 0})

                        </option>
                    ))}

                </select>


                {/* VEGGIES */}

                <h3>Veggies</h3>

                <div
                    style={{

                        display:
                            "grid",

                        gridTemplateColumns:
                            "1fr 1fr",

                        gap: "10px",

                        marginBottom:
                            "25px",
                    }}
                >

                    {veggiesList.map(
                        (item) => (

                        <label
                            key={item._id}
                        >

                            <input

                                type="checkbox"

                                disabled={
                                    item.stock <= 0
                                }

                                checked={
                                    veggies.includes(
                                        item.ingredient
                                    )
                                }

                                onChange={() =>
                                    toggleVeggie(
                                        item.ingredient
                                    )
                                }
                            />

                            {" "}

                            {
                                item.ingredient
                            }

                            {" "}

                            (+₹
                            {item.price || 30})

                            {" "}

                            ({item.stock}
                            left)

                        </label>
                    ))}

                </div>


                {/* TOTAL */}

                <h2
                    style={{

                        textAlign:
                            "center",

                        color:
                            "#ff0080",

                        marginBottom:
                            "25px",
                    }}
                >

                    Total: ₹
                    {totalPrice}

                </h2>


                {/* BUTTONS */}

                <div
                    style={{

                        display:
                            "flex",

                        gap: "15px",
                    }}
                >

                    <button

                        onClick={
                            closeModal
                        }

                        style={{

                            flex: 1,

                            padding:
                                "14px",

                            borderRadius:
                                "10px",

                            border:
                                "none",
                        }}
                    >

                        Cancel

                    </button>

                    <button

                        onClick={
                            handleAddPizza
                        }

                        style={{

                            flex: 1,

                            padding:
                                "14px",

                            background:
                                "linear-gradient(90deg,#ff0080,#7928ca)",

                            color:
                                "white",

                            border:
                                "none",

                            borderRadius:
                                "10px",

                            fontWeight:
                                "bold",
                        }}
                    >

                        Add Pizza 🍕

                    </button>

                </div>

            </div>

        </div>
    );
}

export default CustomizePizzaModal;