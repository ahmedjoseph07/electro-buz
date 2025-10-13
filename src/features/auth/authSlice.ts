import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebaseConfig";

export interface AuthState {
  user: {
    uid: string;
    email: string | null;
    displayName?: string | null;
    photoURL?: string | null;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

// Thunks
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password, displayName }: { email: string; password: string; displayName?: string }, thunkAPI) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      //Update Profile logic here TODO
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || displayName || null,
        photoURL: user.photoURL || null,
      };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Registration failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || null,
        photoURL: user.photoURL || null,
      };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Login failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const googleLogin = createAsyncThunk("auth/googleLogin", async (_, thunkAPI) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || null,
      photoURL: user.photoURL || null,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Google login failed";
    return thunkAPI.rejectWithValue(message);
  }
});

export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, thunkAPI) => {
  try {
    await signOut(auth);
    return null;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Logout failed";
    return thunkAPI.rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthState["user"]>) {
      state.user = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // register
    builder.addCase(registerUser.pending, (s) => { s.loading = true; s.error = null; });
    builder.addCase(registerUser.fulfilled, (s, a) => { s.loading = false; s.user = a.payload; });
    builder.addCase(registerUser.rejected, (s, a) => { s.loading = false; s.error = a.payload as string; });

    // login
    builder.addCase(loginUser.pending, (s) => { s.loading = true; s.error = null; });
    builder.addCase(loginUser.fulfilled, (s, a) => { s.loading = false; s.user = a.payload; });
    builder.addCase(loginUser.rejected, (s, a) => { s.loading = false; s.error = a.payload as string; });

    // google
    builder.addCase(googleLogin.pending, (s) => { s.loading = true; s.error = null; });
    builder.addCase(googleLogin.fulfilled, (s, a) => { s.loading = false; s.user = a.payload; });
    builder.addCase(googleLogin.rejected, (s, a) => { s.loading = false; s.error = a.payload as string; });

    // logout
    builder.addCase(logoutUser.fulfilled, (s) => { s.user = null; s.loading = false; s.error = null; });
  },
});

export const { setUser, clearError } = authSlice.actions;
export default authSlice.reducer;