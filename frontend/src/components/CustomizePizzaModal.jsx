import { useEffect, useState } from "react";
import axios from "axios";

const sizePrices = {
    Small: 0,
    Medium: 120,
    Large: 250,
};

function CustomizePizzaModal({ pizza, closeModal, addCustomizedPizza }) {
    const [inventory, setInventory] = useState([]);
    const [size, setSize] = useState("Medium");
    const [base, setBase] = useState("");
    const [sauce, setSauce] = useState("");
    const [cheese, setCheese] = useState("");
    const [veggies, setVeggies] = useState([]);

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const { data } = await axios.get("http://localhost:5000/api/inventory");
                setInventory(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchInventory();
    }, []);

    const byCategory = (category) =>
        inventory.filter((item) => item.category === category && item.stock > 0);

    const bases = byCategory("Base");
    const sauces = byCategory("Sauce");
    const cheeses = byCategory("Cheese");
    const veggiesList = byCategory("Veggie");

    const getPrice = (ingredient) =>
        inventory.find((item) => item.ingredient === ingredient)?.price || 0;

    const veggiePrice = veggies.reduce((total, veggie) => total + getPrice(veggie), 0);

    const totalPrice =
        Number(pizza.price) +
        sizePrices[size] +
        getPrice(base) +
        getPrice(sauce) +
        getPrice(cheese) +
        veggiePrice;

    const toggleVeggie = (ingredient) => {
        setVeggies((current) =>
            current.includes(ingredient)
                ? current.filter((item) => item !== ingredient)
                : [...current, ingredient]
        );
    };

    const handleAddPizza = () => {
        if (!base || !sauce || !cheese) {
            alert("Please choose a base, sauce, and cheese.");
            return;
        }

        addCustomizedPizza({
            ...pizza,
            cartKey: `${pizza._id}-${size}-${base}-${sauce}-${cheese}-${veggies.join("|")}`,
            quantity: 1,
            size,
            base,
            sauce,
            cheese,
            veggies,
            price: totalPrice,
        });

        closeModal();
    };

    return (
        <div className="modal-backdrop">
            <div className="customize-modal">
                <h1>Customize Pizza</h1>

                <label>
                    Size
                    <select value={size} onChange={(e) => setSize(e.target.value)}>
                        {Object.keys(sizePrices).map((option) => (
                            <option key={option} value={option}>
                                {option} (+₹{sizePrices[option]})
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Base
                    <select value={base} onChange={(e) => setBase(e.target.value)}>
                        <option value="">Select Base</option>
                        {bases.map((item) => (
                            <option key={item._id} value={item.ingredient}>
                                {item.ingredient} (+₹{item.price || 0})
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Sauce
                    <select value={sauce} onChange={(e) => setSauce(e.target.value)}>
                        <option value="">Select Sauce</option>
                        {sauces.map((item) => (
                            <option key={item._id} value={item.ingredient}>
                                {item.ingredient} (+₹{item.price || 0})
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Cheese
                    <select value={cheese} onChange={(e) => setCheese(e.target.value)}>
                        <option value="">Select Cheese</option>
                        {cheeses.map((item) => (
                            <option key={item._id} value={item.ingredient}>
                                {item.ingredient} (+₹{item.price || 0})
                            </option>
                        ))}
                    </select>
                </label>

                <div className="modal-section-title">Veggies</div>
                <div className="veggie-grid">
                    {veggiesList.map((item) => (
                        <label key={item._id} className="veggie-option">
                            <input
                                type="checkbox"
                                checked={veggies.includes(item.ingredient)}
                                onChange={() => toggleVeggie(item.ingredient)}
                            />
                            {item.ingredient} (+₹{item.price || 0})
                        </label>
                    ))}
                </div>

                <div className="modal-total">Total: ₹{totalPrice}</div>

                <div className="modal-actions">
                    <button type="button" className="btn custom-btn" onClick={closeModal}>
                        Cancel
                    </button>
                    <button type="button" className="btn cart-btn" onClick={handleAddPizza}>
                        Add Pizza
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CustomizePizzaModal;
