// middleware/auth.js
export function apiKeyAuth(req, res, next) {
  const apiKey = req.headers["x-api-key"]; // Lee la API Key del encabezado

  // Aquí defines tu API Key. Puedes almacenarla en una variable de entorno para mayor seguridad.
  const validApiKey = process.env.API_KEY || "Moshota";

  if (apiKey && apiKey === validApiKey) {
    next(); // Si la API Key es válida, continúa con la solicitud
  } else {
    res.status(403).json({ message: "Forbidden: Invalid API Key" });
  }
}
