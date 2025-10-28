// src/api/axiosInstance.ts
import axios from "axios";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";


// Get the token from local storage or from the state
// If the token is found in local storage, use it
// Otherwise, use the token from the state
const localStorageToken = localStorage.getItem('token');
const token = localStorageToken ? localStorageToken : useSelector((state: RootState) => state.auth.accessToken);


export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});


// TODO To be replaced by an interceptor that dynamically attaches the token for every request. 
// TODO There is also a refresh token. 