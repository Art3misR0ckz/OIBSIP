import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {

    const [pizzaData, setPizzaData] = useState({
        name: "",
        image: "",
        price: "",
        category: "",
        baseOptions: "",
        sauces: "",
        cheeses: "",
        veggies: "",
    });

    const [pizzas, setPizzas] = useState([]);

    // fetch pizzas
    const fetchPizzas = async () => {

        try {

            const response = await axios.get(
                "http://localhost:5000/api/pizzas"
            );

            setPizzas(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {
        fetchPizzas();
    }, []);

    // handle input
    const handleChange = (e) => {

        setPizzaData({
            ...pizzaData,
            [e.target.name]: e.target.value,
        });
    };

    // add pizza
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const formattedData = {
                ...pizzaData,
                price: Number(pizzaData.price),

                baseOptions:
                    pizzaData.baseOptions.split(","),

                sauces:
                    pizzaData.sauces.split(","),

                cheeses:
                    pizzaData.cheeses.split(","),

                veggies:
                    pizzaData.veggies.split(","),
            };

            await axios.post(
                "http://localhost:5000/api/pizzas",
                formattedData
            );

            alert("Pizza Added 🍕");

            fetchPizzas();

            setPizzaData({
                name: "",
                image: "",
                price: "",
                category: "",
                baseOptions: "",
                sauces: "",
                cheeses: "",
                veggies: "",
            });

        } catch (error) {

            console.log(error);

            alert("Error adding pizza");
        }
    };

    // delete pizza
    const deletePizza = async (id) => {

        try {

            await axios.delete(
                `http://localhost:5000/api/pizzas/${id}`
            );

            alert("Pizza Deleted ❌");

            fetchPizzas();

        } catch (error) {

            console.log(error);

            alert("Delete failed");
        }
    };

    return (
        <div
            style={{
                marginTop: "50px",
                padding: "20px",
                border: "1px solid gray",
                borderRadius: "10px",
            }}
        >

            <h2>
                Admin Dashboard 👨‍💼
            </h2>

            {/* FORM */}
            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    marginTop: "20px",
                }}
            >

                <input
                    type="text"
                    name="name"
                    placeholder="Pizza Name"
                    value={pizzaData.name}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={pizzaData.image}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={pizzaData.price}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={pizzaData.category}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="baseOptions"
                    placeholder="Bases (comma separated)"
                    value={pizzaData.baseOptions}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="sauces"
                    placeholder="Sauces (comma separated)"
                    value={pizzaData.sauces}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="cheeses"
                    placeholder="Cheeses (comma separated)"
                    value={pizzaData.cheeses}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="veggies"
                    placeholder="Veggies (comma separated)"
                    value={pizzaData.veggies}
                    onChange={handleChange}
                />

                <button type="submit">
                    Add Pizza
                </button>

            </form>

            {/* PIZZA LIST */}
            <div
                style={{
                    marginTop: "40px",
                }}
            >

                <h3>All Pizzas</h3>

                {pizzas.map((pizza) => (

                    <div
                        key={pizza._id}
                        style={{
                            border: "1px solid gray",
                            padding: "10px",
                            marginTop: "10px",
                            borderRadius: "10px",
                        }}
                    >

                        <h4>{pizza.name}</h4>

                        <p>
                            ₹{pizza.price}
                        </p>

                        <button
                            onClick={() =>
                                deletePizza(pizza._id)
                            }
                        >
                            Delete
                        </button>

                    </div>
                ))}

            </div>

        </div>
    );
}

export default AdminDashboard;