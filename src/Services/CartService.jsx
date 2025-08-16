const API_URL = "https://localhost:7286/api/cart"; // Change as needed

const handleResponse = async (res) => {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw errorData || { message: "Something went wrong." };
  }
  return res.status === 204 ? null : res.json();
};

// GET: all items in the user's cart
export const getCartItemsForUser = async () => {
  const res = await fetch(API_URL, {
    method: "GET",
    credentials: "include", // ensures cookies/identity tokens go along
  });
  return handleResponse(res);
};

// POST: add a new cart item
export const createCartItem = async (item) => {
  const res = await fetch(API_URL, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item), // item should match AddCartItemDto
  });
  return handleResponse(res);
};

// PUT: update an existing cart item (e.g. quantity)
export const updateCartItem = async (item) => {
  const res = await fetch(API_URL, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item), // item should match UpdateCartItemDto
  });
  return handleResponse(res);
};

// DELETE: remove a specific cart item by id
export const removeCartItem = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return handleResponse(res); // will be null on 204
};

// DELETE: clear the cart entirely
export const clearCart = async () => {
  const res = await fetch(`${API_URL}/clear`, {
    method: "DELETE",
    credentials: "include",
  });
  return handleResponse(res); // null on 204
};
