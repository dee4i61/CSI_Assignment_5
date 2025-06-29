// store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import playlistReducer from "./slice/playlistSlice";
import songsReducer from "./slice/songsSlice";
import playerReducer from "./slice/playerSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["playlists"],
};

const persistedReducer = persistReducer(persistConfig, playlistReducer);

export const store = configureStore({
  reducer: {
    playlists: persistedReducer,
    songs: songsReducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
