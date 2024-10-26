import React from "react";
import { ArtworkListProps } from "../../types/artwork";
import styles from "../ArtworkList.module.css";

const ArtworkList: React.FC<ArtworkListProps> = ({
  artworks,
  onArtworkSelect,
  onAddToExhibition,
}) => {
  if (artworks.length === 0) {
    return <p>No artworks found. Try a different search term.</p>;
  }

  return (
    <div className={styles.artworkList}>
      {artworks.map((artwork) => (
        <div
          key={artwork.id}
          className={styles.artworkItem}
          onClick={() => onArtworkSelect(artwork)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onArtworkSelect(artwork);
            }
          }}
        >
          <div className={styles.imageContainer}>
            <img
              src={artwork.imageUrl || "/path/to/placeholder-image.jpg"}
              alt={artwork.title}
              className={styles.artworkImage}
            />
          </div>
          <div className={styles.artworkInfo}>
            <h3 className={styles.artworkTitle}>{artwork.title}</h3>
            <p className={styles.artworkArtist}>{artwork.artist}</p>
            <p>{artwork.date}</p>
            <p>{artwork.source}</p>
          </div>
          <button
            className={styles.addButton}
            onClick={(e) => {
              e.stopPropagation();
              onAddToExhibition(artwork);
            }}
          >
            Add to Exhibition
          </button>
        </div>
      ))}
    </div>
  );
};

export default ArtworkList;
