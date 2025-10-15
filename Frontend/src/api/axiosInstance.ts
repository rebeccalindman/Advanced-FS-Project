// src/api/axiosInstance.ts
import axios from "axios";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA4ZDQwOWU5LWZmZWYtNDFlNi1iNmM5LWM3YmEzMmRhZmE4MSIsInVzZXJuYW1lIjoiQWRtaW4iLCJlbWFpbCI6ImFkbWluQGNoYXNhY2FkZW15LnNlIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzYwNTQyNDc0LCJleHAiOjE3NjE0MDY0NzR9.2QA83i1NI_V-8RhbVeAforTAJdLo4N8xMg8Ib30i0bk"; //! VALID UNTIL October 15

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});


// TODO To be replaced by an interceptor that dynamically attaches the token for every request. 
// TODO There is also a refresh token. 