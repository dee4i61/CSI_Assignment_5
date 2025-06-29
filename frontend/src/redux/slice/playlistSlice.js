import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playlists: [],
  isCreating: false,
};

const playlistSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {
    startCreatingPlaylist: (state) => {
      state.isCreating = true;
    },
    addPlaylist: (state, action) => {
      state.playlists.push({
        ...action.payload,
        songs: [],
      });
      state.isCreating = false;
    },
    removePlaylist: (state, action) => {
      state.playlists = state.playlists.filter(
        (playlist) => playlist.id !== action.payload
      );
    },
    updatePlaylist: (state, action) => {
      const index = state.playlists.findIndex(
        (playlist) => playlist.id === action.payload.id
      );
      if (index !== -1) {
        state.playlists[index] = {
          ...state.playlists[index],
          ...action.payload,
          songs: state.playlists[index].songs,
        };
      }
    },

    addSongToPlaylist: (state, action) => {
      const { playlistId, song } = action.payload;
      const playlist = state.playlists.find(
        (playlist) => playlist.id === playlistId
      );

      if (playlist) {
        // Initialize songs array if it's missing (just in case)
        if (!playlist.songs) {
          playlist.songs = [];
        }
        playlist.songs.push(song);
      } else {
        console.error(`Playlist with id ${playlistId} not found`);
      }
    },

    removeSongFromPlaylist: (state, action) => {
      const { playlistId, songId } = action.payload;
      const playlist = state.playlists.find(
        (playlist) => playlist.id === playlistId
      );
      if (playlist) {
        playlist.songs = playlist.songs.filter((song) => song.id !== songId);
      }
    },
  },
});

export const {
  startCreatingPlaylist,
  addPlaylist,
  removePlaylist,
  updatePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
} = playlistSlice.actions;

export default playlistSlice.reducer;
