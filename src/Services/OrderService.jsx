const API_URL = "https://localhost:7286/api/order"; // Change as needed

const handleResponse = async (res) => {
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw errorData || { message : "Something went wrong getting orders."}
    }
    return res.status === 204 ? null : res.json();
};

// Get: all orders 
export const getAllOrders = async () => {
    try {
        const res = await fetch(`${API_URL}`, {
            method: "GET",
            credentials: "include",
        });

        if(!res.ok){
            throw new Error(res.Error)
        }

        return handleResponse(res);

    } catch (err){
        throw new Error(err.message);
    }
};
