import React from "react";
import { Artwork } from "../types/artwork";

interface ArtworkListProps {
  artworks: Artwork[];
  onAddToExhibition: (artwork: Artwork) => void;
}

const ArtworkList: React.FC<ArtworkListProps> = ({
  artworks,
  onAddToExhibition,
}) => {
  return (
    <div>
      {artworks.length === 0 ? (
        <p>No artworks found.</p>
      ) : (
        artworks.map((artwork) => (
          <div key={artwork.id}>
            <h3>{artwork.title}</h3>
            <p>Artist: {artwork.artist}</p>
            <button onClick={() => onAddToExhibition(artwork)}>
              Add to Exhibition
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ArtworkList;
