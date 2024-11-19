import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import {
  getExhibition,
  updateExhibition,
  Exhibition,
} from "../../../services/exhibitionService";
import { ArrowLeft, Save, XCircle } from "lucide-react";
import styles from "./ExhibitionEdit.module.css";

const ExhibitionEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [exhibition, setExhibition] = useState<Exhibition | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

      // Check if user owns the exhibition
      if (exhibitionData.userId !== user?.uid) {
        setError("You do not have permission to edit this exhibition");
        return;
      }

      setExhibition(exhibitionData);
      setTitle(exhibitionData.title);
      setDescription(exhibitionData.description);
      setIsPublic(exhibitionData.isPublic);
    } catch (err) {
      console.error("Error loading exhibition:", err);
      setError("Failed to load exhibition");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!exhibition || !id) return;

    try {
      setSaving(true);
      setError(null);

      await updateExhibition(id, {
        title,
        description,
        isPublic,
      });

      navigate(`/exhibition/${id}`);
    } catch (err) {
      console.error("Error saving exhibition:", err);
      setError("Failed to save changes");
      setSaving(false);
    }
  };

  const handleArtworkReorder = (fromIndex: number, toIndex: number) => {
    if (!exhibition) return;

    const newArtworks = [...exhibition.artworks];
    const [movedArtwork] = newArtworks.splice(fromIndex, 1);
    newArtworks.splice(toIndex, 0, movedArtwork);

    setExhibition({
      ...exhibition,
      artworks: newArtworks,
    });
  };

  const handleRemoveArtwork = (index: number) => {
    if (!exhibition) return;

    const newArtworks = [...exhibition.artworks];
    newArtworks.splice(index, 1);

    setExhibition({
      ...exhibition,
      artworks: newArtworks,
    });
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

  return (
    <div className={styles.exhibitionEdit}>
      <header className={styles.header}>
        <button
          onClick={() => navigate(`/exhibition/${id}`)}
          className={styles.backButton}
        >
          <ArrowLeft size={20} />
          Back to Exhibition
        </button>
        <h1>Edit Exhibition</h1>
        <button
          onClick={handleSave}
          className={styles.saveButton}
          disabled={saving}
        >
          <Save size={20} />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </header>

      <div className={styles.editForm}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Exhibition Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter exhibition title"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter exhibition description"
            rows={4}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
            Make this exhibition public
          </label>
        </div>

        <div className={styles.artworksSection}>
          <h2>Artworks</h2>
          <p className={styles.hint}>Drag to reorder artworks</p>

          <div className={styles.artworksList}>
            {exhibition.artworks.map((artwork, index) => (
              <div
                key={artwork.id}
                className={styles.artworkItem}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", index.toString());
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  const fromIndex = parseInt(
                    e.dataTransfer.getData("text/plain")
                  );
                  handleArtworkReorder(fromIndex, index);
                }}
              >
                <img
                  src={
                    artwork.imageUrl || "/istockphoto-1147544807-612x612.jpg"
                  }
                  alt={artwork.title}
                  className={styles.artworkThumb}
                />
                <div className={styles.artworkInfo}>
                  <h3>{artwork.title}</h3>
                  <p>{artwork.artist}</p>
                </div>
                <button
                  onClick={() => handleRemoveArtwork(index)}
                  className={styles.removeButton}
                  title="Remove artwork"
                >
                  <XCircle size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExhibitionEdit;
