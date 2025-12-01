// const API_URL = "https://localhost:7286/api/tradeins"; // Change as needed

// // Helper to handle fetch errors
// const handleResponse = async (res) => {
//   if (!res.ok) {
//     const errorData = await res.json().catch(() => ({}));
//     throw errorData || { message: "Something went wrong" };
//   }
//   return res.status === 204 ? null : res.json();
// };


// // Get: get all trade ins for user
// export const getAllTradeInsForUser = async () => {
//     const url = new URL(API_URL);

//     const res = await fetch(url.toString(), {
//         method: "GET",
//         credentials: "include",
//     });

//     return handleResponse(res);
// }

// // Post: post a new trade in for user
// export const createTradeIn = async (formData) => {
//     const res = await fetch(API_URL, {
//         method: "POST", 
//         body: formData,
//         credentials: "include",
//     }) ;
//     return handleResponse(res);
// };

// // Get: get all trade ins for admin

// // Post: update trade in status (admin)
// export const updateTradeIn = async (status) => {
//     const res = await fetch(`${API_URL}/${status}`, {
//         method: "PUT",
//         credentials: "include",        
//     });
//     return handleResponse(res);
// }

// // Get: get or create a new trade in draft
// export const getOrCreateTradeInDraft = async () => {

// }

const API_URL = "https://localhost:7286/api/tradeins";

// Handle fetch + error parsing
const handleResponse = async (res) => {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw errorData || { message: "Something went wrong" };
  }
  return res.status === 204 ? null : res.json();
};

/* -------------------------------------------------------------------------- */
/*                                DRAFT TRADE-IN                               */
/* -------------------------------------------------------------------------- */

// GET: Get or create draft trade-in
export const getOrCreateDraftTradeIn = async () => {
  const res = await fetch(`${API_URL}/draft`, {
    method: "GET",
    credentials: "include",
  });
  return handleResponse(res);
};

// POST: Add item to draft trade-in
export const addItemToDraft = async (formData) => {
  const res = await fetch(`${API_URL}/draft/items`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });
  return handleResponse(res);
};

// DELETE: Remove item from draft
export const removeDraftItem = async (itemId) => {
  const res = await fetch(`${API_URL}/draft/items/${itemId}`, {
    method: "DELETE",
    credentials: "include",
  });
  return handleResponse(res);
};

// POST: Submit draft trade-in
export const submitDraftTradeIn = async () => {
  const res = await fetch(`${API_URL}/draft/submit`, {
    method: "POST",
    credentials: "include",
  });
  return handleResponse(res);
};

/* -------------------------------------------------------------------------- */
/*                           USER SUBMITTED TRADE-INS                          */
/* -------------------------------------------------------------------------- */

// GET: Get all trade-ins for user
export const getUserTradeIns = async () => {
  const res = await fetch(API_URL, {
    method: "GET",
    credentials: "include",
  });
  return handleResponse(res);
};

// GET: Get single trade-in by ID
export const getTradeInById = async (tradeInId) => {
  const res = await fetch(`${API_URL}/${tradeInId}`, {
    method: "GET",
    credentials: "include",
  });
  return handleResponse(res);
};

// DELETE: Cancel trade-in
export const cancelTradeIn = async (tradeInId) => {
  const res = await fetch(`${API_URL}/${tradeInId}`, {
    method: "DELETE",
    credentials: "include",
  });
  return handleResponse(res);
};

// POST: Accept final offer
export const acceptFinalOffer = async (tradeInId) => {
  const res = await fetch(`${API_URL}/${tradeInId}/confirm`, {
    method: "POST",
    credentials: "include",
  });
  return handleResponse(res);
};

// POST: Decline final offer
export const declineFinalOffer = async (tradeInId) => {
  const res = await fetch(`${API_URL}/${tradeInId}/decline`, {
    method: "POST",
    credentials: "include",
  });
  return handleResponse(res);
};

/* -------------------------------------------------------------------------- */
/*                                  ESTIMATE                                  */
/* -------------------------------------------------------------------------- */

// POST: Estimate trade-in value for a list of items
export const estimateTradeInValue = async (items) => {
  const res = await fetch(`${API_URL}/estimate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(items),
    credentials: "include",
  });
  return handleResponse(res);
};
