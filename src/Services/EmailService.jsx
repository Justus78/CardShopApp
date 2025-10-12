// src/services/emailService.js

const API_BASE_URL = "https://localhost:7286/api/email";

/**
 * Sends an email through the backend email endpoint.
 * @param {Object} emailData - Contains to, subject, and body (and optional cc, bcc).
 * @returns {Promise<Object>} Response data from the API.
 */
export async function sendEmail(emailData) {
  try {
    const response = await fetch(`${API_BASE_URL}/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to send email");
    }

    return await response.json();
  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
}
