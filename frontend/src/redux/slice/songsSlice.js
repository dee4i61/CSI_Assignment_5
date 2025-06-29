import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSongs = createAsyncThunk(
  "songs/fetchSongs",
  async (query = "", thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/search?query=${query}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch songs"
      );
    }
  }
);

const songsSlice = createSlice({
  name: "songs",
  initialState: {
    songs: [],
    currentSong: null,
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.loading = false;
        state.songs = action.payload;
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentSong } = songsSlice.actions;
export default songsSlice.reducer;
