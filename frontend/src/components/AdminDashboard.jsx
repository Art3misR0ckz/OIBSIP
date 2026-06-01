import { useState } from "react";

import OrdersAdmin from "./OrdersAdmin";

import InventoryAdmin from "./InventoryAdmin";

import PizzaAdmin from "./PizzaAdmin";

import AddPizza from "./AddPizza";

function AdminDashboard() {

    const [activeTab, setActiveTab] =
        useState("orders");

    const buttonStyle = (tab) => ({

        padding: "14px 24px",

        border: "none",

        borderRadius: "14px",

        background:
            activeTab === tab
                ? "linear-gradient(90deg,#ff0080,#7928ca)"
                : "#1f2937",

        color: "white",

        fontWeight: "bold",

        fontSize: "16px",

        cursor: "pointer",

        transition: "0.3s",

        boxShadow:
            activeTab === tab
                ? "0 0 20px rgba(255,0,150,0.4)"
                : "none",
    });

    return (

        <div
            style={{

                marginTop: "60px",

                padding: "20px",
            }}
        >

            {/* TITLE */}

            <h1
                style={{

                    fontSize: "3rem",

                    marginBottom: "40px",

                    textAlign: "center",
                }}
            >

                Admin Dashboard ⚙️

            </h1>


            {/* TAB BUTTONS */}

            <div
                style={{

                    display: "flex",

                    gap: "20px",

                    flexWrap: "wrap",

                    justifyContent: "center",

                    marginBottom: "50px",
                }}
            >

                <button

                    style={buttonStyle(
                        "orders"
                    )}

                    onClick={() =>
                        setActiveTab(
                            "orders"
                        )
                    }
                >

                    Manage Orders 📦

                </button>


                <button

                    style={buttonStyle(
                        "inventory"
                    )}

                    onClick={() =>
                        setActiveTab(
                            "inventory"
                        )
                    }
                >

                    Inventory 🧀

                </button>


                <button

                    style={buttonStyle(
                        "pizzas"
                    )}

                    onClick={() =>
                        setActiveTab(
                            "pizzas"
                        )
                    }
                >

                    Manage Pizzas 🍕

                </button>


                <button

                    style={buttonStyle(
                        "addpizza"
                    )}

                    onClick={() =>
                        setActiveTab(
                            "addpizza"
                        )
                    }
                >

                    Add New Pizza ➕

                </button>

            </div>


            {/* CONTENT AREA */}

            <div
                style={{

                    background:
                        "rgba(255,255,255,0.04)",

                    padding: "30px",

                    borderRadius: "24px",

                    boxShadow:
                        "0 0 30px rgba(255,0,150,0.08)",
                }}
            >

                {activeTab ===
                    "orders" && (

                    <OrdersAdmin />
                )}

                {activeTab ===
                    "inventory" && (

                    <InventoryAdmin />
                )}

                {activeTab ===
                    "pizzas" && (

                    <PizzaAdmin />
                )}

                {activeTab ===
                    "addpizza" && (

                    <AddPizza />
                )}

            </div>

        </div>
    );
}

export default AdminDashboard;
