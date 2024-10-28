import React, { useState } from "react";
import { ExhibitionProps } from "../../types/artwork";
import SaveExhibition from "../SaveExhibition/SaveExhibition";
import styles from "./Exhibition.module.css";

const Exhibition: React.FC<ExhibitionProps> = ({
  artworks,
  onRemoveArtwork,
  onViewArtwork,
}) => {
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  if (artworks.length === 0) {
    return <p>Your exhibition is empty. Add some artworks to get started!</p>;
  }

  return (
    <div className={styles.exhibition}>
      <div className={styles.exhibitionHeader}>
        <h2 className={styles.title}>Your Curated Exhibition</h2>
        <button
          className={styles.saveButton}
          onClick={() => setIsSaveModalOpen(true)}
        >
          Save Exhibition
        </button>
      </div>

      <div className={styles.exhibitionGrid}>
        {artworks.map((artwork) => (
          <div key={artwork.id} className={styles.exhibitionItem}>
            <img
              className={styles.exhibitionImage}
              src={
                artwork.imageUrl ||
                "../../../public/istockphoto-1147544807-612x612.jpg"
              }
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

      {isSaveModalOpen && (
        <SaveExhibition
          artworks={artworks}
          onSuccess={() => {
            setIsSaveModalOpen(false);
            // You might want to show a success message or redirect
          }}
          onCancel={() => setIsSaveModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Exhibition;
