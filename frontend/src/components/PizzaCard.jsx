import { useState } from "react";

import CustomizePizzaModal
from "./CustomizePizzaModal";

function PizzaCard({

    pizza,
    addToCart,

}) {

    const [showModal,
        setShowModal] =
        useState(false);

    return (

        <>

            <div
                className="
                bg-zinc-900
                border
                border-zinc-700
                rounded-3xl
                overflow-hidden
                w-[300px]
                shadow-xl
                hover:scale-105
                transition
                duration-300
                "
            >

                <img
                    src={pizza.image}

                    alt={pizza.name}

                    className="
                    w-full
                    h-[220px]
                    object-cover
                    "
                />

                <div className="p-5">

                    <h2
                        className="
                        text-3xl
                        font-bold
                        mb-2
                        "
                    >
                        {pizza.name}
                    </h2>

                    <p
                        className="
                        text-zinc-400
                        mb-2
                        "
                    >
                        {pizza.category}
                    </p>

                    <p
                        className="
                        text-2xl
                        font-bold
                        mb-5
                        "
                    >
                        ₹{pizza.price}
                    </p>

                    <div
                        className="
                        flex
                        flex-col
                        gap-3
                        "
                    >

                        {/* ADD TO CART */}

                        <button
                            onClick={() =>
                                addToCart(
                                    pizza
                                )
                            }

                            className="
                            bg-pink-600
                            hover:bg-pink-700
                            py-3
                            rounded-xl
                            font-bold
                            "
                        >
                            Add To Cart 🛒
                        </button>

                        {/* CUSTOMIZE */}

                        <button
                            onClick={() =>
                                setShowModal(
                                    true
                                )
                            }

                            className="
                            border
                            border-pink-500
                            text-pink-400
                            hover:bg-pink-500
                            hover:text-white
                            py-3
                            rounded-xl
                            font-bold
                            transition
                            "
                        >
                            Customize 🍕
                        </button>

                    </div>

                </div>

            </div>

            {/* MODAL */}

            {showModal && (

                <CustomizePizzaModal

                    pizza={pizza}

                    closeModal={() =>
                        setShowModal(false)
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