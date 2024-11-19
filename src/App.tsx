import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";

// Components
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import GuestOption from "./components/GuestOption/GuestOption";
import Navigation from "./components/Navigation/Navigation";
import AuthenticatedRoute from "./components/Routes/AuthenticatedRoute";

// Pages
import HomePage from "./components/Pages/HomePage/HomePage";
import GuestHomePage from "./components/Pages/GuestHomePage/GuestHomePage";
import Profile from "./components/Pages/Profile/Profile";
import Settings from "./components/Pages/Settings/Settings";
import MyExhibitions from "./components/Pages/MyExhibitions/MyExhibitions";
import ExhibitionView from "./components/Pages/ExhibitionView/ExhibitionView";
import ExhibitionEdit from "./components/Pages/ExhibitionEdit/ExhibitionEdit";

// Types
import { Artwork, SearchResult } from "./types/artwork";

// Styles
import styles from "./App.module.css";

const App: React.FC = () => {
  const { user, loading, isGuest, exitGuestMode } = useAuth();
  const [searchResults, setSearchResults] = useState<SearchResult>({
    artworks: [],
    totalResults: 0,
  });
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [exhibition, setExhibition] = useState<Artwork[]>([]);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  if (loading) {
    return <div className={styles.loadingSpinner}>Loading...</div>;
  }

  const handleLogout = () => {
    signOut(auth);
  };

  const handleSearch = (results: SearchResult) => {
    setSearchResults(results);
    setSelectedArtwork(null);
  };

  const handleArtworkSelect = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
  };

  const handleCloseDetails = () => {
    setSelectedArtwork(null);
  };

  const handleAddToExhibition = (artwork: Artwork) => {
    if (!exhibition.some((item) => item.id === artwork.id)) {
      setExhibition((prevExhibition) => [...prevExhibition, artwork]);
    }
  };

  const handleRemoveFromExhibition = (artworkId: string) => {
    setExhibition((prevExhibition) =>
      prevExhibition.filter((item) => item.id !== artworkId)
    );
  };

  const renderAuthOptions = () => (
    <div className={styles.authContainer}>
      <div className={styles.authTabs}>
        <button
          className={`${styles.authTab} ${
            authMode === "login" ? styles.active : ""
          }`}
          onClick={() => setAuthMode("login")}
        >
          Login
        </button>
        <button
          className={`${styles.authTab} ${
            authMode === "signup" ? styles.active : ""
          }`}
          onClick={() => setAuthMode("signup")}
        >
          Sign Up
        </button>
      </div>

      {authMode === "login" ? <Login /> : <SignUp />}

      <div className={styles.divider}>
        <span>or</span>
      </div>
      <GuestOption />
    </div>
  );

  const commonProps = {
    searchResults,
    selectedArtwork,
    exhibition,
    onSearch: handleSearch,
    onArtworkSelect: handleArtworkSelect,
    onCloseDetails: handleCloseDetails,
    onAddToExhibition: handleAddToExhibition,
    onRemoveFromExhibition: handleRemoveFromExhibition,
  };

  return (
    <BrowserRouter>
      <div className={styles.app}>
        {!user && !isGuest ? (
          renderAuthOptions()
        ) : (
          <>
            {user && <Navigation onLogout={handleLogout} />}
            <Routes>
              <Route
                path="/"
                element={
                  isGuest ? (
                    <GuestHomePage
                      {...commonProps}
                      onExitGuestMode={exitGuestMode}
                    />
                  ) : (
                    <HomePage {...commonProps} />
                  )
                }
              />
              <Route
                path="/exhibitions"
                element={
                  <AuthenticatedRoute>
                    <MyExhibitions />
                  </AuthenticatedRoute>
                }
              />
              <Route path="/exhibition/:id" element={<ExhibitionView />} />
              <Route
                path="/exhibition/:id/edit"
                element={
                  <AuthenticatedRoute>
                    <ExhibitionEdit />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <AuthenticatedRoute>
                    <Profile />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <AuthenticatedRoute>
                    <Settings />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/search"
                element={
                  isGuest ? (
                    <GuestHomePage
                      {...commonProps}
                      onExitGuestMode={exitGuestMode}
                    />
                  ) : (
                    <HomePage {...commonProps} />
                  )
                }
              />
            </Routes>
          </>
        )}
      </div>
    </BrowserRouter>
  );
};

const AppWithAuth: React.FC = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

export default AppWithAuth;
