import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProfileDetail() {
  const navigate = useNavigate();
  const playlists = useSelector((state) => state.playlists.playlists);

  return (
    <div className="bg-black text-white p-6 min-h-screen">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mr-4">
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-gray-400">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Deepikajangid</h2>
          <p className="text-gray-400">
            {playlists.length} Public Playlist
            {playlists.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Public Playlists</h3>
        {playlists.length > 0 ? (
          playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-gray-800 p-4 rounded-lg mb-2 cursor-pointer hover:bg-gray-700 transition-colors"
              onClick={() => navigate(`/playlist/${playlist.id}`)} // Navigate to a playlist detail page (optional)
            >
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gray-700 rounded mr-4 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-gray-400">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-md font-medium">{playlist.name}</h4>
                  <p className="text-gray-400 text-sm">By Deepikajangid</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No playlists created yet.</p>
        )}
      </div>
    </div>
  );
}
