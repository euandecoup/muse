import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { getExhibition, Exhibition } from "../../../services/exhibitionService";
import { Share2, Edit, ArrowLeft } from "lucide-react";
import styles from "./ExhibitionView.module.css";

const ExhibitionView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [exhibition, setExhibition] = useState<Exhibition | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedArtworkIndex, setSelectedArtworkIndex] = useState<number>(0);

  useEffect(() => {
    loadExhibition();
  }, [id]);

  const loadExhibition = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      const exhibitionData = await getExhibition(id);

      if (!exhibitionData) {
        setError("Exhibition not found");
        return;
      }

      // Check if user has permission to view
      if (!exhibitionData.isPublic && exhibitionData.userId !== user?.uid) {
        setError("You do not have permission to view this exhibition");
        return;
      }

      setExhibition(exhibitionData);
    } catch (err) {
      console.error("Error loading exhibition:", err);
      setError("Failed to load exhibition");
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("Exhibition link copied to clipboard!");
    } catch (err) {
      alert("Failed to copy link. The URL is: " + shareUrl);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}>Loading exhibition...</div>
      </div>
    );
  }

  if (error || !exhibition) {
    return (
      <div className={styles.errorContainer}>
        <p>{error || "Exhibition not found"}</p>
        <button
          onClick={() => navigate("/exhibitions")}
          className={styles.backButton}
        >
          <ArrowLeft size={20} />
          Back to My Exhibitions
        </button>
      </div>
    );
  }

  const selectedArtwork = exhibition.artworks[selectedArtworkIndex];

  return (
    <div className={styles.exhibitionView}>
      <header className={styles.header}>
        <button
          onClick={() => navigate("/exhibitions")}
          className={styles.backButton}
        >
          <ArrowLeft size={20} />
          Back to My Exhibitions
        </button>
        <div className={styles.headerContent}>
          <h1>{exhibition.title}</h1>
          {exhibition.description && (
            <p className={styles.description}>{exhibition.description}</p>
          )}
        </div>
        <div className={styles.actions}>
          {user?.uid === exhibition.userId && (
            <button
              onClick={() => navigate(`/exhibition/${id}/edit`)}
              className={styles.editButton}
            >
              <Edit size={20} />
              Edit Exhibition
            </button>
          )}
          <button onClick={handleShare} className={styles.shareButton}>
            <Share2 size={20} />
            Share
          </button>
        </div>
      </header>

      <div className={styles.exhibitionContent}>
        <div className={styles.mainArtwork}>
          {selectedArtwork && (
            <img
              src={selectedArtwork.imageUrl || "/placeholder-artwork.jpg"}
              alt={selectedArtwork.title}
              className={styles.featuredImage}
            />
          )}
          <div className={styles.artworkInfo}>
            <h2>{selectedArtwork.title}</h2>
            <p className={styles.artist}>{selectedArtwork.artist}</p>
            <p className={styles.date}>{selectedArtwork.date}</p>
            {selectedArtwork.medium && (
              <p className={styles.medium}>{selectedArtwork.medium}</p>
            )}
            <p className={styles.source}>From {selectedArtwork.source}</p>
            <a
              href={selectedArtwork.moreInfoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.moreInfoLink}
            >
              More Information
            </a>
          </div>
        </div>

        <div className={styles.thumbnailStrip}>
          {exhibition.artworks.map((artwork, index) => (
            <div
              key={artwork.id}
              className={`${styles.thumbnail} ${
                index === selectedArtworkIndex ? styles.selected : ""
              }`}
              onClick={() => setSelectedArtworkIndex(index)}
            >
              <img
                src={artwork.imageUrl || "/placeholder-artwork.jpg"}
                alt={artwork.title}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExhibitionView;
