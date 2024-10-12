import React, { useState } from "react";
import SearchForm from "./components/SearchForm";
import ArtworkList from "./components/ArtworkList";
import Exhibition from "./components/Exhibition";
import { Artwork } from "./types/artwork";
import "./App.css";

const App: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Artwork[]>([]);
  const [exhibition, setExhibition] = useState<Artwork[]>([]);

  const handleSearch = (results: Artwork[]) => {
    setSearchResults(results);
  };

  const addToExhibition = (artwork: Artwork) => {
    setExhibition((prev) => [...prev, artwork]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Muse</h1>
        <h2>Virtual Exhibition Curator</h2>
        <SearchForm onSearch={handleSearch} />
      </header>
      <main>
        <ArtworkList
          artworks={searchResults}
          onAddToExhibition={addToExhibition}
        />
        <Exhibition artworks={exhibition} />
      </main>
    </div>
  );
};

export default App;
