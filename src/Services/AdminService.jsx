const API_URL = "https://localhost:7286/api/admin";

// Helper for handling responses consistently
const handleResponse = async (res) => {
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Something went wrong.");
    }
    return res.status === 204 ? null : res.json();
};

// ===========================
// ORDERS
// ===========================

// ✅ Get all orders (GET /api/admin/orders)
export const getAllOrdersForAdmin = async () => {
    try {
        const res = await fetch(`${API_URL}/orders`, {
            method: "GET",
            credentials: "include",
        });
        return await handleResponse(res);
    } catch (err) {
        throw new Error(`Failed to fetch orders: ${err.message}`);
    }
};

// ✅ Get specific order by ID (GET /api/admin/orders/{id})
export const getOrderById = async (id) => {
    try {
        const res = await fetch(`${API_URL}/orders/${id}`, {
            method: "GET",
            credentials: "include",
        });
        return await handleResponse(res);
    } catch (err) {
        throw new Error(`Failed to fetch order ${id}: ${err.message}`);
    }
};

// ✅ Update order status (PUT /api/admin/orders/update-status)
export const updateOrderStatus = async (orderId, status) => {
    try {
        const res = await fetch(`${API_URL}/orders/update-status`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ orderId, status }),
        });
        return await handleResponse(res);
    } catch (err) {
        throw new Error(`Failed to update order ${orderId}: ${err.message}`);
    }
};

// ===========================
// USERS
// ===========================

// ✅ Get all users (GET /api/admin/users)
export const getAllUsersForAdmin = async () => {
    try {
        const res = await fetch(`${API_URL}/users`, {
            method: "GET",
            credentials: "include",
        });
        return await handleResponse(res);
    } catch (err) {
        throw new Error(`Failed to fetch users: ${err.message}`);
    }
};

// ✅ Get specific user by ID (GET /api/admin/users/{id})
export const getUserById = async (id) => {
    try {
        const res = await fetch(`${API_URL}/users/${id}`, {
            method: "GET",
            credentials: "include",
        });
        return await handleResponse(res);
    } catch (err) {
        throw new Error(`Failed to fetch user ${id}: ${err.message}`);
    }
};
