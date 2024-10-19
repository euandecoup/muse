import React from "react";
import { ArtworkDetailsProps } from "../types/artwork";

const ArtworkDetails: React.FC<ArtworkDetailsProps> = ({
  artwork,
  onClose,
  onAddToExhibition,
}) => {
  return (
    <div className="artwork-details">
      <button onClick={onClose} className="close-button">
        Close
      </button>
      <h2>{artwork.title}</h2>
      <img
        src={artwork.imageUrl || "/path/to/placeholder-image.jpg"}
        alt={artwork.title}
        className="artwork-image"
      />
      <p>
        <strong>Artist:</strong> {artwork.artist}
      </p>
      <p>
        <strong>Date:</strong> {artwork.date}
      </p>
      <p>
        <strong>Culture:</strong> {artwork.culture || "Unknown"}
      </p>
      <p>
        <strong>Medium:</strong> {artwork.medium || "Not specified"}
      </p>
      <p>
        <strong>Dimensions:</strong> {artwork.dimensions || "Not specified"}
      </p>
      <p>
        <strong>Source:</strong> {artwork.source}
      </p>
      <a href={artwork.moreInfoUrl} target="_blank" rel="noopener noreferrer">
        More Information
      </a>
      <button onClick={() => onAddToExhibition(artwork)}>
        Add to Exhibition
      </button>
    </div>
  );
};

export default ArtworkDetails;
