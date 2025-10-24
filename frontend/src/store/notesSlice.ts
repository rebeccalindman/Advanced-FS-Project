import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../api/axiosInstance"; //** */ */ use your axios instance

interface Note {
  id: string;  // UUID
  title: string;
  text: string;
  category: string;
  created_at: Date;
  updated_at: Date;
}


interface NotesState {
  notes: Note[];
  selectedNote: Note | null;
  loading: boolean;
  error: string | null;
}

// Thunks
export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/notes"); // token automatically included
      return response.data.notes || response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const addNote = createAsyncThunk(
  "notes/addNote",
  async (noteData: { title: string; text: string; category: string }, { rejectWithValue }) => {
    try {
      const response = await api.post("/notes", noteData);
      console.log("Add note response:", response.data);
      return response.data.note;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const editNote = createAsyncThunk(
  "notes/editNote",
  async (note: Note, { rejectWithValue }) => {
    try {
      const response = await api.put(`/notes/${note.id}`, note);
      return response.data.note;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/notes/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const initialState: NotesState = {
  notes: [],
  selectedNote: null,
  loading: false,
  error: null,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    selectNote: (state, action: PayloadAction<string>) => {
      state.selectedNote = state.notes.find((note) => note.id === action.payload) || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action: PayloadAction<Note[]>) => {
        state.loading = false;
        state.notes = Array.isArray(action.payload) ? action.payload : [];
      })
/*       .addCase(fetchNotes.rejected, (state, action: PayloadAction<{ message: string }>) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.payload?.message || "Something went wrong while fetching notes";
      }) */
      .addCase(addNote.fulfilled, (state, action: PayloadAction<Note>) => {
        state.loading = false;
        if (action.payload) {
          state.notes.push(action.payload);
        }
      })
      .addCase(editNote.fulfilled, (state, action: PayloadAction<Note>) => {
        const i = state.notes.findIndex((n) => n.id === action.payload.id);
        if (i !== -1) state.notes[i] = action.payload;
      })
      .addCase(deleteNote.fulfilled, (state, action: PayloadAction<string>) => {
        state.notes = state.notes.filter((n) => n.id !== action.payload);
      });
  },
});

export const { selectNote } = notesSlice.actions;
export default notesSlice.reducer;

