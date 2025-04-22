import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  withCredentials: true,
});

export const register = (data) => api.post("/auth/register", data);
export const login = (data) => api.post("/auth/login", data);
export const logout = () => api.post("/auth/logout");
export const getDashboard = () => api.get("/dashboard");
export const getAdmin = () => api.get("/admin");
export const getMe = () => api.get('/auth/me', { withCredentials: true });
