import React from "react";
import {
  Search,
  Home,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Maximize2,
} from "lucide-react";

const InstallApp = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300 via-pink-300 to-green-400 p-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left side - Download content */}
        <div className="w-1/2 pr-12">
          {/* Spotify Logo */}
          <div className="flex items-center mb-12">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center mr-3">
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-black">Spotify</span>
          </div>

          {/* Main heading */}
          <h1 className="text-6xl font-bold text-black leading-tight mb-8">
            Download Spotify
            <br />
            for Windows
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-800 mb-12 leading-relaxed">
            Enjoy high-quality audio and offline playback, plus Windows Game Bar
            integration and a friend activity feed that lets you see what your
            friends are listening to in real time.
          </p>

          {/* Download button */}
          <button className="bg-black text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-3 mb-8 hover:bg-gray-800 transition-colors">
            <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            Download from the Microsoft Store
          </button>

          {/* Alternative download */}
          <p className="text-gray-700 underline cursor-pointer">
            Download directly from Spotify
          </p>
        </div>

        {/* Right side - Desktop app mockup */}
        <div className="w-1/2 relative">
          <div className="bg-gray-100 rounded-t-lg p-2 shadow-2xl">
            {/* Browser-like header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-white rounded px-3 py-1 text-sm text-gray-600">
                  open.spotify.com
                </div>
              </div>
            </div>

            {/* Spotify App Interface */}
            <div className="bg-black rounded text-white overflow-hidden">
              {/* Top bar */}
              <div className="flex items-center justify-between p-4 bg-gray-900">
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <ChevronLeft className="w-6 h-6 text-gray-400" />
                    <ChevronRight className="w-6 h-6 text-gray-400" />
                  </div>
                </div>
                <div className="flex-1 max-w-md mx-4">
                  <div className="bg-gray-800 rounded-full px-4 py-2 flex items-center gap-2">
                    <Search className="w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="What do you want to play?"
                      className="bg-transparent text-white placeholder-gray-400 outline-none flex-1 text-sm"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Home className="w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Navigation tabs */}
              <div className="flex gap-2 px-4 py-2 bg-gray-900">
                <span className="bg-white text-black px-3 py-1 rounded-full text-sm">
                  All
                </span>
                <span className="text-gray-400 px-3 py-1 text-sm">Music</span>
                <span className="text-gray-400 px-3 py-1 text-sm">
                  Podcasts
                </span>
                <span className="text-gray-400 px-3 py-1 text-sm">
                  Audiobooks
                </span>
              </div>

              {/* Sidebar */}
              <div className="flex">
                <div className="w-20 bg-black p-2 space-y-2">
                  <div className="w-12 h-12 bg-purple-500 rounded"></div>
                  <div className="w-12 h-12 bg-pink-500 rounded"></div>
                  <div className="w-12 h-12 bg-yellow-500 rounded"></div>
                  <div className="w-12 h-12 bg-green-500 rounded"></div>
                  <div className="w-12 h-12 bg-blue-500 rounded"></div>
                  <div className="w-12 h-12 bg-red-500 rounded"></div>
                  <div className="w-12 h-12 bg-purple-400 rounded"></div>
                  <div className="w-12 h-12 bg-pink-400 rounded"></div>
                  <div className="w-12 h-12 bg-indigo-500 rounded"></div>
                  <div className="w-12 h-12 bg-teal-500 rounded"></div>
                </div>

                {/* Main content */}
                <div className="flex-1 p-4">
                  {/* Top section with podcasts */}
                  <div className="grid grid-cols-4 gap-3 mb-6">
                    <div className="bg-gray-800 rounded-lg p-3 flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-400 rounded"></div>
                      <div>
                        <div className="text-sm font-medium">
                          Discover Weekly
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3 flex items-center gap-3">
                      <div className="w-12 h-12 bg-red-500 rounded"></div>
                      <div>
                        <div className="text-sm font-medium">
                          The RapCaviar Podcast
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3 flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-600 rounded"></div>
                      <div>
                        <div className="text-sm font-medium">
                          The Bill Simmons Podcast
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3 flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-400 rounded"></div>
                      <div>
                        <div className="text-sm font-medium">Alex's Sun</div>
                      </div>
                    </div>
                  </div>

                  {/* Jump back in section */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-4">Jump back in</h3>
                    <div className="grid grid-cols-5 gap-3">
                      <div className="bg-gray-800 rounded-lg p-3">
                        <div className="w-full h-20 bg-gray-600 rounded mb-2"></div>
                        <div className="text-sm font-medium">
                          Today's Top Hits
                        </div>
                        <div className="text-xs text-gray-400">
                          Taylor Swift's on top of the Hottest 50!
                        </div>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-3">
                        <div className="w-full h-20 bg-orange-500 rounded mb-2"></div>
                        <div className="text-sm font-medium">RapCaviar</div>
                        <div className="text-xs text-gray-400">
                          Music from Kendrick Lamar, Drake, Future a...
                        </div>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-3">
                        <div className="w-full h-20 bg-gradient-to-br from-pink-400 to-blue-500 rounded mb-2"></div>
                        <div className="text-sm font-medium">
                          Discover Weekly
                        </div>
                        <div className="text-xs text-gray-400">
                          Your weekly mixtape of fresh music. Enjoy ne...
                        </div>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-3">
                        <div className="w-full h-20 bg-green-400 rounded mb-2"></div>
                        <div className="text-sm font-medium">Viral Hits</div>
                        <div className="text-xs text-gray-400">
                          Viral, trending and taking off.
                        </div>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-3">
                        <div className="w-full h-20 bg-red-600 rounded mb-2"></div>
                        <div className="text-sm font-medium">
                          The RapCaviar Podcast
                        </div>
                        <div className="text-xs text-gray-400">
                          Spotify Studios
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* More of what you like section */}
                  <div>
                    <h3 className="text-xl font-bold mb-4">
                      More of what you like
                    </h3>
                    <div className="grid grid-cols-5 gap-3">
                      <div className="bg-gray-800 rounded-lg p-3">
                        <div className="w-full h-20 bg-purple-600 rounded mb-2"></div>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-3">
                        <div className="w-full h-20 bg-gray-700 rounded mb-2 flex items-center justify-center">
                          <span className="text-xs">Work from Home</span>
                        </div>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-3">
                        <div className="w-full h-20 bg-red-400 rounded mb-2"></div>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-3">
                        <div className="w-full h-20 bg-yellow-400 rounded mb-2 flex items-center justify-center">
                          <span className="text-xs text-black font-bold">
                            Wake Up Happy
                          </span>
                        </div>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-3">
                        <div className="w-full h-20 bg-green-600 rounded mb-2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom player */}
              <div className="bg-gray-900 p-3 flex items-center justify-between border-t border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-500 rounded"></div>
                  <div>
                    <div className="text-sm text-white">Sicko</div>
                    <div className="text-xs text-gray-400">Travis Scott</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <SkipBack className="w-5 h-5 text-gray-400" />
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <Play className="w-4 h-4 text-black" />
                  </div>
                  <SkipForward className="w-5 h-5 text-gray-400" />
                </div>

                <div className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-gray-400" />
                  <div className="w-20 h-1 bg-gray-600 rounded">
                    <div className="w-1/2 h-full bg-white rounded"></div>
                  </div>
                  <Maximize2 className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallApp;
