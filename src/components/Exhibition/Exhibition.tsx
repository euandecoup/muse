import React from "react";
import { ExhibitionProps } from "../../types/artwork";
import styles from "../Exhibition.module.css";

const Exhibition: React.FC<ExhibitionProps> = ({
  artworks,
  onRemoveArtwork,
  onViewArtwork,
}) => {
  if (artworks.length === 0) {
    return <p>Your exhibition is empty. Add some artworks to get started!</p>;
  }

  return (
    <div className={styles.exhibition}>
      <h2 className={styles.title}>Your Curated Exhibition</h2>
      <div className={styles.exhibitionGrid}>
        {artworks.map((artwork) => (
          <div key={artwork.id} className={styles.exhibitionItem}>
            <img
              className={styles.exhibitionImage}
              src={artwork.imageUrl || "/path/to/placeholder-image.jpg"}
              alt={artwork.title}
              onClick={() => onViewArtwork(artwork)}
            />
            <div className={styles.info}>
              <h3 className={styles.artworkTitle}>{artwork.title}</h3>
              <p className={styles.artist}>{artwork.artist}</p>
            </div>
            <button
              className={styles.removeButton}
              onClick={() => onRemoveArtwork(artwork.id)}
            >
              Remove from Exhibition
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exhibition;
