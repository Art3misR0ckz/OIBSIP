{orders.map((order) => (

    <div
        key={order._id}

        style={{

            background:
                "rgba(255,255,255,0.05)",

            padding:
                "30px",

            borderRadius:
                "20px",

            marginBottom:
                "30px",
        }}
    >

        <h2>

            Order ID:
            {" "}
            {order._id}

        </h2>

        <p>

            Total:
            {" "}
            ₹{order.totalPrice}

        </p>

        <h3
            style={{
                marginTop:
                    "20px",
            }}
        >

            Ordered Items 🍕

        </h3>

        {order.items.map(
            (item, index) => (

            <div

                key={index}

                style={{

                    marginTop:
                        "20px",

                    padding:
                        "15px",

                    background:
                        "rgba(255,255,255,0.03)",

                    borderRadius:
                        "12px",
                }}
            >

                <h3>

                    {item.name}

                    {" × "}

                    {item.quantity}

                </h3>

                <p>

                    Size:
                    {" "}

                    {item.size || "N/A"}

                </p>

                <p>

                    Base:
                    {" "}

                    {item.base || "N/A"}

                </p>

                <p>

                    Sauce:
                    {" "}

                    {item.sauce || "N/A"}

                </p>

                <p>

                    Cheese:
                    {" "}

                    {item.cheese || "N/A"}

                </p>

                <p>

                    Veggies:
                    {" "}

                    {
                        item.veggies &&
                        item.veggies.length > 0

                            ? item.veggies.join(
                                ", "
                            )

                            : "None"
                    }

                </p>

            </div>
        ))}

        <h3
            style={{
                marginTop:
                    "25px",

                color:
                    "#ff0080",
            }}
        >

            Current Status:
            {" "}

            {order.status}

        </h3>

    </div>
))}