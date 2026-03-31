/**
 * Public API client untuk halaman customer (/order, /order/checkout, dll).
 * Tidak butuh token di browser — semua request diproxy oleh Next.js server
 * yang auto-login menggunakan kredensial dari .env (STORE_PHONE / STORE_PASSWORD).
 */
import axios from "axios";

const pubClient = axios.create({
  baseURL: "/api/pub",
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

export default pubClient;
