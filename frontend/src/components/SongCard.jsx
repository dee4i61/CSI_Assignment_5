import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Search,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Heart,
  Download,
  MoreHorizontal,
  Plus,
  List,
  Clock,
  Shuffle,
  Repeat,
  Mic2,
  Monitor,
  VolumeX,
} from "lucide-react";
import { setCurrentSong } from "../redux/slice/songsSlice";

export default function SongCard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get data from Redux store (using songsSlice)
  const songs = useSelector((state) => state.songs.songs);
  const { currentSong } = useSelector((state) => state.songs);

  // Find the current song
  const song = songs.find((song) => song.id.toString() === id);

  // Local state for UI and audio
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0); // 0: no repeat, 1: repeat all, 2: repeat one
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [previousVolume, setPreviousVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const audioRef = useRef(new Audio());
  const playPromiseRef = useRef(null);

  // Toast notification function
  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  // Set current song and initialize audio when component mounts
  useEffect(() => {
    if (song && (!currentSong || currentSong.id !== song.id)) {
      console.log("Setting current song:", song);
      dispatch(setCurrentSong(song));
      if (song.audioUrl) {
        audioRef.current.src = song.audioUrl;
        audioRef.current.load();
      } else {
        console.warn("No audioUrl for song:", song);
        showToastMessage("No audio source available");
      }
    }
  }, [song, currentSong, dispatch]);

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
      console.log("Audio ended, repeatMode:", repeatMode);
      if (repeatMode === 2) {
        // Repeat one
        playSong(song);
      } else if (repeatMode === 1) {
        // Repeat all (navigate to next song in songs array)
        handleNext();
      } else {
        setIsPlaying(false);
      }
    };

    const handleError = (e) => {
      console.error("Audio playback error:", e.target.error);
      showToastMessage(`Failed to play audio: ${e.target.error.message}`);
      setIsPlaying(false);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    // Set volume
    audio.volume = isMuted ? 0 : volume;

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [repeatMode, volume, isMuted, song]);

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
  const playSong = (songToPlay) => {
    if (!songToPlay || !songToPlay.audioUrl) {
      console.warn("No audio source for song:", songToPlay);
      showToastMessage("No audio source available");
      return;
    }

    console.log(
      "Playing song:",
      songToPlay.title,
      "audioUrl:",
      songToPlay.audioUrl
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

    dispatch(setCurrentSong(songToPlay));

    // Set audio source
    audioRef.current.src = songToPlay.audioUrl;
    audioRef.current.load();

    // Wait for audio to be ready
    const onCanPlay = () => {
      console.log("Audio can play:", songToPlay.title);
      playPromiseRef.current = audioRef.current.play();
      if (playPromiseRef.current) {
        playPromiseRef.current
          .then(() => {
            console.log("Playback started:", songToPlay.title);
            setIsPlaying(true);
            playPromiseRef.current = null;
          })
          .catch((error) => {
            console.error("Error playing audio:", error);
            setIsPlaying(false);
            showToastMessage(
              `Cannot play "${songToPlay.title || "song"}": ${error.message}`
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
    if (!song || !song.audioUrl) {
      console.warn("No song or audio source for play/pause:", song);
      showToastMessage("No song or audio source selected");
      return;
    }

    if (isPlaying) {
      console.log("Pausing audio:", song.title);
      audioRef.current.pause();
      setIsPlaying(false);
      playPromiseRef.current = null;
    } else {
      console.log("Attempting to play audio:", song.title);
      playPromiseRef.current = audioRef.current.play();
      if (playPromiseRef.current) {
        playPromiseRef.current
          .then(() => {
            console.log("Playback resumed:", song.title);
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
    }
  };

  // Skip forward (10 seconds)
  const skipForward = () => {
    if (!audioRef.current || !duration) return;
    const newTime = Math.min(audioRef.current.currentTime + 10, duration);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Skip backward (10 seconds)
  const skipBackward = () => {
    if (!audioRef.current) return;
    const newTime = Math.max(audioRef.current.currentTime - 10, 0);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Navigate to next song
  const handleNext = () => {
    if (!songs || songs.length === 0) {
      console.warn("No songs available for next");
      showToastMessage("No songs available");
      return;
    }

    let nextIndex;
    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * songs.length);
    } else {
      const currentIndex = songs.findIndex((s) => s.id === song.id);
      nextIndex = (currentIndex + 1) % songs.length;
    }

    console.log("Playing next song, index:", nextIndex);
    playSong(songs[nextIndex]);
  };

  // Navigate to previous song
  const handlePrevious = () => {
    if (!songs || songs.length === 0) {
      console.warn("No songs available for previous");
      showToastMessage("No songs available");
      return;
    }

    const currentIndex = songs.findIndex((s) => s.id === song.id);
    const prevIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;

    console.log("Playing previous song, index:", prevIndex);
    playSong(songs[prevIndex]);
  };

  // Toggle shuffle
  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  // Toggle repeat mode
  const toggleRepeat = () => {
    setRepeatMode((prev) => (prev + 1) % 3);
  };

  // Handle progress bar click
  const handleProgressClick = (e) => {
    if (!duration || !audioRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const clickTime = (clickX / width) * duration;

    audioRef.current.currentTime = clickTime;
    setCurrentTime(clickTime);
  };

  // Handle volume click
  const handleVolumeClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newVolume = Math.max(0, Math.min(1, clickX / width));

    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      setVolume(previousVolume);
      if (audioRef.current) {
        audioRef.current.volume = previousVolume;
      }
    } else {
      setPreviousVolume(volume);
      setIsMuted(true);
      setVolume(0);
      if (audioRef.current) {
        audioRef.current.volume = 0;
      }
    }
  };

  // Format time
  const formatTime = (time) => {
    if (isNaN(time) || !isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Calculate progress percentage
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const volumePercentage = isMuted ? 0 : volume * 100;

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

  if (!song) {
    console.warn("Song not found for ID:", id);
    return (
      <div className="bg-black text-white p-6">
        <h1 className="text-2xl font-bold">Song Not Found</h1>
        <button
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-white"
        >
          Back
        </button>
      </div>
    );
  }

  // Extract artist and album from subtitle
  const [artist, album] = (song.subtitle || "").split(" - ");

  return (
    <div className="bg-black text-white min-h-screen flex">
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        loop={repeatMode === 2}
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
      <div className="flex-1 bg-gradient-to-b from-gray-900 to-black">
        {/* Song Details */}
        <div className="p-8">
          <div className="flex items-end gap-6 mb-8">
            {/* Album Cover */}
            <div className="w-64 h-64 bg-gradient-to-br from-orange-400 to-red-600 rounded-lg shadow-2xl overflow-hidden">
              <div className="w-full h-full bg-black bg-opacity-20 flex items-center justify-center relative">
                <div className="absolute top-4 left-4 text-white text-xs bg-red-500 px-2 py-1 rounded">
                  {album || "Single"}
                </div>
                <div className="text-center">
                  <div className="text-white text-4xl font-bold mb-2">
                    {song.title || "Unknown Title"}
                  </div>
                  <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full mx-auto mb-4">
                    {song.image && (
                      <img
                        src={song.image}
                        alt={song.title}
                        className="w-full h-full object-cover rounded-full"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Song Info */}
            <div className="pb-4">
              <div className="text-sm text-white mb-2">Single</div>
              <h1 className="text-6xl font-bold text-white mb-4">
                {song.title || "Unknown Title"}
              </h1>
              <div className="flex items-center gap-2 text-gray-300">
                <span>{artist || "Unknown Artist"}</span>
                <span>•</span>
                <span>{album || "Unknown Album"}</span>
                <span>•</span>
                <span>2024</span>
                <span>•</span>
                <span>1 song, {formatTime(duration)}</span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-6 mb-8">
            <button
              onClick={togglePlayPause}
              className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-400 hover:scale-105 transition-all relative"
              disabled={!song?.audioUrl}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-black ml-0.5" />
              ) : (
                <Play className="w-6 h-6 text-black ml-1" />
              )}
            </button>

            <button
              onClick={() => setIsLiked(!isLiked)}
              className="w-8 h-8 flex items-center justify-center hover:scale-110 transition-transform"
            >
              <Heart
                className={`w-6 h-6 ${
                  isLiked ? "text-green-500 fill-green-500" : "text-gray-400"
                }`}
              />
            </button>

            <button className="w-8 h-8 flex items-center justify-center hover:scale-110 transition-transform">
              <Plus className="w-6 h-6 text-gray-400 hover:text-white" />
            </button>

            <button className="w-8 h-8 flex items-center justify-center hover:scale-110 transition-transform">
              <Download className="w-6 h-6 text-gray-400 hover:text-white" />
            </button>

            <button className="w-8 h-8 flex items-center justify-center hover:scale-110 transition-transform">
              <MoreHorizontal className="w-6 h-6 text-gray-400 hover:text-white" />
            </button>

            <div className="ml-auto flex items-center gap-4">
              <span className="text-gray-400 text-sm">List</span>
              <List className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Track List */}
          <div className="bg-black bg-opacity-20 rounded-lg">
            <div className="flex items-center p-4 border-b border-gray-800">
              <div className="w-8 text-gray-400 text-sm">#</div>
              <div className="flex-1 text-gray-400 text-sm">Title</div>
              <div className="w-12 text-gray-400">
                <Clock className="w-4 h-4" />
              </div>
            </div>

            <div className="flex items-center p-4 hover:bg-opacity-10 rounded group">
              <div className="w-8 text-gray-400 group-hover:text-white">1</div>
              <div className="flex-1">
                <div className="text-white font-medium">
                  {song.title || "Unknown Title"}
                </div>
                <div className="text-gray-400 text-sm">
                  {song.subtitle || "Unknown Artist"}
                </div>
              </div>
              <div className="w-12 text-gray-400 text-sm">
                {formatTime(duration)}
              </div>
            </div>

            <div className="p-4 text-gray-400 text-sm">
              <div>October 4, 2024</div>
              <div>© 2024 Super Cassettes Industries Private Limited</div>
              <div>℗ 2024 Super Cassettes Industries Private Limited</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Player */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 p-4">
        <div className="flex items-center justify-between">
          {/* Currently Playing */}
          <div className="flex items-center gap-4 w-80">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-red-600 rounded overflow-hidden">
              {song.image && (
                <img
                  src={song.image}
                  alt={song.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div>
              <div className="text-white text-sm font-medium">
                {song.title || "Unknown Title"}
              </div>
              <div className="text-gray-400 text-xs">
                {artist || "Unknown Artist"}
              </div>
            </div>
            <Heart
              className={`w-4 h-4 ${
                isLiked ? "text-green-500 fill-green-500" : "text-gray-400"
              } cursor-pointer`}
              onClick={() => setIsLiked(!isLiked)}
            />
          </div>

          {/* Player Controls */}
          <div className="flex flex-col items-center gap-2 flex-1">
            <div className="flex items-center gap-4">
              <Shuffle
                className={`w-4 h-4 ${
                  isShuffle ? "text-green-500" : "text-gray-400"
                } hover:text-white cursor-pointer`}
                onClick={toggleShuffle}
              />
              <SkipBack
                className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer"
                onClick={skipBackward}
              />
              <button
                onClick={togglePlayPause}
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform relative"
                disabled={!song?.audioUrl}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-black" />
                ) : (
                  <Play className="w-4 h-4 text-black ml-0.5" />
                )}
              </button>
              <SkipForward
                className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer"
                onClick={skipForward}
              />
              <Repeat
                className={`w-4 h-4 cursor-pointer ${
                  repeatMode === 0
                    ? "text-gray-400"
                    : repeatMode === 1
                    ? "text-green-500"
                    : "text-green-500"
                } hover:text-white`}
                onClick={toggleRepeat}
              />
              {repeatMode === 2 && (
                <div className="absolute w-1 h-1 bg-green-500 rounded-full ml-4 mt-3"></div>
              )}
            </div>

            <div className="flex items-center gap-2 w-full max-w-md">
              <span className="text-xs text-gray-400">
                {formatTime(currentTime)}
              </span>
              <div
                className="flex-1 bg-gray-600 h-1 rounded-full relative cursor-pointer group"
                onClick={handleProgressClick}
              >
                <div
                  className="bg-white h-1 rounded-full relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100"></div>
                </div>
              </div>
              <span className="text-xs text-gray-400">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2 w-80 justify-end">
            <Mic2 className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
            <Monitor className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
            <button onClick={toggleMute}>
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
              ) : (
                <Volume2 className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
              )}
            </button>
            <div className="flex items-center gap-2">
              <div
                className="w-20 bg-gray-600 h-1 rounded-full relative group cursor-pointer"
                onClick={handleVolumeClick}
              >
                <div
                  className="bg-white h-1 rounded-full relative"
                  style={{ width: `${volumePercentage}%` }}
                >
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
