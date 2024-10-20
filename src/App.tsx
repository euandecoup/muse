import React, { useState } from "react";
import SearchForm from "./components/SearchForm";
import ArtworkList from "./components/ArtworkList";
import ArtworkDetails from "./components/ArtworkDetails";
import Exhibition from "./components/Exhibition";
import { Artwork, SearchResult } from "./types/artwork";
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
