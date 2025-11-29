// src/api/auth.js

const API_BASE = "http://127.0.0.1:8000/api";   // <-- Backend correcto

export async function login(codigo_unac, password) {
  const response = await fetch(`${API_BASE}/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ codigo_unac, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Error en login");
  }

  return await response.json();
}
