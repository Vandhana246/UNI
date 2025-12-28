import axios from "axios";

const API = "http://localhost:5000";

const authHeader = () => ({
  headers: {
    Authorization: localStorage.getItem("token"),
  },
});

export const getProfile = () =>
  axios.get(`${API}/profile/me`, authHeader());

export const updateProfile = (data) =>
  axios.put(`${API}/profile/me`, data, authHeader());
