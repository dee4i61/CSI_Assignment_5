import React, { useState } from "react";

const MusicStreamingUI = () => {
  const [currentView, setCurrentView] = useState("browse");
  const [selectedCategory, setSelectedCategory] = useState("Music");

  const categoryTiles = [
    { name: "Wicked Official Playlist", color: "bg-green-500", image: "🎭" },
    { name: "Punk", color: "bg-red-500", image: "🎸" },
    { name: "Ambient Essentials", color: "bg-green-600", image: "🌊" },
    { name: "Got Blues", color: "bg-blue-600", image: "🎺" },
    { name: "Cooking & Dining", color: "bg-orange-500", image: "🍽️" },
    { name: "Alternative", color: "bg-red-600", image: "🎤" },
    { name: "Wellness", color: "bg-green-700", image: "🧘" },
    { name: "Travel", color: "bg-blue-500", image: "✈️" },
    { name: "Caribbean", color: "bg-blue-400", image: "🏝️" },
    { name: "Afro", color: "bg-red-800", image: "🥁" },
    { name: "Songwriters", color: "bg-red-900", image: "✍️" },
    { name: "Nature & Noise", color: "bg-gray-500", image: "🌿" },
    { name: "Funk & Disco", color: "bg-purple-600", image: "🕺" },
    { name: "Netflix", color: "bg-red-600", image: "📺" },
    {
      name: "Asian Pacific Islander Heritage Month",
      color: "bg-blue-700",
      image: "🌸",
    },
    { name: "GLOW", color: "bg-blue-400", image: "✨" },
  ];

  const browsingCategories = [
    { name: "Music", color: "bg-pink-500", image: "🎵" },
    { name: "Podcasts", color: "bg-teal-600", image: "🎧" },
    { name: "Live Events", color: "bg-purple-600", image: "🎤" },
  ];

  const browseSections = [
    { name: "Made For You", color: "bg-blue-800", image: "👤" },
    { name: "New Releases", color: "bg-green-600", image: "🆕" },
    { name: "Rain & Monsoon", color: "bg-teal-700", image: "🌧️" },
    { name: "Hindi", color: "bg-pink-600", image: "🇮🇳" },
    { name: "Tamil", color: "bg-orange-600", image: "🎶" },
    { name: "Punjabi", color: "bg-purple-700", image: "🎵" },
    { name: "Rock & Metal", color: "bg-blue-900", image: "🤘" },
    { name: "Romance", color: "bg-purple-500", image: "💕" },
  ];

  const CategoryTile = ({ category, isLarge = false, onClick }) => (
    <div
      className={`${
        category.color
      } rounded-lg p-4 relative overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200 ${
        isLarge ? "h-32" : "h-32"
      }`}
      onClick={() => onClick(category.name)}
    >
      <h3 className="text-white font-bold text-2xl mb-2 leading-tight">
        {category.name}
      </h3>
      <div className="absolute bottom-2 right-2 text-6xl opacity-80">
        {category.image}
      </div>
    </div>
  );

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setCurrentView("category");
  };

  const BrowseView = () => (
    <div className="bg-black text-white min-h-screen p-6">
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Start browsing</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {browsingCategories.map((category, index) => (
            <CategoryTile
              key={index}
              category={category}
              isLarge={true}
              onClick={handleCategoryClick}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Browse all</h2>
        <div className="grid grid-cols-4 md:grid-cols-4 gap-8">
          {browseSections.map((category, index) => (
            <CategoryTile
              key={index}
              category={category}
              onClick={handleCategoryClick}
            />
          ))}
        </div>
      </div>
      <div className="mb-12 mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {categoryTiles.map((category, index) => (
            <CategoryTile
              key={index}
              category={category}
              onClick={handleCategoryClick}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const CategoryView = () => (
    <div className="bg-black text-white min-h-screen">
      {/* Header with gradient */}
      <div className="bg-gradient-to-b from-pink-600 to-black pt-16 pb-8 px-6">
        <button
          onClick={() => setCurrentView("browse")}
          className="text-white mb-8"
        >
          ←
        </button>
        <h1 className="text-6xl font-bold mb-8">{selectedCategory}</h1>
      </div>

      <div className="px-6 pb-8">
        {/* Discover new music */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Discover new music</h2>
          <div className="max-w-sm">
            <div className="cursor-pointer">
              <div className="bg-gradient-to-br from-gray-700 to-black h-48 rounded-lg mb-3 relative overflow-hidden">
                <div className="absolute bottom-4 left-4">
                  <div className="bg-white text-black text-xs font-bold px-2 py-1 rounded mb-2">
                    NEW MUSIC FRIDAY
                  </div>
                  <div className="text-white font-bold text-lg">INDIA</div>
                </div>
              </div>
              <h3 className="font-bold text-white mb-1">
                New Music Friday India
              </h3>
              <p className="text-gray-400 text-sm">Handpicked fresh new...</p>
            </div>
          </div>
        </div>

        {/* Playlists from our Editors */}
        <div className="mb-12 mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Playlists from our Editors</h2>
            <button className="text-gray-400 hover:text-white text-sm">
              Show all
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                name: "Hot Hits Hindi",
                subtitle:
                  "Hottest Hindi music that India is listening to. Cover ...",
                tag: "HOT HITS",
                color: "bg-gradient-to-br from-orange-600 to-red-600",
              },
              {
                name: "Trending Now Malayalam",
                subtitle: "Every song that's Trending NOW from Malayalam!...",
                tag: "Trending Now Malayalam",
                color: "bg-gradient-to-br from-green-600 to-teal-600",
              },
              {
                name: "Hot Hits Punjabi",
                subtitle: "Catch the hottest Punjabi tracks. Cover - Shubh",
                tag: "HOT HITS",
                color: "bg-gradient-to-br from-yellow-600 to-orange-600",
              },
              {
                name: "Hot Hits Telugu",
                subtitle:
                  "Tune in to the Hottest Tracks of Tollywood! Cover :...",
                tag: "HOT HITS TELUGU",
                color: "bg-gradient-to-br from-purple-600 to-pink-600",
              },
              {
                name: "Trending Now Punjabi",
                subtitle: "All that's viral, stream now! Cover - Jordan Sandhu",
                tag: "Trending Now Punjabi",
                color: "bg-gradient-to-br from-blue-600 to-cyan-600",
              },
            ].map((playlist, index) => (
              <div key={index} className="cursor-pointer group">
                <div
                  className={`${playlist.color} h-48 rounded-lg mb-3 relative overflow-hidden flex items-center justify-center`}
                >
                  <div className="absolute top-3 left-3 right-3">
                    <div className="bg-white text-black text-xs font-bold px-2 py-1 rounded mb-2 inline-block">
                      {playlist.tag}
                    </div>
                  </div>
                  <div className="text-4xl">🎵</div>
                </div>
                <h3 className="font-bold text-white mb-1">{playlist.name}</h3>
                <p className="text-gray-400 text-sm">{playlist.subtitle}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Browse all categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Browse all</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Made For You", color: "bg-blue-800", image: "👤" },
              { name: "New Releases", color: "bg-green-600", image: "🆕" },
              { name: "Summer", color: "bg-teal-600", image: "☀️" },
              { name: "Hindi", color: "bg-pink-600", image: "🇮🇳" },
            ].map((category, index) => (
              <div
                key={index}
                className={`${category.color} rounded-lg p-4 h-32 relative cursor-pointer hover:scale-105 transition-transform`}
              >
                <h3 className="text-white font-bold text-xl">
                  {category.name}
                </h3>
                <div className="absolute bottom-2 right-2 text-4xl opacity-80">
                  {category.image}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Uniquely yours */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Uniquely yours</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
            <div className="cursor-pointer">
              <div className="bg-gradient-to-br from-yellow-400 to-blue-600 h-48 rounded-lg mb-3 flex items-center justify-center">
                <div className="text-white text-3xl font-bold">daylist</div>
              </div>
              <h3 className="font-bold text-white mb-1">daylist</h3>
              <p className="text-gray-400 text-sm">Your day in a playlist.</p>
            </div>
            <div className="cursor-pointer">
              <div className="bg-gradient-to-br from-blue-800 to-purple-600 h-48 rounded-lg mb-3 flex items-center justify-center relative">
                <div className="text-pink-500 text-6xl">∞</div>
                <div className="absolute bottom-4 left-4 text-white font-bold">
                  On
                  <br />
                  Repeat
                </div>
              </div>
              <h3 className="font-bold text-white mb-1">On Repeat</h3>
              <p className="text-gray-400 text-sm">Songs you love right now</p>
            </div>
          </div>
        </div>

        {/* Hand-picked new releases */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Hand-picked new releases</h2>
            <button className="text-gray-400 hover:text-white text-sm">
              Show all
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                name: "New Album",
                artist: "Various Artists",
                color: "bg-gray-700",
              },
              {
                name: "Latest Hits",
                artist: "Top Artists",
                color: "bg-yellow-600",
              },
              {
                name: "Fresh Tracks",
                artist: "Emerging Artists",
                color: "bg-blue-600",
              },
              {
                name: "New Sounds",
                artist: "Indie Artists",
                color: "bg-green-600",
              },
              { name: "Leon", artist: "Leon Bridges", color: "bg-orange-600" },
            ].map((release, index) => (
              <div key={index} className="cursor-pointer group">
                <div className={`${release.color} h-48 rounded-lg mb-3`}></div>
                <h3 className="font-bold text-white mb-1">{release.name}</h3>
                <p className="text-gray-400 text-sm">{release.artist}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Charts */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured Charts</h2>
            <button className="text-gray-400 hover:text-white text-sm">
              Show all
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                title: "Top Songs - Global",
                subtitle:
                  "Your weekly update of the most played tracks right...",
                color: "bg-purple-700",
              },
              {
                title: "Top Songs - India",
                subtitle:
                  "Your weekly update of the most played tracks right...",
                color: "bg-red-600",
              },
              {
                title: "Top 50 - Global",
                subtitle:
                  "Your daily update of the most played tracks right...",
                color: "bg-blue-700",
              },
              {
                title: "Top 50 - India",
                subtitle:
                  "Your daily update of the most played tracks right...",
                color: "bg-green-700",
              },
              {
                title: "Viral 50 - Global",
                subtitle:
                  "Your daily update of the most viral tracks right now...",
                color: "bg-green-600",
              },
            ].map((chart, index) => (
              <div key={index} className="cursor-pointer group">
                <div
                  className={`${chart.color} h-48 rounded-lg mb-3 flex items-center justify-center relative`}
                >
                  <div className="text-white text-2xl font-bold text-center p-4">
                    {chart.title.includes("Top Songs") && "🎵"}
                    {chart.title.includes("Top 50") && "📊"}
                    {chart.title.includes("Viral") && "🔥"}
                  </div>
                </div>
                <h3 className="font-bold text-white mb-1">{chart.title}</h3>
                <p className="text-gray-400 text-sm">{chart.subtitle}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Popular EQUAL playlists */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Popular EQUAL playlists</h2>
            <button className="text-gray-400 hover:text-white text-sm">
              Show all
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                name: "EQUAL India",
                image: "🇮🇳",
                color: "bg-gradient-to-br from-red-600 to-orange-600",
              },
              {
                name: "EQUAL Global",
                image: "🌍",
                color: "bg-gradient-to-br from-blue-600 to-purple-600",
              },
              {
                name: "EQUAL Pop",
                image: "🎤",
                color: "bg-gradient-to-br from-pink-600 to-red-600",
              },
              {
                name: "EQUAL Hip-Hop",
                image: "🎧",
                color: "bg-gradient-to-br from-purple-600 to-black",
              },
              {
                name: "EQUAL Alternative",
                image: "🎸",
                color: "bg-gradient-to-br from-gray-600 to-black",
              },
            ].map((playlist, index) => (
              <div key={index} className="cursor-pointer group">
                <div
                  className={`${playlist.color} h-48 rounded-lg mb-3 flex items-center justify-center`}
                >
                  <div className="text-6xl">{playlist.image}</div>
                </div>
                <h3 className="font-bold text-white mb-1">{playlist.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* EQUAL Playlists Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured Playlists</h2>
            <button className="text-gray-400 hover:text-white text-sm">
              Show all
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                title: "EQUAL India",
                subtitle: "Listen to women at full volume. Cover - Neeti...",
                bg: "bg-gradient-to-br from-red-600 to-black",
                tag: "EQUAL",
              },
              {
                title: "Women of Punjabi Pop",
                subtitle: "Catch the queens of Punjabi Pop. Cover: Sunanda...",
                bg: "bg-gradient-to-br from-green-600 to-black",
                tag: "WOMEN OF PUNJABI POP",
              },
              {
                title: "EQUAL",
                subtitle: "Listen to Women at Full Volume. Cover: AURORA",
                bg: "bg-gradient-to-br from-red-600 to-black",
                tag: "EQUAL",
              },
              {
                title: "Created by Women",
                subtitle: "Songs that are 100% written, produced, and...",
                bg: "bg-gradient-to-br from-green-600 to-black",
                tag: "CREATED BY WOMEN",
              },
              {
                title: "Women of Anime",
                subtitle:
                  "Celebrate the great female artists from anime culture!",
                bg: "bg-gradient-to-br from-green-600 to-black",
                tag: "WOMEN OF ANIME",
              },
            ].map((playlist, index) => (
              <div key={index} className="cursor-pointer group">
                <div
                  className={`${playlist.bg} h-48 rounded-lg mb-3 relative overflow-hidden`}
                >
                  <div className="absolute top-3 left-3">
                    <div className="bg-green-500 text-black text-xs font-bold px-2 py-1 rounded">
                      {playlist.tag}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-10 transition-all"></div>
                </div>
                <h3 className="font-bold text-white mb-1">{playlist.title}</h3>
                <p className="text-gray-400 text-sm">{playlist.subtitle}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Your Artist Mixes */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Your Artist Mixes</h2>
            <button className="text-gray-400 hover:text-white text-sm">
              Show all
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                name: "VIBIE Mix",
                artists: "Kanishk Seth, Atif Aslam and Silent Ocean",
                image: "👨‍🎤",
                color: "bg-gradient-to-br from-orange-500 to-pink-600",
              },
              {
                name: "Rohit Sonawane Mix",
                artists: "Udit Narayan, Silent Ocean and Atif Aslam",
                image: "🎤",
                color: "bg-gradient-to-br from-green-600 to-blue-700",
              },
              {
                name: "Kishore Kumar Mix",
                artists: "Mukesh, Hemant Kumar and Manna Dey",
                image: "🎵",
                color: "bg-gradient-to-br from-gray-600 to-black",
              },
              {
                name: "Sonu Nigam Mix",
                artists: "Asha Bhosle, Ajay-Atul and Falguni Pathak",
                image: "🎙️",
                color: "bg-gradient-to-br from-purple-600 to-pink-600",
              },
              {
                name: "Kritiman Mishra Mix",
                artists: "Kanishk Seth, Atif Aslam and Shashwat Sachdev",
                image: "🎶",
                color: "bg-gradient-to-br from-red-600 to-orange-600",
              },
            ].map((mix, index) => (
              <div key={index} className="cursor-pointer group">
                <div
                  className={`${mix.color} h-48 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden`}
                >
                  <div className="text-6xl">{mix.image}</div>
                  <div className="absolute bottom-3 left-3">
                    <div className="bg-green-500 text-black text-xs font-bold px-2 py-1 rounded">
                      {mix.name}
                    </div>
                  </div>
                </div>
                <h3 className="font-bold text-white mb-1">{mix.name}</h3>
                <p className="text-gray-400 text-sm">{mix.artists}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return currentView === "browse" ? <BrowseView /> : <CategoryView />;
};

export default MusicStreamingUI;
