import React from "react";
import SearchForm from "../../SeachForm/SearchForm";
import ArtworkList from "../../ArtworkList/ArtworkList";
import Exhibition from "../../Exhibition/Exhibition";
import ArtworkDetails from "../../ArtworkDetails/ArtworkDetails";
import { Artwork, SearchResult } from "../../../types/artwork";
import styles from "./HomePage.module.css";

interface HomePageProps {
  searchResults: SearchResult;
  selectedArtwork: Artwork | null;
  exhibition: Artwork[];
  onSearch: (results: SearchResult) => void;
  onArtworkSelect: (artwork: Artwork) => void;
  onCloseDetails: () => void;
  onAddToExhibition: (artwork: Artwork) => void;
  onRemoveFromExhibition: (artworkId: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({
  searchResults,
  selectedArtwork,
  exhibition,
  onSearch,
  onArtworkSelect,
  onCloseDetails,
  onAddToExhibition,
  onRemoveFromExhibition,
}) => (
  <>
    <header className={styles.header}>
      <h1>Muse</h1>
      <h2>Virtual Exhibition Curator</h2>
      <SearchForm onSearch={onSearch} />
    </header>
    <main className={styles.main}>
      <section className={styles.searchResults}>
        {searchResults.totalResults > 0 && (
          <p>Found {searchResults.totalResults} artworks</p>
        )}
        <ArtworkList
          artworks={searchResults.artworks}
          onArtworkSelect={onArtworkSelect}
          onAddToExhibition={onAddToExhibition}
        />
      </section>
      <section className={styles.exhibitionSection}>
        <Exhibition
          artworks={exhibition}
          onRemoveArtwork={onRemoveFromExhibition}
          onViewArtwork={onArtworkSelect}
        />
      </section>
    </main>
    {selectedArtwork && (
      <aside className={styles.artworkDetailsModal}>
        <div className={styles.artworkDetailsContent}>
          <button className={styles.closeButton} onClick={onCloseDetails}>
            Close
          </button>
          <ArtworkDetails
            artwork={selectedArtwork}
            onClose={onCloseDetails}
            onAddToExhibition={onAddToExhibition}
          />
        </div>
      </aside>
    )}
  </>
);

export default HomePage;
