import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ArtworkListProps } from "../../types/artwork";
import styles from "./ArtworkList.module.css";

const ArtworkList: React.FC<ArtworkListProps> = ({
  artworks,
  onArtworkSelect,
  onAddToExhibition,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    // Check initially
    checkIfMobile();

    // Add event listener
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const displayedArtworks =
    isMobile && !isExpanded ? artworks.slice(0, 3) : artworks;

  if (artworks.length === 0) {
    return <p>No artworks found. Try a different search term.</p>;
  }

  return (
    <div className={styles.container}>
      {artworks.length > 3 && isMobile && (
        <div className={styles.toggleButton}>
          <button onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? (
              <>
                <ChevronUp size={20} />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown size={20} />
                Show More ({artworks.length - 3} more)
              </>
            )}
          </button>
        </div>
      )}

      <div
        className={`${styles.artworkList} ${isExpanded ? styles.expanded : ""}`}
      >
        {displayedArtworks.map((artwork) => (
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
                src={artwork.imageUrl || "/istockphoto-1147544807-612x612.jpg"}
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
    </div>
  );
};

export default ArtworkList;
