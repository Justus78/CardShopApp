const API_URL = "https://localhost:7286/api/tradeins";
const ADMIN_API_URL = "https://localhost:7286/api/admin/tradeins";
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

// POST: Update the trade in status to submitted
export const submitTradeIn = async (tradeInId) => {
  const res = await fetch(`${API_URL}/draft/submit/${tradeInId}`,{
    method: "POST",
    credentials: "include"
  });
  return handleResponse(res);
}

// DELETE: Cancel trade-in
export const returnTradeIn = async (tradeInId) => {
  const res = await fetch(`${API_URL}/${tradeInId}`, {
    method: "DELETE",
    credentials: "include",
  });

  return handleResponse(res);
};

// DELETE: Cancel the trade in
export const cancelTradeIn = async (tradeInId) => {
  const res = await fetch(`${API_URL}/draft/deleteDraft/${tradeInId}`, {
    method: "DELETE",
    credentials: "include"
  });
  return handleResponse(res);
}

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

/* ---------------------------------------------------------------------------- */
/*                                Admin                                         */
/* ---------------------------------------------------------------------------- */

// get all trade ins for admin
export const getAllTradeInsAdmin = async () => {
  const res = await fetch(`${ADMIN_API_URL}`, {
    method: "GET",
    credentials: "include"    
  });
  return handleResponse(res);
};

export const getTradeInByIdAdmin = async (id) => {
  const res = await fetch(`${ADMIN_API_URL}/${id}` ,{
    method: "GET",
    credentials: "include"
  });
  return handleResponse(res);
}

export const updateTradeInItemFinalValue = async (id, value) => {
  const res = await fetch(`${ADMIN_API_URL}/items/${id}/finalValue`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ finalUnitValue: parseFloat(value) }),
  });

  return handleResponse(res);
};


export const submitFinalOfferFromAdmin = async (id) => {
  const res = await fetch(`${ADMIN_API_URL}/${id}/submit-final-offer`, {
    method: "POST",
    credentials: "include"
  });
  return handleResponse(res);
}

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
