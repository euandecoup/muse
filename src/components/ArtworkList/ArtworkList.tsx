import React, { useState, useEffect } from "react";
import { ArtworkListProps } from "../../types/artwork";
import Pagination from "../Pagination/Pagination";
import styles from "./ArtworkList.module.css";

const ArtworkList: React.FC<ArtworkListProps> = ({
  artworks,
  onArtworkSelect,
  onAddToExhibition,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    setCurrentPage(1);
  }, [artworks]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
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
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
      />
    </div>
  );
};

export default ArtworkList;
