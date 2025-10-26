const API_URL = "https://localhost:7286/api/admin"; // Change as needed

const handleResponse = async (res) => {
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw errorData || { message : "Something went wrong getting orders."}
    }
    return res.status === 204 ? null : res.json();
};

export const getAllOrdersForAdmin = async () => {
    try {
        const res = await fetch(`${API_URL + "/get-orders"}`, {
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

export const getOrderById = async (id) => {
    try {
        const res = await fetch(`${API_URL + "/orders/"}`)
    } catch (err){
        throw new Error(err.message);
    }
};

export const getAllUsersForAdmin = async () => {
    try {
        const res = await fetch(`${API_URL + "/get-users"}`, {
            method: "GET",
            credentials: "include",
        });

        if(!res.ok) {
            throw new Error(res.Error);
        }

        return handleResponse(res);

    }catch (err){
        throw new Error(err.message);
    }
}