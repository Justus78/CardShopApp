const API_URL = "https://localhost:7286/api/sets"; // Change as needed

// Helper to handle fetch errors
const handleResponse = async (res) => {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw errorData || { message: "Something went wrong" };
  }
  return res.status === 204 ? null : res.json();
};

// GET: all sets
export const getSets = async () => {
  const res = await fetch(`${API_URL}`, {
    method: "GET",
    credentials: "include",
  });
  return handleResponse(res);
};