import { useState } from "react";

function PizzaCard({ pizza, addToCart }) {

    const [selectedBase, setSelectedBase] = useState(
        pizza.baseOptions?.[0] || ""
    );

    const [selectedSauce, setSelectedSauce] = useState(
        pizza.sauces?.[0] || ""
    );

    const [selectedCheese, setSelectedCheese] = useState(
        pizza.cheeses?.[0] || ""
    );

    const [selectedVeggies, setSelectedVeggies] =
        useState([]);

    // handle veggie selection
    const handleVeggies = (veggie) => {

        if (selectedVeggies.includes(veggie)) {

            setSelectedVeggies(
                selectedVeggies.filter(
                    (item) => item !== veggie
                )
            );

        } else {

            setSelectedVeggies([
                ...selectedVeggies,
                veggie,
            ]);
        }
    };

    // customized pizza object
    const customizedPizza = {
        ...pizza,
        selectedBase,
        selectedSauce,
        selectedCheese,
        selectedVeggies,
    };

    return (
        <div
            style={{
                border: "1px solid gray",
                padding: "15px",
                width: "300px",
                borderRadius: "10px",
            }}
        >

            <img
                src={pizza.image}
                alt={pizza.name}
                style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "10px",
                }}
            />

            <h2>{pizza.name}</h2>

            <p>Price: ₹{pizza.price}</p>

            {/* Base */}
            <label>Base:</label>

            <select
                value={selectedBase}
                onChange={(e) =>
                    setSelectedBase(e.target.value)
                }
            >
                {pizza.baseOptions?.map((base) => (
                    <option
                        key={base}
                        value={base}
                    >
                        {base}
                    </option>
                ))}
            </select>

            <br /><br />

            {/* Sauce */}
            <label>Sauce:</label>

            <select
                value={selectedSauce}
                onChange={(e) =>
                    setSelectedSauce(e.target.value)
                }
            >
                {pizza.sauces?.map((sauce) => (
                    <option
                        key={sauce}
                        value={sauce}
                    >
                        {sauce}
                    </option>
                ))}
            </select>

            <br /><br />

            {/* Cheese */}
            <label>Cheese:</label>

            <select
                value={selectedCheese}
                onChange={(e) =>
                    setSelectedCheese(e.target.value)
                }
            >
                {pizza.cheeses?.map((cheese) => (
                    <option
                        key={cheese}
                        value={cheese}
                    >
                        {cheese}
                    </option>
                ))}
            </select>

            <br /><br />

            {/* Veggies */}
            <label>Veggies:</label>

            <div>

                {pizza.veggies?.map((veggie) => (

                    <div key={veggie}>

                        <input
                            type="checkbox"
                            value={veggie}
                            onChange={() =>
                                handleVeggies(veggie)
                            }
                        />

                        {veggie}

                    </div>
                ))}

            </div>

            <br />

            <button
                onClick={() =>
                    addToCart(customizedPizza)
                }
                style={{
                    padding: "10px",
                    width: "100%",
                    cursor: "pointer",
                }}
            >
                Add To Cart
            </button>

        </div>
    );
}

export default PizzaCard;