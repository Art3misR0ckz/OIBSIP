

const express = require("express");
const dotenv = require("dotenv");

dotenv.config();


const cors = require("cors");
const pizzaRoutes = require("./routes/pizzaRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require(
    "./routes/paymentRoutes"
);

const connectDB = require("./config/db");

// routes
const authRoutes = require("./routes/authRoutes");



// connect database
connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use("/api/orders", orderRoutes);


// routes
app.use("/api/auth", authRoutes);
app.use("/api/pizzas", pizzaRoutes);
app.use(
    "/api/payment",
    paymentRoutes
);

// test route
app.get("/", (req, res) => {
    res.send("API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});