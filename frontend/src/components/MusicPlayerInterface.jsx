import React, { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  SkipForward,
  SkipBack,
  Heart,
  Plus,
  Radio,
  Share,
  Monitor,
  Search,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addSongToPlaylist, addPlaylist } from "../redux/slice/playlistSlice";
import { fetchSongs, setCurrentSong } from "../redux/slice/songsSlice";

const MusicPlayerInterface = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { songs, currentSong, loading, error } = useSelector(
    (state) => state.songs
  );
  const playlists = useSelector((state) => state.playlists.playlists);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [hoveredTrack, setHoveredTrack] = useState(null);
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    song: null,
  });
  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);
  const [showNewPlaylistDialog, setShowNewPlaylistDialog] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [searchPlaylist, setSearchPlaylist] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const audioRef = useRef(new Audio());
  const playPromiseRef = useRef(null);

  // Dummy podcast data
  const dummyPodcasts = [
    {
      id: "podcast1",
      title: "Tech Talk",
      subtitle: "Tech Insights Team",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiqlHgMZnDsNi2mrQn4Ih_QfDe_k8K29uiuA&s",
      audioUrl: "https://example.com/podcast1.mp3",
      isPodcast: true,
    },
    {
      id: "podcast2",
      title: "The Science Hour",
      subtitle: "Dr. Science",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiqlHgMZnDsNi2mrQn4Ih_QfDe_k8K29uiuA&s",
      audioUrl: "https://example.com/podcast2.mp3",
      isPodcast: true,
    },
    {
      id: "podcast3",
      title: "History Unraveled",
      subtitle: "History Buffs",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiqlHgMZnDsNi2mrQn4Ih_QfDe_k8K29uiuA&s",
      audioUrl: "https://example.com/podcast3.mp3",
      isPodcast: true,
    },
    {
      id: "podcast4",
      title: "Mind Matters",
      subtitle: "Psychology Today",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiqlHgMZnDsNi2mrQn4Ih_QfDe_k8K29uiuA&s",
      audioUrl: "https://example.com/podcast4.mp3",
      isPodcast: true,
    },
    {
      id: "podcast5",
      title: "The Daily Scoop",
      subtitle: "Newsroom Crew",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiqlHgMZnDsNi2mrQn4Ih_QfDe_k8K29uiuA&s",
      audioUrl: "https://example.com/podcast5.mp3",
      isPodcast: true,
    },
  ];

  // Combine songs with dummy podcasts
  const allMedia = [...songs, ...dummyPodcasts];

  // Define sections for song display
  const sections =
    allMedia.length > 0
      ? [
          { title: "India's Best", items: allMedia.slice(0, 10) },
          {
            title: "Popular albums and singles",
            items: allMedia.slice(10, 20),
          },
          { title: "Trending songs", items: allMedia.slice(20, 26) },
        ]
      : [];

  // Filter podcasts
  const podcasts = allMedia.filter((item) => item.isPodcast);

  // Get unique artists
  const artists = Array.from(
    new Set(allMedia.map((item) => item.subtitle))
  ).map((subtitle) => ({
    id: subtitle,
    name: subtitle,
    image:
      allMedia.find((item) => item.subtitle === subtitle)?.image ||
      "https://via.placeholder.com/300/374151/9CA3AF?text=Artist",
  }));

  // Fetch songs on mount
  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  // Audio setup and event handlers
  useEffect(() => {
    const audio = audioRef.current;

    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => {
      setIsPlaying(false);
      skipToNext();
    };
    const handleError = (e) => {
      console.error("Audio error:", e.target.error);
      // showToastMessage(`Failed to play: ${e.target.error.message}`);
      setIsPlaying(false);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);
    audio.volume = volume;

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.pause();
      audio.src = "";
    };
  }, [volume]);

  // Sync audio with currentSong
  useEffect(() => {
    if (currentSong && currentSong.audioUrl) {
      audioRef.current.src = currentSong.audioUrl;
      audioRef.current.load();
      if (isPlaying) {
        playTrack(currentSong);
      }
    }
  }, [currentSong]);

  // Toast notification
  const showToastMessage = (message) => {
    setToastMessage(message);
    // setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Play a track
  const playTrack = (track) => {
    if (!track || !track.audioUrl) {
      showToastMessage("No audio source available");
      return;
    }

    if (playPromiseRef.current) {
      audioRef.current.pause();
      playPromiseRef.current = null;
    }

    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);

    const trackIndex = allMedia.findIndex((t) => t.id === track.id);
    setCurrentTrackIndex(trackIndex);
    dispatch(setCurrentSong(track));

    audioRef.current.src = track.audioUrl;
    audioRef.current.load();

    const onCanPlay = () => {
      playPromiseRef.current = audioRef.current.play();
      if (playPromiseRef.current) {
        playPromiseRef.current
          .then(() => {
            setIsPlaying(true);
            playPromiseRef.current = null;
          })
          .catch((error) => {
            showToastMessage(`Cannot play "${track.title}": ${error.message}`);
            setIsPlaying(false);
            playPromiseRef.current = null;
          });
      }
      audioRef.current.removeEventListener("canplay", onCanPlay);
    };

    audioRef.current.addEventListener("canplay", onCanPlay);
  };

  // Toggle playback
  const togglePlayback = () => {
    if (!currentSong || !currentSong.audioUrl) {
      showToastMessage("No track selected");
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      playPromiseRef.current = null;
    } else {
      playPromiseRef.current = audioRef.current.play();
      if (playPromiseRef.current) {
        playPromiseRef.current
          .then(() => setIsPlaying(true))
          .catch((error) => {
            showToastMessage(
              `Cannot play "${currentSong.title}": ${error.message}`
            );
            setIsPlaying(false);
          })
          .finally(() => {
            playPromiseRef.current = null;
          });
      }
    }
  };

  // Skip to next/previous track
  const skipToNext = () => {
    if (allMedia.length === 0) {
      showToastMessage("No tracks available");
      return;
    }
    const nextIndex = (currentTrackIndex + 1) % allMedia.length;
    playTrack(allMedia[nextIndex]);
  };

  const skipToPrevious = () => {
    if (allMedia.length === 0) {
      showToastMessage("No tracks available");
      return;
    }
    const prevIndex =
      currentTrackIndex === 0 ? allMedia.length - 1 : currentTrackIndex - 1;
    playTrack(allMedia[prevIndex]);
  };

  // Handle seek and volume
  const handleSeek = (e) => {
    if (!duration || !audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newVolume = Math.max(0, Math.min(1, percent));
    setVolume(newVolume);
    if (audioRef.current) audioRef.current.volume = newVolume;
  };

  // Format time
  const formatTime = (time) => {
    if (isNaN(time) || !isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Context menu and playlist handlers
  const handleContextMenu = (e, song) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({ visible: true, x: e.pageX, y: e.pageY, song });
  };

  const handleAddToPlaylist = (playlistId) => {
    if (contextMenu.song && playlistId) {
      const playlist = playlists.find((p) => p.id === playlistId);
      if (!playlist) {
        showToastMessage("Playlist not found");
        return;
      }
      const isAlreadyInPlaylist = playlist.songs?.some(
        (s) => s.id === contextMenu.song.id
      );
      if (isAlreadyInPlaylist) {
        showToastMessage(`Song is already in "${playlist.name}"`);
      } else {
        dispatch(addSongToPlaylist({ playlistId, song: contextMenu.song }));
        showToastMessage(`Added to "${playlist.name}"`);
      }
      setContextMenu({ visible: false, x: 0, y: 0, song: null });
      setShowPlaylistMenu(false);
    }
  };

  const handleCreateNewPlaylist = () => {
    if (newPlaylistName.trim() && contextMenu.song) {
      const newPlaylist = {
        id: Date.now().toString(),
        name: newPlaylistName.trim(),
        createdAt: new Date().toISOString(),
        description: `Created from ${contextMenu.song.title}`,
      };
      dispatch(addPlaylist(newPlaylist));
      dispatch(
        addSongToPlaylist({
          playlistId: newPlaylist.id,
          song: contextMenu.song,
        })
      );
      showToastMessage(
        `Created playlist "${newPlaylistName.trim()}" and added song`
      );
      setNewPlaylistName("");
      setShowNewPlaylistDialog(false);
      setShowPlaylistMenu(false);
      setContextMenu({ visible: false, x: 0, y: 0, song: null });
    }
  };

  const filteredPlaylists = playlists.filter((playlist) =>
    playlist.name.toLowerCase().includes(searchPlaylist.toLowerCase())
  );

  // Toast Component
  const Toast = () =>
    showToast && (
      <div className="fixed top-4 right-4 z-50 bg-green-500 text-black px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
        <Check size={16} />
        <span className="font-medium">{toastMessage}</span>
      </div>
    );

  // Context Menu Component
  const ContextMenu = () =>
    contextMenu.visible && (
      <div
        data-context-menu
        className="fixed z-50 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-2 min-w-48"
        style={{ left: contextMenu.x, top: contextMenu.y }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 flex items-center gap-3"
          onClick={() =>
            setContextMenu({ visible: false, x: 0, y: 0, song: null })
          }
        >
          <Plus size={16} /> Add to Your Library
        </button>
        <button
          className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 flex items-center gap-3"
          onClick={() =>
            setContextMenu({ visible: false, x: 0, y: 0, song: null })
          }
        >
          <div className="w-4 h-4 flex items-center justify-center">
            <div className="w-3 h-3 border border-white rounded-sm flex items-center justify-center">
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
          </div>
          Add to queue
        </button>
        <button
          className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 flex items-center gap-3"
          onClick={() =>
            setContextMenu({ visible: false, x: 0, y: 0, song: null })
          }
        >
          <Radio size={16} /> Go to artist radio
        </button>
        <button
          className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 flex items-center gap-3 group"
          onClick={(e) => {
            e.stopPropagation();
            setShowPlaylistMenu(true);
          }}
        >
          <Plus size={16} /> Add to playlist
          <ChevronRight size={16} className="ml-auto" />
        </button>
        <button
          className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 flex items-center gap-3 group"
          onClick={() =>
            setContextMenu({ visible: false, x: 0, y: 0, song: null })
          }
        >
          <Share size={16} /> Share
          <ChevronRight size={16} className="ml-auto" />
        </button>
        <button
          className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 flex items-center gap-3"
          onClick={() =>
            setContextMenu({ visible: false, x: 0, y: 0, song: null })
          }
        >
          <Monitor size={16} /> Open in Desktop app
        </button>
      </div>
    );

  // Playlist Menu Component
  const PlaylistMenu = () =>
    showPlaylistMenu && (
      <div
        data-playlist-menu
        className="fixed z-50 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-2 w-64"
        style={{ left: contextMenu.x + 200, top: contextMenu.y }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 py-2 border-b border-gray-700">
          <div className="flex items-center gap-2 bg-gray-700 rounded px-3 py-2">
            <Search size={14} className="text-gray-400" />
            <input
              type="text"
              placeholder="Find a playlist"
              className="bg-transparent text-white text-sm flex-1 outline-none placeholder-gray-400"
              value={searchPlaylist}
              onChange={(e) => setSearchPlaylist(e.target.value)}
            />
          </div>
        </div>
        <button
          className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 flex items-center gap-3 border-b border-gray-700"
          onClick={(e) => {
            e.stopPropagation();
            setShowNewPlaylistDialog(true);
          }}
        >
          <Plus size={16} /> New Playlist
        </button>
        <div className="max-h-48 overflow-y-auto">
          {filteredPlaylists.length > 0 ? (
            filteredPlaylists.map((playlist) => (
              <button
                key={playlist.id}
                className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToPlaylist(playlist.id);
                }}
              >
                {playlist.name}
              </button>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-400 text-sm">
              {playlists.length === 0
                ? "No playlists created yet"
                : "No playlists found"}
            </div>
          )}
        </div>
      </div>
    );

  // New Playlist Dialog Component
  const NewPlaylistDialog = () =>
    showNewPlaylistDialog && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div
          data-new-playlist-dialog
          className="bg-gray-800 rounded-lg p-6 w-96"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-white text-lg font-semibold mb-4">
            Create New Playlist
          </h3>
          <input
            type="text"
            placeholder="Playlist name"
            className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-green-500 outline-none"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleCreateNewPlaylist()}
            autoFocus
          />
          <div className="flex gap-3 mt-4 justify-end">
            <button
              className="px-4 py-2 text-gray-400 hover:text-white"
              onClick={() => {
                setShowNewPlaylistDialog(false);
                setNewPlaylistName("");
              }}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-green-500 text-black rounded hover:bg-green-400 disabled:opacity-50"
              onClick={handleCreateNewPlaylist}
              disabled={!newPlaylistName.trim()}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    );

  // Carousel Component for Songs and Podcasts
  const Carousel = ({ items, title }) => {
    const containerRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    useEffect(() => {
      const checkScrollButtons = () => {
        if (containerRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
          setCanScrollLeft(scrollLeft > 0);
          setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
        }
      };
      checkScrollButtons();
    }, [items]);

    const scroll = (direction) => {
      const container = containerRef.current;
      if (!container) return;
      const scrollAmount = 320;
      const currentScroll = container.scrollLeft;
      const newScrollPosition =
        direction === "left"
          ? Math.max(0, currentScroll - scrollAmount)
          : currentScroll + scrollAmount;
      container.scrollTo({ left: newScrollPosition, behavior: "smooth" });
    };

    return (
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <button className="text-gray-400 hover:text-white text-sm font-medium">
            Show all
          </button>
        </div>
        <div className="relative group">
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-70 hover:bg-opacity-90 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          <div
            ref={containerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              scrollBehavior: "smooth",
            }}
            onScroll={() => {
              const { scrollLeft, scrollWidth, clientWidth } =
                containerRef.current;
              setCanScrollLeft(scrollLeft > 0);
              setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
            }}
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-48 group cursor-pointer relative"
                onContextMenu={(e) => handleContextMenu(e, item)}
                onMouseEnter={() => setHoveredTrack(item.id)}
                onMouseLeave={() => setHoveredTrack(null)}
              >
                <div
                  className="relative"
                  onClick={() => navigate(`/songdetail/${item.id}`)}
                >
                  <div className="relative bg-gray-800 rounded-lg overflow-hidden group-hover:bg-gray-700 transition-colors">
                    <div className="aspect-square bg-gray-700 rounded-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/300/374151/9CA3AF?text=Music";
                        }}
                      />
                    </div>
                    <div
                      className={`absolute bottom-4 right-4 transition-opacity ${
                        hoveredTrack === item.id ||
                        (currentSong?.id === item.id && isPlaying)
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    >
                      <button
                        className="bg-green-500 hover:bg-green-400 text-black p-3 rounded-full shadow-lg transform hover:scale-105 transition-transform"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (currentSong?.id === item.id && isPlaying) {
                            togglePlayback();
                          } else {
                            playTrack(item);
                          }
                        }}
                      >
                        {currentSong?.id === item.id && isPlaying ? (
                          <Pause size={16} fill="currentColor" />
                        ) : (
                          <Play size={16} fill="currentColor" />
                        )}
                      </button>
                    </div>
                    {currentSong?.id === item.id && isPlaying && (
                      <div className="absolute top-4 left-4">
                        <div className="flex space-x-1">
                          <div className="w-1 h-6 bg-green-500 rounded-full animate-pulse"></div>
                          <div
                            className="w-1 h-4 bg-green-500 rounded-full animate-pulse"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                          <div
                            className="w-1 h-8 bg-green-500 rounded-full animate-pulse"
                            style={{ animationDelay: "0.4s" }}
                          ></div>
                        </div>
                      </div>
                    )}
                    {currentSong?.id === item.id && (
                      <div className="absolute inset-0 border-2 border-green-500 rounded-lg"></div>
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <h3
                    className={`font-medium text-sm line-clamp-1 ${
                      currentSong?.id === item.id
                        ? "text-green-400"
                        : "text-white"
                    }`}
                  >
                    {item.title || "Unknown Title"}
                  </h3>
                  <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                    {item.subtitle || "Unknown Artist"}
                  </p>
                  {item.isPodcast && (
                    <p className="text-gray-500 text-xs mt-1">Podcast</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-70 hover:bg-opacity-90 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>
    );
  };

  // Artist List Component
  const ArtistList = ({ artists }) => (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-6">Artists</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {artists.map((artist) => (
          <div
            key={artist.id}
            className="flex-shrink-0 group cursor-pointer"
            onClick={() => navigate(`/artist/${artist.id}`)}
          >
            <div className="relative w-40 h-40 mx-auto">
              <img
                src={artist.image}
                alt={artist.name}
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/300/374151/9CA3AF?text=Artist";
                }}
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="font-medium text-sm text-white line-clamp-1">
                {artist.name || "Unknown Artist"}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-b from-gray-800 to-black min-h-screen text-white">
      <audio ref={audioRef} />
      <Toast />
      <ContextMenu />
      <PlaylistMenu />
      <NewPlaylistDialog />

      <div className="p-6">
        <div className="flex space-x-4 mb-6">
          <button
            className={`text-lg font-semibold ${
              activeTab === "All"
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("All")}
          >
            All
          </button>
          <button
            className={`text-lg font-semibold ${
              activeTab === "Podcasts"
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("Podcasts")}
          >
            Podcasts
          </button>
          <button
            className={`text-lg font-semibold ${
              activeTab === "Artists"
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("Artists")}
          >
            Artists
          </button>
        </div>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        )}
        {error && (
          <div className="flex justify-center items-center h-64 text-red-400">
            Error: {error}
          </div>
        )}
        {!loading && !error && allMedia.length === 0 && (
          <div className="flex justify-center items-center h-64 text-gray-400">
            No songs found
          </div>
        )}
        {!loading && !error && allMedia.length > 0 && (
          <div className="pb-32">
            {activeTab === "All" &&
              sections.map((section, index) => (
                <Carousel
                  key={index}
                  items={section.items}
                  title={section.title}
                />
              ))}
            {activeTab === "Podcasts" && (
              <Carousel items={podcasts} title="Podcasts" />
            )}
            {activeTab === "Artists" && <ArtistList artists={artists} />}
          </div>
        )}
      </div>
      {currentSong && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 p-4 z-50 backdrop-blur-md bg-opacity-95">
          <div className="flex items-center justify-between max-w-screen-xl mx-auto">
            <div className="flex items-center space-x-4 flex-1">
              <div className="w-14 h-14 bg-gray-700 rounded overflow-hidden">
                <img
                  onClick={() => navigate(`/songdetail/${currentSong.id}`)}
                  src={currentSong.image}
                  alt={currentSong.title}
                  className="w-full h-full object-cover cursor-pointer"
                />
              </div>
              <div
                className="min-w-0 flex-1 cursor-pointer"
                onClick={() => navigate(`/songdetail/${currentSong.id}`)}
              >
                <p className="text-white text-sm font-medium truncate">
                  {currentSong.title || "Unknown Title"}
                </p>
                <p className="text-gray-400 text-xs truncate">
                  {currentSong.subtitle || "Unknown Artist"}
                </p>
              </div>
              <button className="text-gray-400 hover:text-green-400 transition-colors">
                <Heart size={20} />
              </button>
            </div>
            <div className="flex flex-col items-center space-y-2 flex-1">
              <div className="flex items-center space-x-4">
                <button
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={skipToPrevious}
                >
                  <SkipBack size={20} />
                </button>
                <button
                  onClick={togglePlayback}
                  className="bg-white text-black p-2 rounded-full hover:scale-105 transition-transform"
                >
                  {isPlaying ? (
                    <Pause size={20} fill="currentColor" />
                  ) : (
                    <Play size={20} fill="currentColor" />
                  )}
                </button>
                <button
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={skipToNext}
                >
                  <SkipForward size={20} />
                </button>
              </div>
              <div className="flex items-center space-x-2 w-full max-w-md">
                <span className="text-xs text-gray-400 w-10 text-right">
                  {formatTime(currentTime)}
                </span>
                <div
                  className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer group"
                  onClick={handleSeek}
                >
                  <div
                    className="h-full bg-white rounded-full transition-all duration-100 group-hover:bg-green-400"
                    style={{
                      width: `${
                        duration > 0 ? (currentTime / duration) * 100 : 0
                      }%`,
                    }}
                  ></div>
                </div>
                <span className="text-xs text-gray-400 w-10">
                  {formatTime(duration)}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2 flex-1 justify-end">
              <Volume2 size={20} className="text-gray-400" />
              <div
                className="w-24 h-1 bg-gray-600 rounded-full cursor-pointer group"
                onClick={handleVolumeChange}
              >
                <div
                  className="h-full bg-white rounded-full group-hover:bg-green-400 transition-colors"
                  style={{ width: `${volume * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
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
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default MusicPlayerInterface;
