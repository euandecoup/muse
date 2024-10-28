import React from "react";
import { Link } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import { Artwork, SearchResult } from "../../../types/artwork";
import styles from "./GuestHomePage.module.css";

interface GuestHomePageProps {
  searchResults: SearchResult;
  selectedArtwork: Artwork | null;
  exhibition: Artwork[];
  onSearch: (results: SearchResult) => void;
  onArtworkSelect: (artwork: Artwork) => void;
  onCloseDetails: () => void;
  onAddToExhibition: (artwork: Artwork) => void;
  onRemoveFromExhibition: (artworkId: string) => void;
  onExitGuestMode: () => void;
}

const GuestHomePage: React.FC<GuestHomePageProps> = ({
  onExitGuestMode,
  ...homePageProps
}) => (
  <div className={styles.guestContainer}>
    <div className={styles.guestBanner}>
      You're browsing as a guest. Sign up to save your curated exhibitions.
      <button className={styles.exitGuestButton} onClick={onExitGuestMode}>
        Exit Guest Mode
      </button>
    </div>
    <HomePage {...homePageProps} />
  </div>
);

export default GuestHomePage;
