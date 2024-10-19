import React from "react";
import { Artwork, ExhibitionProps } from "../types/artwork";

const Exhibition: React.FC<ExhibitionProps> = ({
  artworks,
  onRemoveArtwork,
  onViewArtwork,
}) => {
  if (artworks.length === 0) {
    return <p>Your exhibition is empty. Add some artworks to get started!</p>;
  }

  return (
    <div className="exhibition">
      <h2>Your Curated Exhibition</h2>
      <div className="exhibition-grid">
        {artworks.map((artwork) => (
          <div key={artwork.id} className="exhibition-item">
            <img
              src={artwork.imageUrl || "/path/to/placeholder-image.jpg"}
              alt={artwork.title}
              onClick={() => onViewArtwork(artwork)}
            />
            <h3>{artwork.title}</h3>
            <p>{artwork.artist}</p>
            <button onClick={() => onRemoveArtwork(artwork.id)}>
              Remove from Exhibition
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exhibition;