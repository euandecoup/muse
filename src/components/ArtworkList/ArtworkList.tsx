import React, { useState, useEffect } from "react";
import { ArtworkListProps } from "../../types/artwork";
import Pagination from "../Pagination/Pagination";
import styles from "./ArtworkList.module.css";

const ITEMS_PER_PAGE = 6;

const ArtworkList: React.FC<ArtworkListProps> = ({
  artworks,
  onArtworkSelect,
  onAddToExhibition,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [artworks]);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentArtworks = artworks.slice(indexOfFirstItem, indexOfLastItem);

  if (artworks.length === 0) {
    return (
      <div className={styles.noResults}>
        No artworks found. Try a different search term.
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.artworkList}>
        {currentArtworks.map((artwork) => (
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
                src={
                  artwork.imageUrl ||
                  "../../../public/istockphoto-1147544807-612x612.jpg"
                }
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

      <Pagination
        currentPage={currentPage}
        totalItems={artworks.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ArtworkList;
