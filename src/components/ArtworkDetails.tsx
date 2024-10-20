import React from "react";
import { ArtworkDetailsProps } from "../types/artwork";
import styles from "../ArtworkDetails.module.css";

const ArtworkDetails: React.FC<ArtworkDetailsProps> = ({
  artwork,
  onClose,
  onAddToExhibition,
}) => {
  return (
    <div className={styles.modal}>
      <div className={styles.artworkDetails}>
        <button onClick={onClose} className={styles.closeButton}>
          Close
        </button>
        <img
          src={artwork.imageUrl || "/path/to/placeholder-image.jpg"}
          alt={artwork.title}
          className={styles.artworkImage}
        />
        <h2 className={styles.artworkTitle}>{artwork.title}</h2>
        <p className={styles.detailedInfo}>
          <strong>Artist:</strong> {artwork.artist}
        </p>
        <p className={styles.detailedInfo}>
          <strong>Date:</strong> {artwork.date}
        </p>
        <p className={styles.detailedInfo}>
          <strong>Culture:</strong> {artwork.culture || "Unknown"}
        </p>
        <p className={styles.detailedInfo}>
          <strong>Medium:</strong> {artwork.medium || "Not specified"}
        </p>
        <p className={styles.detailedInfo}>
          <strong>Dimensions:</strong> {artwork.dimensions || "Not specified"}
        </p>
        <p className={styles.detailedInfo}>
          <strong>Source:</strong> {artwork.source}
        </p>
        <a
          className={styles.detailedInfo}
          href={artwork.moreInfoUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          More Information
        </a>
        <button
          className={styles.addButton}
          onClick={() => onAddToExhibition(artwork)}
        >
          Add to Exhibition
        </button>
      </div>
    </div>
  );
};

export default ArtworkDetails;
