import React from "react";
import { Artwork, ArtworkListProps } from "../types/artwork";

const ArtworkList: React.FC<ArtworkListProps> = ({
  artworks,
  onArtworkSelect,
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
        </div>
      ))}
    </div>
  );
};

export default ArtworkList;
