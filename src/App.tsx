import React, { useState } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import SearchForm from "./components/SearchForm";
import ArtworkList from "./components/ArtworkList";
import ArtworkDetails from "./components/ArtworkDetails";
import Exhibition from "./components/Exhibition";
import { Artwork, SearchResult } from "./types/artwork";
import { Home, Image, User, Settings, Search } from "lucide-react";
import styles from "./App.module.css";

const App: React.FC = () => {
  const [searchResults, setSearchResults] = useState<SearchResult>({
    artworks: [],
    totalResults: 0,
  });
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [exhibition, setExhibition] = useState<Artwork[]>([]);

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

  return (
    <div className={styles.app}>
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
        </ul>
      </nav>
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
    </div>
  );
};

export default App;
