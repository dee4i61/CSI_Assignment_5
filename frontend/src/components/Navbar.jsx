import React, { useState, useEffect, useRef } from "react";
import { Search, Home, Bell, Download, FolderOpen, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SpotifyNavbar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const resultsRef = useRef(null);

  // Debounce search to avoid too many API calls
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchQuery.trim()) {
        fetchSearchResults(searchQuery);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchQuery]);

  // Handle clicks outside search to close results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        resultsRef.current &&
        !resultsRef.current.contains(event.target)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchSearchResults = async (query) => {
    try {
      setIsLoading(true);
      // Replace with your actual backend URL
      const response = await fetch(
        `http://localhost:5000/api/search?query=${encodeURIComponent(query)}`
      );

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
        setShowResults(true);
      } else {
        console.error("Search failed:", response.statusText);
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    if (searchResults.length > 0) {
      setShowResults(true);
    }
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
    // Don't hide results immediately to allow clicking on them
    setTimeout(() => {
      if (!resultsRef.current?.contains(document.activeElement)) {
        setShowResults(false);
      }
    }, 200);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
  };

  const handleResultClick = (song) => {
    // Handle what happens when a search result is clicked
    // You might want to play the song, navigate to its page, etc.
    console.log("Selected song:", song);
    setSearchQuery(song.title);
    setShowResults(false);
    // Add your navigation or play logic here
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handlePremiumClick = () => {
    navigate("/premium");
  };

  const handleInstallClick = () => {
    navigate("/install");
  };

  const handleNotificationClick = () => {
    navigate("/notification");
  };

  const handleBrowseClick = () => {
    navigate("/search");
  };

  return (
    <nav className="bg-black text-white px-4 py-3 flex items-center justify-between relative">
      {/* Left section - Logo and Home */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <svg viewBox="0 0 24 24" className="w-12 h-12 fill-white">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.062 14.455c-.193 0-.314-.094-.502-.242-1.158-.906-2.625-1.366-4.369-1.366-1.289 0-2.504.24-3.621.716-.094.04-.188.067-.283.067-.314 0-.555-.242-.555-.568 0-.242.121-.434.341-.541 1.369-.594 2.746-.878 4.118-.878 2.016 0 3.783.527 5.252 1.568.188.134.282.321.282.541 0 .321-.242.568-.568.568-.054 0-.108-.013-.135-.027zm.675-1.771c-.228 0-.362-.108-.568-.269-1.369-1.073-3.378-1.745-5.464-1.745-1.530 0-2.935.269-4.118.769-.108.054-.216.081-.324.081-.364 0-.649-.283-.649-.649 0-.283.135-.5.378-.622 1.410-.621 3.027-.946 4.713-.946 2.328 0 4.423.729 6.062 2.016.216.162.324.378.324.622 0 .364-.285.649-.649.649-.081 0-.162-.013-.216-.027zm.783-2.016c-.270 0-.432-.121-.675-.297-1.597-1.248-4.051-1.932-6.370-1.932-1.813 0-3.486.324-4.889.972-.135.054-.270.094-.405.094-.432 0-.756-.324-.756-.756 0-.297.162-.568.432-.702 1.597-.729 3.567-1.113 5.618-1.113 2.625 0 5.279.729 7.287 2.124.243.175.378.432.378.702 0 .432-.324.756-.756.756-.054 0-.108-.013-.162-.027z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Center section - Search */}
      <div className="flex items-center space-x-2 flex-1 max-w-2xl mx-8 relative">
        <button
          className="p-3 hover:bg-gray-800 rounded-full transition-colors"
          onClick={handleHomeClick}
        >
          <Home className="w-6 h-6 text-white" />
        </button>

        <div className="flex-1 max-w-md relative">
          <div
            ref={searchRef}
            className={`relative flex items-center bg-gray-800 rounded-full transition-all duration-200 ${
              isSearchFocused
                ? "bg-gray-700 ring-2 ring-white"
                : "hover:bg-gray-700"
            }`}
          >
            <Search className="w-5 h-5 text-gray-400 ml-4" />
            <input
              type="text"
              placeholder="What do you want to play?"
              value={searchQuery}
              onChange={handleSearchInputChange}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              className="w-full bg-transparent text-white placeholder-gray-400 px-3 py-3 pr-20 focus:outline-none text-sm"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-10 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={handleBrowseClick}
              className="absolute right-3 text-gray-400 hover:text-white"
            >
              <FolderOpen className="w-5 h-5" />
            </button>
          </div>

          {/* Search Results Dropdown */}
          {showResults && (
            <div
              ref={resultsRef}
              className="absolute top-full left-0 right-0 mt-2 bg-gray-800 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50"
            >
              {isLoading ? (
                <div className="p-4 text-center text-gray-400">
                  <div className="animate-spin w-6 h-6 border-2 border-gray-600 border-t-white rounded-full mx-auto"></div>
                  <p className="mt-2">Searching...</p>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="py-2">
                  {searchResults.map((song, index) => (
                    <div
                      key={index}
                      className="px-4 py-3 hover:bg-gray-700 cursor-pointer transition-colors"
                      onClick={() => handleResultClick(song)}
                    >
                      <div
                        className="flex items-center space-x-3"
                        onClick={() => navigate(`/songdetail/${song.id}`)}
                      >
                        {song.image && (
                          <img
                            src={song.image}
                            alt={song.title}
                            className="w-10 h-10 rounded object-cover"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium truncate">
                            {song.title}
                          </p>
                          <p className="text-gray-400 text-sm truncate">
                            {song.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-400">
                  No results found for "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right section - Actions and Profile */}
      <div className="flex items-center space-x-4">
        <button
          className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium transition-colors border border-gray-600 hover:border-gray-500"
          onClick={handlePremiumClick}
        >
          Explore Premium
        </button>
        <button
          className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
          onClick={handleInstallClick}
        >
          <Download className="w-5 h-5" />
          <span className="text-sm font-medium">Install App</span>
        </button>
        <button
          className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          onClick={handleNotificationClick}
        >
          <Bell className="w-5 h-5 text-gray-300 hover:text-white" />
        </button>
        <button
          className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm hover:bg-blue-700 transition-colors"
          onClick={handleProfileClick}
        >
          D
        </button>
      </div>
    </nav>
  );
}
