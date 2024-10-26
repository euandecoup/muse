import React, { useState } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import GuestOption from "./components/GuestOption/GuestOption";
import SearchForm from "./components/SeachForm/SearchForm";
import ArtworkList from "./components/ArtworkList/ArtworkList";
import ArtworkDetails from "./components/ArtworkDetails/ArtworkDetails";
import Exhibition from "./components/Exhibition/Exhibition";
import { Artwork, SearchResult } from "./types/artwork";
import { Home, Image, User, Settings, Search } from "lucide-react";
import styles from "./App.module.css";

const App: React.FC = () => {
  const { user, loading, isGuest, exitGuestMode } = useAuth();
  const [searchResults, setSearchResults] = useState<SearchResult>({
    artworks: [],
    totalResults: 0,
  });
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [exhibition, setExhibition] = useState<Artwork[]>([]);

  if (loading) {
    return <div className={styles.loadingSpinner}>Loading...</div>;
  }

  const handleLogout = () => {
    signOut(auth);
    exitGuestMode();
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
      <Login />
      <SignUp />
      <GuestOption />
    </div>
  );

  const renderNavigation = () => (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li>
          <a href="#home">
            <Home size={20} />
            <span className={styles.navText}>Home</span>
          </a>
        </li>
        <li>
          <a href="#exhibitions">
            <Image size={20} />
            <span className={styles.navText}>My Exhibitions</span>
          </a>
        </li>
        <li>
          <a href="#profile">
            <User size={20} />
            <span className={styles.navText}>My Profile</span>
          </a>
        </li>
        <li>
          <a href="#settings">
            <Settings size={20} />
            <span className={styles.navText}>Settings</span>
          </a>
        </li>
        <li>
          <a href="#search">
            <Search size={20} />
            <span className={styles.navText}>Search</span>
          </a>
        </li>
        <li>
          <button className={styles.logoutButton} onClick={handleLogout}>
            {isGuest ? "Exit Guest Mode" : "Logout"}
          </button>
        </li>
      </ul>
    </nav>
  );

  const renderGuestBanner = () => (
    <div className={styles.guestBanner}>
      You're browsing as a guest. <a href="\signup">Sign Up</a> to save your
      curated exhibitions.
    </div>
  );

  const renderMainContent = () => (
    <>
      <header className={styles.header}>
        <h1>Muse</h1>
        <h2>Virtual Exhibition Curator</h2>
        <SearchForm onSearch={handleSearch} />
      </header>
      <main className={styles.main}>
        <section className={styles.searchResults}>
          {searchResults.totalResults > 0 && (
            <p>Found {searchResults.totalResults} artworks</p>
          )}
          <ArtworkList
            artworks={searchResults.artworks}
            onArtworkSelect={handleArtworkSelect}
            onAddToExhibition={handleAddToExhibition}
          />
        </section>
        <section className={styles.exhibitionSection}>
          <Exhibition
            artworks={exhibition}
            onRemoveArtwork={handleRemoveFromExhibition}
            onViewArtwork={handleArtworkSelect}
          />
        </section>
      </main>
      {selectedArtwork && (
        <aside className={styles.artworkDetailsModal}>
          <div className={styles.artworkDetailsContent}>
            <button className={styles.closeButton} onClick={handleCloseDetails}>
              Close
            </button>
            <ArtworkDetails
              artwork={selectedArtwork}
              onClose={handleCloseDetails}
              onAddToExhibition={handleAddToExhibition}
            />
          </div>
        </aside>
      )}
    </>
  );

  return (
    <div className={styles.app}>
      {!user && !isGuest && renderAuthOptions()}
      {(user || isGuest) && (
        <>
          {renderNavigation()}
          {renderMainContent()}
          {isGuest && renderGuestBanner()}
        </>
      )}
    </div>
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
