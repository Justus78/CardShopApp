// export const apiUrl = "https://localhost:7286/api/account";

// // Utility function to make a POST request to the API
// export async function postToApi(endpoint, data) {
//   try {
//     const response = await fetch(`${apiUrl}/${endpoint}`, {
//       method: "POST",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     const result = await response.json();

//     if (!response.ok) {
//       let errorMessage = "Something went wrong";

//       // If the response is an array of errors, extract descriptions
//       if (Array.isArray(result)) {
//         errorMessage = result.map(err => err.description).join(" "); // Combine all error messages
//       } else if (result.message) {
//         errorMessage = result.message;
//       } else if (result.errors) {
//         errorMessage = Object.values(result.errors).flat().join(" ");
//       }

//       return { error: errorMessage };
//     }

//     return { data: result }; // Success response
//   } catch (error) {
//     console.error("API Error:", error);
//     return { error: "Network error. Please try again." };
//   } 
  
// } // end post to api

// export async function getFromApi(endpoint) {
//   try {
//     const response = await fetch(`${apiUrl}/${endpoint}`, {
//       method: "GET",
//       credentials: "include", // Sends the cookie
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     const result = await response.json();

//     if (!response.ok) {
//       return { error: result.message || "Something went wrong" };
//     }

//     return { data: result };
//   } catch (error) {
//     console.error("API Error:", error);
//     return { error: "Network error. Please try again." };
//   }
// }

// export async function logoutUser() {
//   try {
//     await fetch("https://localhost:7286/api/account/logout", {
//       method: "POST",
//       credentials: "include", // Important to send the cookie
//     });
//   } catch (err) {
//     console.error("Logout failed", err);
//   }
// }

export const apiUrl = "https://localhost:7286/api/account";

// Reusable POST helper
export async function postToApi(endpoint, data) {
  try {
    const response = await fetch(`${apiUrl}/${endpoint}`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      let errorMessage = "Something went wrong";

      if (Array.isArray(result)) {
        errorMessage = result.map(err => err.description).join(" ");
      } else if (result.message) {
        errorMessage = result.message;
      } else if (result.errors) {
        errorMessage = Object.values(result.errors).flat().join(" ");
      }

      return { error: errorMessage };
    }

    return { data: result };
  } catch (error) {
    console.error("API Error:", error);
    return { error: "Network error. Please try again." };
  }
}

// Reusable GET helper
export async function getFromApi(endpoint) {
  try {
    const response = await fetch(`${apiUrl}/${endpoint}`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();

    if (!response.ok) {
      return { error: result.message || "Something went wrong" };
    }

    return { data: result };
  } catch (error) {
    console.error("API Error:", error);
    return { error: "Network error. Please try again." };
  }
}

// --- AUTH METHODS ---

// Register new user
export async function registerUser(data) {
  return await postToApi("register", data);
}

// Login existing user
export async function loginUser(data) {
  return await postToApi("login", data);
}

// Logout user
export async function logoutUser() {
  try {
    await fetch(`${apiUrl}/logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch (err) {
    console.error("Logout failed", err);
  }
}

// --- EMAIL VERIFICATION ---

// Verify email with token (called from email link)
export async function verifyEmail(userId, token) {
  return await postToApi("verify-email", { userId, token });
}

// Request a new verification email
export async function resendVerificationEmail(email) {
  return await postToApi("resend-verification-email", { email });
}

// --- PASSWORD RESET FLOW ---

// Step 1: User submits "Forgot Password"
export async function forgotPassword(email) {
  return await postToApi("forgot-password", { email });
}

// Step 2: User submits "Reset Password" form with new password + token
export async function resetPassword(data) {
  // data should include: { email, token, newPassword, confirmPassword }
  return await postToApi("reset-password", data);
}
