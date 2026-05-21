import { useState } from "react";

function CustomizePizzaModal({

    pizza,
    closeModal,
    addCustomizedPizza,

}) {

    // SIZE

    const [size, setSize] =
        useState("Medium");

    // TOPPINGS

    const [extras, setExtras] =
        useState([]);

    // PRICES

    const sizePrices = {

        Small: 0,
        Medium: 80,
        Large: 150,
    };

    const toppingPrices = {

        Cheese: 40,
        Mushroom: 30,
        Corn: 20,
        Onion: 15,
        Olives: 35,
        Capsicum: 25,
    };

    // HANDLE TOPPINGS

    const toggleExtra =
        (item) => {

        if (extras.includes(item)) {

            setExtras(
                extras.filter(
                    (extra) =>
                        extra !== item
                )
            );

        } else {

            setExtras([
                ...extras,
                item,
            ]);
        }
    };

    // TOTAL PRICE

    const totalPrice =

        pizza.price +

        sizePrices[size] +

        extras.reduce(

            (total, item) =>

                total +
                toppingPrices[item],

            0
        );

    // ADD CUSTOM PIZZA

    const handleAddPizza =
        () => {

        const customizedPizza = {

            ...pizza,

            size,

            extras,

            price: totalPrice,
        };

        addCustomizedPizza(
            customizedPizza
        );

        closeModal();
    };

    return (

        <div

            style={{

                position: "fixed",

                top: 0,
                left: 0,

                width: "100%",
                height: "100%",

                background:
                    "rgba(0,0,0,0.7)",

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

                    width: "450px",

                    background:
                        "#111827",

                    padding: "30px",

                    borderRadius:
                        "25px",

                    border:
                        "1px solid rgba(255,255,255,0.1)",

                    boxShadow:
                        "0 0 30px rgba(255,0,150,0.3)",
                }}
            >

                <h2

                    style={{

                        fontSize: "2rem",

                        marginBottom:
                            "25px",

                        textAlign:
                            "center",
                    }}
                >

                    Customize 🍕

                </h2>

                {/* SIZE */}

                <div
                    style={{
                        marginBottom:
                            "25px",
                    }}
                >

                    <h3>
                        Select Size
                    </h3>

                    <select

                        value={size}

                        onChange={(e) =>
                            setSize(
                                e.target.value
                            )
                        }

                        style={{

                            width: "100%",

                            padding: "12px",

                            marginTop:
                                "10px",

                            borderRadius:
                                "10px",

                            background:
                                "#1f2937",

                            color: "white",

                            border:
                                "none",
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

                </div>

                {/* TOPPINGS */}

                <div>

                    <h3>
                        Extra Toppings
                    </h3>

                    <div

                        style={{

                            display: "grid",

                            gridTemplateColumns:
                                "1fr 1fr",

                            gap: "10px",

                            marginTop:
                                "15px",
                        }}
                    >

                        {Object.keys(
                            toppingPrices
                        ).map((item) => (

                            <label
                                key={item}
                            >

                                <input

                                    type="checkbox"

                                    checked={
                                        extras.includes(
                                            item
                                        )
                                    }

                                    onChange={() =>
                                        toggleExtra(
                                            item
                                        )
                                    }
                                />

                                {" "}

                                {item}

                                {" "}

                                (+₹
                                {
                                    toppingPrices[
                                        item
                                    ]
                                })

                            </label>
                        ))}

                    </div>

                </div>

                {/* PRICE */}

                <h2

                    style={{

                        marginTop:
                            "30px",

                        textAlign:
                            "center",

                        color:
                            "#ff0080",
                    }}
                >

                    Total: ₹
                    {totalPrice}

                </h2>

                {/* BUTTONS */}

                <div

                    style={{

                        display: "flex",

                        gap: "15px",

                        marginTop:
                            "30px",
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
                                "12px",

                            border:
                                "none",

                            cursor:
                                "pointer",
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

                            borderRadius:
                                "12px",

                            border:
                                "none",

                            background:
                                "linear-gradient(90deg,#ff0080,#7928ca)",

                            color:
                                "white",

                            fontWeight:
                                "bold",

                            cursor:
                                "pointer",
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