import { useState }
from "react";

import CustomizePizzaModal
from "./CustomizePizzaModal";

function PizzaCard({

    pizza,
    addToCart,

}) {

    const [showCustomize,
        setShowCustomize] =
        useState(false);

    return (

        <>
            <div
                style={{

                    background:
                        "rgba(255,255,255,0.05)",

                    borderRadius:
                        "25px",

                    overflow:
                        "hidden",

                    boxShadow:
                        "0 0 25px rgba(255,0,150,0.2)",

                    transition:
                        "0.3s",

                    border:
                        "1px solid rgba(255,255,255,0.08)",
                }}
            >

                {/* IMAGE */}

                <img

                    src={pizza.image}

                    alt={pizza.name}

                    style={{

                        width: "100%",

                        height: "220px",

                        objectFit:
                            "cover",
                    }}
                />


                {/* CONTENT */}

                <div
                    style={{

                        padding:
                            "20px",
                    }}
                >

                    <h2
                        style={{

                            fontSize:
                                "2rem",

                            marginBottom:
                                "10px",
                        }}
                    >

                        {pizza.name}

                    </h2>

                    <p
                        style={{

                            color:
                                "#ccc",

                            marginBottom:
                                "10px",
                        }}
                    >

                        {pizza.category}

                    </p>

                    <h3
                        style={{

                            marginBottom:
                                "20px",

                            fontSize:
                                "2rem",
                        }}
                    >

                        ₹{pizza.price}

                    </h3>


                    {/* BUTTON */}

                    <button

                        onClick={() =>
                            setShowCustomize(
                                true
                            )
                        }

                        style={{

                            width:
                                "100%",

                            padding:
                                "15px",

                            border:
                                "none",

                            borderRadius:
                                "12px",

                            background:
                                "linear-gradient(90deg,#ff0080,#7928ca)",

                            color:
                                "white",

                            fontSize:
                                "18px",

                            fontWeight:
                                "bold",

                            cursor:
                                "pointer",
                        }}
                    >

                        Add To Cart 🛒

                    </button>

                </div>
            </div>


            {/* CUSTOMIZE MODAL */}

            {
                showCustomize && (

                <CustomizePizzaModal

                    pizza={pizza}

                    closeModal={() =>
                        setShowCustomize(
                            false
                        )
                    }

                    addCustomizedPizza={
                        addToCart
                    }
                />
            )}
        </>
    );
}

export default PizzaCard;