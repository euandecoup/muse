import React from "react";
import { Artwork, ArtworkListProps } from "../types/artwork";

const ArtworkList: React.FC<ArtworkListProps> = ({
  artworks,
  onArtworkSelect,
  onAddToExhibition,
}) => {
  if (artworks.length === 0) {
    return <p>No artworks found. Try a different search term.</p>;
  }

  return (
    <div className="artwork-list">
      {artworks.map((artwork) => (
        <div
          key={artwork.id}
          className="artwork-item"
          onClick={() => onArtworkSelect(artwork)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onArtworkSelect(artwork);
            }
          }}
        >
          <img
            src={artwork.imageUrl || "/path/to/placeholder-image.jpg"}
            alt={artwork.title}
            className="artwork-image"
          />
          <h3>{artwork.title}</h3>
          <p>{artwork.artist}</p>
          <p>{artwork.date}</p>
          <p>{artwork.source}</p>
          <button
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
