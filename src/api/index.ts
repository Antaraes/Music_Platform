import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",

  headers: {
    "Content-Type": "application/json",
  },
});

export const registerNewUser = (registerData: registerNewUser) =>
  API.post("/user/signup", registerData);
