import { useState } from "react";

function CustomizePizzaModal({

    pizza,
    closeModal,
    addCustomizedPizza,

}) {

    const [base, setBase] =
        useState("Thin Crust");

    const [sauce, setSauce] =
        useState("Tomato");

    const [cheese, setCheese] =
        useState("Mozzarella");

    const [veggies, setVeggies] =
        useState([]);

    const veggieOptions = [

        "Onion",
        "Capsicum",
        "Corn",
        "Mushroom",
        "Olives",

    ];

    // toggle veggie
    const handleVeggieChange =
        (veggie) => {

            if (
                veggies.includes(veggie)
            ) {

                setVeggies(
                    veggies.filter(
                        (v) => v !== veggie
                    )
                );

            } else {

                setVeggies([
                    ...veggies,
                    veggie,
                ]);
            }
        };

    // add customized pizza
    const handleAdd =
        () => {

            const customizedPizza = {

                ...pizza,

                customizations: {
                    base,
                    sauce,
                    cheese,
                    veggies,
                },

                quantity: 1,
            };

            addCustomizedPizza(
                customizedPizza
            );

            closeModal();
        };

    return (

        <div
            className="
            fixed
            inset-0
            bg-black/70
            flex
            justify-center
            items-center
            z-50
            "
        >

            <div
                className="
                bg-zinc-900
                text-white
                p-8
                rounded-3xl
                w-[500px]
                border
                border-zinc-700
                shadow-2xl
                "
            >

                <h2
                    className="
                    text-4xl
                    font-bold
                    mb-6
                    text-center
                    "
                >
                    Customize 🍕
                </h2>

                {/* BASE */}

                <div className="mb-5">

                    <label
                        className="
                        block
                        mb-2
                        text-lg
                        "
                    >
                        Choose Base
                    </label>

                    <select
                        value={base}

                        onChange={(e) =>
                            setBase(
                                e.target.value
                            )
                        }

                        className="
                        w-full
                        p-3
                        rounded-xl
                        bg-black
                        border
                        border-zinc-700
                        "
                    >

                        <option>
                            Thin Crust
                        </option>

                        <option>
                            Cheese Burst
                        </option>

                        <option>
                            Pan Base
                        </option>

                    </select>

                </div>

                {/* SAUCE */}

                <div className="mb-5">

                    <label
                        className="
                        block
                        mb-2
                        text-lg
                        "
                    >
                        Choose Sauce
                    </label>

                    <select
                        value={sauce}

                        onChange={(e) =>
                            setSauce(
                                e.target.value
                            )
                        }

                        className="
                        w-full
                        p-3
                        rounded-xl
                        bg-black
                        border
                        border-zinc-700
                        "
                    >

                        <option>
                            Tomato
                        </option>

                        <option>
                            BBQ
                        </option>

                        <option>
                            Peri Peri
                        </option>

                    </select>

                </div>

                {/* CHEESE */}

                <div className="mb-5">

                    <label
                        className="
                        block
                        mb-2
                        text-lg
                        "
                    >
                        Choose Cheese
                    </label>

                    <select
                        value={cheese}

                        onChange={(e) =>
                            setCheese(
                                e.target.value
                            )
                        }

                        className="
                        w-full
                        p-3
                        rounded-xl
                        bg-black
                        border
                        border-zinc-700
                        "
                    >

                        <option>
                            Mozzarella
                        </option>

                        <option>
                            Cheddar
                        </option>

                        <option>
                            Parmesan
                        </option>

                    </select>

                </div>

                {/* VEGGIES */}

                <div className="mb-6">

                    <label
                        className="
                        block
                        mb-3
                        text-lg
                        "
                    >
                        Veggies
                    </label>

                    <div
                        className="
                        grid
                        grid-cols-2
                        gap-3
                        "
                    >

                        {veggieOptions.map(
                            (veggie) => (

                                <label
                                    key={veggie}

                                    className="
                                    flex
                                    items-center
                                    gap-2
                                    "
                                >

                                    <input
                                        type="checkbox"

                                        checked={
                                            veggies.includes(
                                                veggie
                                            )
                                        }

                                        onChange={() =>
                                            handleVeggieChange(
                                                veggie
                                            )
                                        }
                                    />

                                    {veggie}

                                </label>
                            )
                        )}

                    </div>

                </div>

                {/* BUTTONS */}

                <div
                    className="
                    flex
                    gap-4
                    "
                >

                    <button
                        onClick={closeModal}

                        className="
                        flex-1
                        bg-zinc-700
                        hover:bg-zinc-600
                        py-3
                        rounded-xl
                        "
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleAdd}

                        className="
                        flex-1
                        bg-pink-600
                        hover:bg-pink-700
                        py-3
                        rounded-xl
                        font-bold
                        "
                    >
                        Add Pizza 🍕
                    </button>

                </div>

            </div>

        </div>
    );
}

export default CustomizePizzaModal;