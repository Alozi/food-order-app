export async function fetchMeals() {
    try {
        const response = await fetch("http://localhost:3000/meals");
        const resData = await response.json();
        return resData;
    } catch (error) {
        console.error(error);
    }
}

export async function postOrders(orderData) {
    try {
        const response = await fetch("http://localhost:3000/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ order: orderData }),
        });
        const resData = await response.json();
        return resData;
    } catch (error) {
        console.error(error);
    }
}