import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Search,
  MoreHorizontal,
  Users,
  List,
  Shuffle,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Repeat,
  Volume2,
  Maximize2,
} from "lucide-react";
import { fetchSongs, setCurrentSong } from "../redux/slice/songsSlice";

export default function PlaylistDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const playlists = useSelector((state) => state.playlists.playlists);
  const {
    songs: searchResults,
    loading,
    error,
    currentSong,
  } = useSelector((state) => state.songs);
  const playlist = playlists.find((playlist) => playlist?.id.toString() === id);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const audioRef = useRef(new Audio());
  const playPromiseRef = useRef(null);

  // Debug log for Redux state
  useEffect(() => {
    console.log("Redux state:", { currentSong, searchResults, loading, error });
  }, [currentSong, searchResults, loading, error]);

  // Toast notification function
  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  // Initialize first song when playlist loads
  useEffect(() => {
    if (
      playlist &&
      playlist.songs &&
      playlist.songs.length > 0 &&
      !currentSong
    ) {
      const firstSong = playlist.songs[0];
      console.log("Initializing first song:", firstSong);
      if (firstSong?.audioUrl) {
        dispatch(setCurrentSong(firstSong));
        setCurrentSongIndex(0);
        audioRef.current.src = firstSong.audioUrl;
      } else {
        console.warn("First song has no audioUrl:", firstSong);
        showToastMessage("First song has no audio source");
      }
    }
  }, [playlist, currentSong, dispatch]);

  // Fetch songs when search query changes
  useEffect(() => {
    if (searchQuery.trim()) {
      console.log("Fetching songs for query:", searchQuery);
      dispatch(fetchSongs(searchQuery));
    }
  }, [searchQuery, dispatch]);

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      console.log("Audio metadata loaded, duration:", audio.duration);
      setDuration(audio.duration || 0);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      console.log("Audio ended, repeating:", isRepeating);
      if (isRepeating) {
        playSong(currentSong, currentSongIndex);
      } else {
        handleNext();
      }
    };

    const handleError = (e) => {
      console.error("Audio playback error:", e.target.error);
      showToastMessage(`Failed to play audio: ${e.target.error.message}`);
      handleNext();
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    // Set volume
    audio.volume = volume;

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [isRepeating, volume]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      console.log("Cleaning up audio on unmount");
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.src = "";
      }
      if (playPromiseRef.current) {
        playPromiseRef.current = null;
      }
    };
  }, []);

  // Play specific song
  const playSong = (song, index) => {
    if (!song || !song.audioUrl) {
      console.warn("No audio source for song:", song);
      showToastMessage("No audio source available");
      return;
    }

    console.log(
      "Playing song:",
      song.title,
      "Index:",
      index,
      "audioUrl:",
      song.audioUrl
    );

    // Cancel any ongoing play promise
    if (playPromiseRef.current) {
      audioRef.current.pause();
      playPromiseRef.current = null;
    }

    // Reset audio state
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);

    dispatch(setCurrentSong(song));
    setCurrentSongIndex(index);

    // Set audio source
    audioRef.current.src = song.audioUrl;
    audioRef.current.load();

    // Wait for audio to be ready
    const onCanPlay = () => {
      console.log("Audio can play:", song.title);
      playPromiseRef.current = audioRef.current.play();
      if (playPromiseRef.current) {
        playPromiseRef.current
          .then(() => {
            console.log("Playback started:", song.title);
            setIsPlaying(true);
            playPromiseRef.current = null;
          })
          .catch((error) => {
            console.error("Error playing audio:", error);
            setIsPlaying(false);
            showToastMessage(
              `Cannot play "${song.title || "song"}": ${error.message}`
            );
            playPromiseRef.current = null;
          });
      }
      audioRef.current.removeEventListener("canplay", onCanPlay);
    };

    audioRef.current.addEventListener("canplay", onCanPlay);
  };

  // Play/Pause functionality
  const togglePlayPause = () => {
    if (!audioRef.current || !currentSong || !currentSong.audioUrl) {
      console.warn("No song selected for play/pause:", currentSong);
      showToastMessage("No song or audio source selected");
      return;
    }

    if (isPlaying) {
      console.log("Pausing audio:", currentSong.title);
      audioRef.current.pause();
      setIsPlaying(false);
      playPromiseRef.current = null;
    } else {
      console.log("Attempting to play audio:", currentSong.title);
      playPromiseRef.current = audioRef.current.play();
      if (playPromiseRef.current) {
        playPromiseRef.current
          .then(() => {
            console.log("Playback resumed:", currentSong.title);
            setIsPlaying(true);
            playPromiseRef.current = null;
          })
          .catch((error) => {
            console.error("Error playing audio:", error);
            setIsPlaying(false);
            showToastMessage(
              `Cannot play "${currentSong.title || "song"}": ${error.message}`
            );
            playPromiseRef.current = null;
          });
      }
    }
  };

  // Next song
  const handleNext = () => {
    if (!playlist || !playlist.songs || playlist.songs.length === 0) {
      console.warn("No songs available for next");
      showToastMessage("No songs available");
      return;
    }

    let nextIndex;
    if (isShuffled) {
      nextIndex = Math.floor(Math.random() * playlist.songs.length);
    } else {
      nextIndex = (currentSongIndex + 1) % playlist.songs.length;
    }

    if (nextIndex === currentSongIndex && playlist.songs.length > 1) {
      nextIndex = (nextIndex + 1) % playlist.songs.length;
    }

    console.log("Playing next song, index:", nextIndex);
    playSong(playlist.songs[nextIndex], nextIndex);
  };

  // Previous song
  const handlePrevious = () => {
    if (!playlist || !playlist.songs || playlist.songs.length === 0) {
      console.warn("No songs available for previous");
      showToastMessage("No songs available");
      return;
    }

    const prevIndex =
      currentSongIndex === 0 ? playlist.songs.length - 1 : currentSongIndex - 1;

    console.log("Playing previous song, index:", prevIndex);
    playSong(playlist.songs[prevIndex], prevIndex);
  };

  // Seek functionality
  const handleSeek = (e) => {
    if (!audioRef.current) return;

    const progressBar = e.currentTarget;
    const clickX = e.nativeEvent.offsetX;
    const width = progressBar.offsetWidth;
    const newTime = (clickX / width) * duration;

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Volume control
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Format time
  const formatTime = (time) => {
    if (isNaN(time) || !isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Toast Component
  const Toast = () => {
    if (!showToast) return null;

    return (
      <div className="fixed top-4 right-4 z-50 bg-green-500 text-black px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span className="font-medium">{toastMessage}</span>
      </div>
    );
  };

  if (!playlist) {
    console.warn("Playlist not found for ID:", id);
    return (
      <div className="text-white p-6">
        <h1 className="text-2xl font-bold">Playlist Not Found</h1>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        loop={isRepeating}
        onLoadStart={() => console.log("Audio loading started")}
        onCanPlay={() => console.log("Audio can play")}
        onLoadedData={() => console.log("Audio data loaded")}
        onError={(e) => {
          console.error("Audio error:", e.target.error);
          showToastMessage(`Failed to load audio: ${e.target.error.message}`);
        }}
      />

      <Toast />

      {/* Main Content */}
      <div className="flex-1 p-6 pb-24">
        {/* Playlist Info */}
        <div className="flex items-end space-x-6 mb-8">
          <div className="w-48 h-48 bg-gray-700 rounded-md flex items-center justify-center flex-shrink-0">
            {playlist.image ? (
              <img
                src={playlist.image}
                alt={playlist.name}
                className="w-full h-full object-cover rounded-md"
              />
            ) : (
              <div className="text-6xl text-gray-500">♪</div>
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-300 mb-2">Public Playlist</p>
            <h1 className="text-7xl font-bold mb-4 leading-none">
              {playlist.name}
            </h1>
            <p className="text-gray-300">
              <span className="font-medium">
                {playlist.user || "Unknown User"}
              </span>{" "}
              • ID: {playlist.id}
            </p>
            {playlist.description && (
              <p className="text-gray-300 mt-2">{playlist.description}</p>
            )}
            <p className="text-gray-300 mt-2">
              Created:{" "}
              {new Date(playlist.createdAt || Date.now()).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Playlist Controls */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={togglePlayPause}
              className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-400 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-black" />
              ) : (
                <Play className="w-6 h-6 text-black ml-1" />
              )}
            </button>
            <button
              onClick={() => setIsShuffled(!isShuffled)}
              className={`p-2 ${
                isShuffled ? "text-green-500" : "text-gray-400"
              } hover:text-white transition-colors`}
            >
              <Shuffle className="w-5 h-5" />
            </button>
            <Users className="w-6 h-6 text-gray-400" />
            <MoreHorizontal className="w-6 h-6 text-gray-400" />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-300">List</span>
            <List className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Songs List or Search Section */}
        {playlist.songs && playlist.songs.length > 0 ? (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Songs</h2>
            <div className="bg-gray-800 rounded-md">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-gray-700">
                    <th className="p-3 w-12"></th>
                    <th>Title</th>
                    <th>Artist</th>
                    <th className="hidden md:table-cell">Album</th>
                    <th className="hidden md:table-cell">Duration</th>
                    <th className="hidden lg:table-cell">Audio Source</th>
                  </tr>
                </thead>
                <tbody>
                  {playlist.songs.map((song, index) => (
                    <tr
                      key={song.id || index}
                      className={`border-b border-gray-700 last:border-0 hover:bg-gray-700 cursor-pointer transition-colors ${
                        currentSong?.id === song.id ? "bg-gray-700" : ""
                      }`}
                    >
                      <td className="p-3 w-12">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (currentSong?.id === song.id && isPlaying) {
                              togglePlayPause();
                            } else {
                              playSong(song, index);
                            }
                          }}
                          className="text-green-500 hover:text-green-400 transition-colors"
                        >
                          {currentSong?.id === song.id && isPlaying ? (
                            <Pause className="w-5 h-5" fill="currentColor" />
                          ) : (
                            <Play className="w-5 h-5" fill="currentColor" />
                          )}
                        </button>
                      </td>
                      <td
                        className="flex items-center space-x-3 py-2"
                        onClick={() => {
                          if (song.id) {
                            navigate(`/songdetail/${song.id}`);
                          } else {
                            console.warn("No song ID for navigation:", song);
                            showToastMessage("Song ID not available");
                          }
                        }}
                      >
                        {song.image && (
                          <img
                            src={song.image}
                            alt={song.title}
                            className="w-10 h-10 rounded object-cover"
                          />
                        )}
                        <div>
                          <p
                            className={`font-medium ${
                              currentSong?.id === song.id
                                ? "text-green-500"
                                : "text-white"
                            }`}
                          >
                            {song.title || "Unknown Title"}
                          </p>
                          <p className="text-sm text-gray-400">
                            {song.subtitle || "Unknown Artist"}
                          </p>
                        </div>
                      </td>
                      <td className="text-gray-400">
                        {(song.subtitle || "").split(" - ")[0] ||
                          "Unknown Artist"}
                      </td>
                      <td className="hidden md:table-cell text-gray-400">
                        {(song.subtitle || "").split(" - ")[1] || "-"}
                      </td>
                      <td className="hidden md:table-cell text-gray-400">
                        {song.duration ? formatTime(song.duration / 1000) : "-"}
                      </td>
                      <td className="hidden lg:table-cell text-gray-400 text-xs">
                        {song.audioUrl ? "✓ Audio Available" : "❌ No Audio"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">
              Let's find something for your playlist
            </h2>
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search for songs or episodes"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-md border-none outline-none focus:bg-gray-700 transition-colors"
              />
            </div>
            {/* Search Results */}
            {searchQuery.trim() && (
              <div className="mt-6">
                {loading && (
                  <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
                  </div>
                )}
                {error && (
                  <div className="text-red-400 text-center">Error: {error}</div>
                )}
                {!loading && !error && searchResults.length === 0 && (
                  <div className="text-gray-400 text-center">
                    No songs found
                  </div>
                )}
                {!loading && !error && searchResults.length > 0 && (
                  <div className="bg-gray-800 rounded-md">
                    <h3 className="text-xl font-semibold mb-4 text-white">
                      Search Results
                    </h3>
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-gray-400 border-b border-gray-700">
                          <th className="p-3 w-12"></th>
                          <th>Title</th>
                          <th>Artist</th>
                          <th className="hidden md:table-cell">Album</th>
                        </tr>
                      </thead>
                      <tbody>
                        {searchResults.map((song, index) => (
                          <tr
                            key={song.id || index}
                            className="border-b border-gray-700 last:border-0 hover:bg-gray-700 transition-colors"
                          >
                            <td className="p-3 w-12">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  playSong(song, index);
                                }}
                                className="text-green-500 hover:text-green-400 transition-colors"
                              >
                                <Play className="w-5 h-5" fill="currentColor" />
                              </button>
                            </td>
                            <td
                              className="flex items-center space-x-3 py-2"
                              onClick={() => {
                                if (song.id) {
                                  navigate(`/songdetail/${song.id}`);
                                } else {
                                  console.warn(
                                    "No song ID for navigation:",
                                    song
                                  );
                                  showToastMessage("Song ID not available");
                                }
                              }}
                            >
                              {song.image && (
                                <img
                                  src={song.image}
                                  alt={song.title}
                                  className="w-10 h-10 rounded object-cover"
                                />
                              )}
                              <div>
                                <p className="font-medium text-white">
                                  {song.title || "Unknown Title"}
                                </p>
                                <p className="text-sm text-gray-400">
                                  {song.subtitle || "Unknown Artist"}
                                </p>
                              </div>
                            </td>
                            <td className="text-gray-400">
                              {(song.subtitle || "").split(" - ")[0] ||
                                "Unknown Artist"}
                            </td>
                            <td className="hidden md:table-cell text-gray-400">
                              {(song.subtitle || "").split(" - ")[1] || "-"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Close button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Bottom Music Player */}
      {currentSong && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4">
          <div className="flex items-center justify-between max-w-full">
            {/* Current Song Info */}
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              {currentSong.image && (
                <img
                  src={currentSong.image}
                  alt={currentSong.title}
                  className="w-12 h-12 rounded object-cover"
                />
              )}
              <div className="min-w-0 flex-1">
                <p className="font-medium text-white truncate">
                  {currentSong.title || "Unknown Title"}
                </p>
                <p className="text-sm text-gray-400 truncate">
                  {currentSong.subtitle || "Unknown Artist"}
                </p>
              </div>
            </div>

            {/* Player Controls */}
            <div className="flex flex-col items-center space-y-2 flex-1 max-w-md">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsShuffled(!isShuffled)}
                  className={`p-1 ${
                    isShuffled ? "text-green-500" : "text-gray-400"
                  } hover:text-white transition-colors`}
                >
                  <Shuffle className="w-4 h-4" />
                </button>
                <button
                  onClick={handlePrevious}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <SkipBack className="w-5 h-5" />
                </button>
                <button
                  onClick={togglePlayPause}
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 text-black" />
                  ) : (
                    <Play className="w-4 h-4 text-black ml-0.5" />
                  )}
                </button>
                <button
                  onClick={handleNext}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <SkipForward className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsRepeating(!isRepeating)}
                  className={`p-1 ${
                    isRepeating ? "text-green-500" : "text-gray-400"
                  } hover:text-white transition-colors`}
                >
                  <Repeat className="w-4 h-4" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="flex items-center space-x-2 w-full">
                <span className="text-xs text-gray-400 w-10 text-right">
                  {formatTime(currentTime)}
                </span>
                <div
                  className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer"
                  onClick={handleSeek}
                >
                  <div
                    className="h-full bg-white rounded-full relative"
                    style={{
                      width: `${
                        duration ? (currentTime / duration) * 100 : 0
                      }%`,
                    }}
                  >
                    <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>
                <span className="text-xs text-gray-400 w-10">
                  {formatTime(duration)}
                </span>
              </div>
            </div>

            {/* Volume Control */}
            <div className="flex items-center space-x-2 flex-1 justify-end">
              <Volume2 className="w-4 h-4 text-gray-400" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-gray-600 rounded-full appearance-none cursor-pointer"
              />
              <Maximize2 className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
