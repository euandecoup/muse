import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import {
  getUserExhibitions,
  deleteExhibition,
  Exhibition,
} from "../../../services/exhibitionService";
import { Share2, Edit, Trash2, Eye, Image, AlertCircle } from "lucide-react";
import styles from "./MyExhibitions.module.css";

const MyExhibitions: React.FC = () => {
  const { user } = useAuth();
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    loadExhibitions();
  }, [user]);

  const loadExhibitions = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      const userExhibitions = await getUserExhibitions(user.uid);
      setExhibitions(
        userExhibitions.sort(
          (a, b) => b.createdAt.toMillis() - a.createdAt.toMillis()
        )
      );
    } catch (err) {
      console.error("Error loading exhibitions:", err);
      setError("Failed to load exhibitions. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteExhibition = async (exhibitionId: string) => {
    if (!window.confirm("Are you sure you want to delete this exhibition?")) {
      return;
    }

    try {
      setDeletingId(exhibitionId);
      await deleteExhibition(exhibitionId);
      setExhibitions((prevExhibitions) =>
        prevExhibitions.filter((ex) => ex.id !== exhibitionId)
      );
    } catch (err) {
      console.error("Error deleting exhibition:", err);
      alert("Failed to delete exhibition. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleShareExhibition = async (exhibition: Exhibition) => {
    if (!exhibition.id) return;

    const shareUrl = `${window.location.origin}/exhibition/${exhibition.id}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("Exhibition link copied to clipboard!");
    } catch (err) {
      console.error("Error copying to clipboard:", err);
      alert("Failed to copy link. The URL is: " + shareUrl);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}>Loading your exhibitions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <AlertCircle size={24} />
        <p>{error}</p>
        <button onClick={loadExhibitions} className={styles.retryButton}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.exhibitionsPage}>
      <header className={styles.header}>
        <div className={styles.titleSection}>
          <h1>My Exhibitions</h1>
          <p>
            {exhibitions.length}{" "}
            {exhibitions.length === 1 ? "Exhibition" : "Exhibitions"}
          </p>
        </div>
        <Link to="/" className={styles.newExhibitionButton}>
          Create New Exhibition
        </Link>
      </header>

      {exhibitions.length === 0 ? (
        <div className={styles.emptyState}>
          <Image size={48} />
          <h2>No Exhibitions Yet</h2>
          <p>
            Start curating your first exhibition to showcase your favorite
            artworks.
          </p>
          <Link to="/" className={styles.createButton}>
            Create Your First Exhibition
          </Link>
        </div>
      ) : (
        <div className={styles.exhibitionGrid}>
          {exhibitions.map((exhibition) => (
            <div key={exhibition.id} className={styles.exhibitionCard}>
              <div className={styles.exhibitionPreview}>
                {exhibition.artworks[0] ? (
                  <img
                    src={
                      exhibition.artworks[0].imageUrl ||
                      "/placeholder-artwork.jpg"
                    }
                    alt={`Preview of ${exhibition.title}`}
                  />
                ) : (
                  <div className={styles.noPreview}>
                    <Image size={32} />
                    <span>No preview available</span>
                  </div>
                )}
                {exhibition.isPublic && (
                  <span className={styles.publicBadge}>Public</span>
                )}
              </div>

              <div className={styles.exhibitionInfo}>
                <h3>{exhibition.title}</h3>
                {exhibition.description && (
                  <p className={styles.description}>{exhibition.description}</p>
                )}
                <div className={styles.metadata}>
                  <span>
                    {exhibition.artworks.length}{" "}
                    {exhibition.artworks.length === 1 ? "artwork" : "artworks"}
                  </span>
                  <span>
                    Created{" "}
                    {new Date(
                      exhibition.createdAt.toMillis()
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className={styles.actions}>
                <button
                  onClick={() =>
                    exhibition.id && handleShareExhibition(exhibition)
                  }
                  className={styles.actionButton}
                  title="Share Exhibition"
                >
                  <Share2 size={20} />
                </button>
                <Link
                  to={`/exhibition/${exhibition.id}`}
                  className={styles.actionButton}
                  title="View Exhibition"
                >
                  <Eye size={20} />
                </Link>
                <Link
                  to={`/exhibition/${exhibition.id}/edit`}
                  className={styles.actionButton}
                  title="Edit Exhibition"
                >
                  <Edit size={20} />
                </Link>
                <button
                  onClick={() =>
                    exhibition.id && handleDeleteExhibition(exhibition.id)
                  }
                  className={`${styles.actionButton} ${styles.deleteButton}`}
                  disabled={deletingId === exhibition.id}
                  title="Delete Exhibition"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyExhibitions;
