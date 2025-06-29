import React, { useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../src/redux/store";
import SpotifyFooter from "./components/Footer";
import SpotifyNavbar from "./components/Navbar";
import SpotifySidebar from "./components/Sidebar";
import ProfileDetail from "./components/ProfileDetail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlaylistDetail from "./components/PlaylistDetail";
import SongCard from "./components/SongCard";
import MusicPlayerInterface from "./components/MusicPlayerInterface";
import ExplorePremium from "./components/ExplorePremium";
import InstallApp from "./components/InstallApp";
import Notification from "./components/Notification";
import Browse from "./components/Browse";

// import Login from "./components/Login";

export default function App() {
  const [sidebarState, setSidebarState] = useState("normal"); // 'normal', 'expanded', 'shrunk'

  // Get sidebar width based on state
  const getSidebarWidth = () => {
    switch (sidebarState) {
      case "shrunk":
        return 64; // 16 * 4 (w-16 in pixels)
      case "expanded":
        return 0; // Full screen, no offset needed
      default:
        return 320; // 80 * 4 (w-80 in pixels)
    }
  };

  // Get margin left for content based on sidebar state
  const getContentMargin = () => {
    switch (sidebarState) {
      case "shrunk":
        return "ml-16"; // 4rem
      case "expanded":
        return ""; // No margin when expanded (sidebar covers everything)
      default:
        return "ml-80"; // 20rem
    }
  };

  // Get sidebar positioning classes
  const getSidebarClasses = () => {
    switch (sidebarState) {
      case "shrunk":
        return "fixed top-16 left-0 h-[calc(100vh-4rem)] w-16 bg-black z-40";
      case "expanded":
        return ""; // Handled within component
      default:
        return "fixed top-16 left-0 h-[calc(100vh-4rem)] w-80 bg-black z-40";
    }
  };

  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <Router>
          {/* <Login /> */}
          <div className="min-h-screen bg-gray-100">
            {/* Fixed Navbar */}
            <div className="fixed top-0 left-0 right-0 z-50">
              <SpotifyNavbar />
            </div>

            <div className="flex pt-16">
              {/* Sidebar with dynamic positioning */}
              <div
                className={
                  sidebarState === "expanded" ? "" : getSidebarClasses()
                }
              >
                <SpotifySidebar
                  sidebarState={sidebarState}
                  setSidebarState={setSidebarState}
                />
              </div>

              {/* Scrollable Content with dynamic margin */}
              {sidebarState !== "expanded" && (
                <div
                  className={`${getContentMargin()} flex-1 h-[calc(100vh-4rem)] overflow-y-auto transition-all duration-300`}
                >
                  <Routes>
                    <Route path="/" element={<MusicPlayerInterface />} />
                    <Route path="/profile" element={<ProfileDetail />} />
                    <Route path="/playlist/:id" element={<PlaylistDetail />} />
                    <Route path="/songdetail/:id" element={<SongCard />} />
                    <Route path="/premium" element={<ExplorePremium />} />
                    <Route path="/install" element={<InstallApp />} />
                    <Route path="/notification" element={<Notification />} />
                    <Route path="/search" element={<Browse />} />
                  </Routes>
                  <SpotifyFooter />
                </div>
              )}
            </div>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}
