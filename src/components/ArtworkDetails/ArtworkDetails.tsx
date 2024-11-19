import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X, Plus, ExternalLink } from "lucide-react";
import { ArtworkDetailsProps } from "../../types/artwork";
import styles from "./ArtworkDetails.module.css";

const ArtworkDetails: React.FC<ArtworkDetailsProps> = ({
  artwork,
  onClose,
  onAddToExhibition,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const addButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const handleClick = (e: MouseEvent) => {
      if (
        e.target instanceof Element &&
        e.target.className === styles.modalOverlay
      ) {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);
    document.addEventListener("click", handleClick);

    addButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("click", handleClick);
    };
  }, [onClose]);

  const handleAddToExhibition = () => {
    onAddToExhibition(artwork);
  };

  return createPortal(
    <div
      className={styles.modalOverlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="artwork-title"
    >
      <div ref={modalRef} className={styles.modalContent} tabIndex={-1}>
        <header className={styles.modalHeader}>
          <h2 id="artwork-title" className={styles.artworkTitle}>
            {artwork.title}
          </h2>
          <button
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </header>

        <div className={styles.imageContainer}>
          <img
            src={artwork.imageUrl || "/istockphoto-1147544807-612x612.jpg"}
            alt={artwork.title}
            className={styles.artworkImage}
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.src = "/istockphoto-1147544807-612x612.jpg";
              img.alt = "Artwork image unavailable";
            }}
          />
        </div>

        <div className={styles.artworkInfo}>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <h3>Artist</h3>
              <p>{artwork.artist}</p>
            </div>
            <div className={styles.infoItem}>
              <h3>Date</h3>
              <p>{artwork.date}</p>
            </div>
            <div className={styles.infoItem}>
              <h3>Culture</h3>
              <p>{artwork.culture || "Unknown"}</p>
            </div>
            <div className={styles.infoItem}>
              <h3>Medium</h3>
              <p>{artwork.medium || "Not specified"}</p>
            </div>
            {artwork.dimensions && (
              <div className={styles.infoItem}>
                <h3>Dimensions</h3>
                <p>{artwork.dimensions}</p>
              </div>
            )}
            <div className={styles.infoItem}>
              <h3>Source</h3>
              <p>{artwork.source}</p>
            </div>
          </div>

          <div className={styles.actions}>
            <button
              ref={addButtonRef}
              onClick={handleAddToExhibition}
              className={styles.addButton}
              aria-label="Add to exhibition"
            >
              <Plus size={20} />
              Add to Exhibition
            </button>

            <a
              href={artwork.moreInfoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.moreInfoLink}
            >
              <ExternalLink size={20} />
              View on {artwork.source}
            </a>
          </div>
        </div>

        {/* Keyboard trap for focus management */}
        <div tabIndex={0} onFocus={() => addButtonRef.current?.focus()} />
      </div>
    </div>,
    document.body
  );
};

export default ArtworkDetails;
