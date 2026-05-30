import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

console.log("API base URL:", import.meta.env.VITE_BACKEND_URL);

// console.log(
//   "API base URL: process.env.BACKEND_URL",
//   process.env.VITE_BACKEND_URL,
// );
// API Endpoints
export const login = (data) => api.post("/api/user/login", data);
export const logout = () => api.post("/api/user/logout");
export const register = (data) => api.post("/api/user/register", data);
export const getUserData = (data) => api.get("/api/user");

//tables endpoints
export const addTable = (data) => api.post("/api/table", data);
export const getTables = () => api.get("/api/table");
export const updateTable = (id, data) => api.put(`/api/table/${id}`, data);

// orders endpoints
export const addOrder = (data) => api.post("/api/order", data);
export const getOrders = () => api.get("/api/order");
export const updateOrderStatus = (id, data) =>
  api.put(`/api/order/${id}`, data);

// payment endpoints
export const createOrderRazorpay = (data) =>
  api.post("/api/payment/create-order", data);
export const verifyPaymentRazorpay = (data) =>
  api.post("/api/payment/verify-payment", data);
