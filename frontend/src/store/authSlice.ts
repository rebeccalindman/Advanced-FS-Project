import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../api/axiosInstance";

interface RegisterInput {
  username: string;
  password: string;
  email: string;
  role: "user" | "admin" | "owner";
}

interface LoginCredentials {
  identifier: RegisterInput["username"] | RegisterInput["email"];
  password: RegisterInput["password"];
}

interface User {
  id: string;
  username: string;
  email: string;
  hashedpassword: string;
  role: string;
  created_at: Date;
  updated_at?: Date;
}

// Thunks
export const signIn = createAsyncThunk<
  { user: { id: string; username: string; email: string; role: string }; accessToken: string }, 
  LoginCredentials,
  { rejectValue: string }
>(
  "auth/signIn",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/login", credentials);
      return response.data; // expecting { user, accessToken } from backend
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

interface AuthState {
  signedIn: boolean;
  role: "user" | "admin" | null;
  loading: boolean;
  error: string | null;
  user?: {
    id: string;
    username: string;
    email: string;
  };
  accessToken?: string;
  initialized?: boolean;
}

const initialState: AuthState = {
  signedIn: false,
  role: null,
  loading: false,
  error: null,
  initialized: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: (state) => {
      state.signedIn = false;
      state.role = null;
      state.user = undefined;
      state.accessToken = undefined;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action: PayloadAction<{ user: { id: string; username: string; email: string; role: string }; accessToken: string }>) => {
        state.loading = false;
        state.signedIn = true;
        state.role = action.payload.user.role as "user" | "admin";
        state.user = {
          id: action.payload.user.id,
          username: action.payload.user.username,
          email: action.payload.user.email
        };
        state.accessToken = action.payload.accessToken;
        state.initialized = true;
        localStorage.setItem('token', state.accessToken || '');
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Login failed";
        state.initialized = true;
      });
  }
});

export const { signOut } = authSlice.actions;
export default authSlice.reducer;
