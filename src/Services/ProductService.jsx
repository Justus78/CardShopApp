const API_URL = "https://localhost:7286/api/product"; // Change as needed

// Helper to handle fetch errors
const handleResponse = async (res) => {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw errorData || { message: "Something went wrong" };
  }
  return res.status === 204 ? null : res.json();
};

// GET: All products (optional query parameters)
export const getAllProducts = async (query = {}) => {
  const url = new URL(API_URL);
  Object.keys(query).forEach((key) => {
    if (query[key] !== undefined && query[key] !== "") {
      url.searchParams.append(key, query[key]);
    }
  });

  const res = await fetch(url.toString(), {
    method: "GET",
    credentials: "include",
  });
  return handleResponse(res);
};

// GET: Single product by ID
export const getProductById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "GET",
    credentials: "include",
  });
  return handleResponse(res);
};

// POST: Create product (Admin only)
export const createProduct = async (formData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    body: formData,
    credentials: "include",
  });
  return handleResponse(res);
};

// PUT: Update product (Admin only)
export const updateProduct = async (id, formData) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    body: formData,
    credentials: "include",
  });
  return handleResponse(res);
};

// DELETE: Delete product (Admin only)
export const deleteProduct = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return handleResponse(res);
};
