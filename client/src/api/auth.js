import axios from "axios";

const API = "http://localhost:5000";

export const loginUser = async (data) => {
  const res = await axios.post(`${API}/auth/login`, data);
  return res.data;
};
