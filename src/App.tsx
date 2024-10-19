import React, { useState } from "react";
import SearchForm from "./components/SearchForm";
import ArtworkList from "./components/ArtworkList";
import ArtworkDetails from "./components/ArtworkDetails";
import Exhibition from "./components/Exhibition";
import { Artwork, SearchResult } from "./types/artwork";
import "./App.css";

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
    <div className="App">
      <header className="App-header">
        <h1>Muse</h1>
        <h2>Virtual Exhibition Curator</h2>
        <SearchForm onSearch={handleSearch} />
      </header>
      <main>
        <section className="search-results">
          {searchResults.totalResults > 0 && (
            <p>Found {searchResults.totalResults} artworks</p>
          )}
          <ArtworkList
            artworks={searchResults.artworks}
            onArtworkSelect={handleArtworkSelect}
            onAddToExhibition={handleAddToExhibition}
          />
        </section>
        <section className="exhibition-section">
          <Exhibition
            artworks={exhibition}
            onRemoveArtwork={handleRemoveFromExhibition}
            onViewArtwork={handleArtworkSelect}
          />
        </section>
      </main>
      {selectedArtwork && (
        <aside className="artwork-details-modal">
          <ArtworkDetails
            artwork={selectedArtwork}
            onClose={handleCloseDetails}
            onAddToExhibition={handleAddToExhibition}
          />
        </aside>
      )}
    </div>
  );
};

export default App;
