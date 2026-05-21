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
            <div className="pizza-card">

                <img
                    src={pizza.image}
                    alt={pizza.name}
                    className="pizza-image"
                />

                <div className="pizza-content">

                    <h2 className="pizza-name">
                        {pizza.name}
                    </h2>

                    <p className="pizza-category">
                        {pizza.category}
                    </p>

                    <p className="pizza-price">
                        ₹{pizza.price}
                    </p>

                    <div className="btn-group">

                        <button
                            className="
                            btn cart-btn
                            "

                            onClick={() =>
                                addToCart(pizza)
                            }
                        >
                            Add To Cart 🛒
                        </button>

                        <button
                            className="
                            btn custom-btn
                            "

                            onClick={() =>
                                setShowModal(true)
                            }
                        >
                            Customize 🍕
                        </button>

                    </div>

                </div>
            </div>

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