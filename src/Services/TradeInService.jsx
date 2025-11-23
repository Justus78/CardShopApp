const API_URL = "https://localhost:7286/api/tradeins"; // Change as needed

// Helper to handle fetch errors
const handleResponse = async (res) => {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw errorData || { message: "Something went wrong" };
  }
  return res.status === 204 ? null : res.json();
};


// Get: get all trade ins for user
export const getAllTradeInsForUser = async () => {
    const url = new URL(API_URL);

    const res = await fetch(url.toString(), {
        method: "GET",
        credentials: "include",
    });

    return handleResponse(res);
}

// Post: post a new trade in for user
export const createTradeIn = async (formData) => {
    const res = await fetch(API_URL, {
        method: "POST", 
        body: formData,
        credentials: "include",
    }) ;
    return handleResponse(res);
};

// Get: get all trade ins for admin

// Post: update trade in status (admin)
export const updateTradeIn = async (status) => {
    const res = await fetch(`${API_URL}/${status}`, {
        method: "PUT",
        credentials: "include",        
    });
    return handleResponse(res);
}
