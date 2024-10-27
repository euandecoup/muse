import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { saveExhibition } from "../../services/exhibitionService";
import { Artwork } from "../../types/artwork";
import styles from "./SaveExhibition.module.css";

interface SaveExhibitionProps {
  artworks: Artwork[];
  onSuccess: () => void;
  onCancel: () => void;
}

const SaveExhibition: React.FC<SaveExhibitionProps> = ({
  artworks,
  onSuccess,
  onCancel,
}) => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to save exhibitions");
      return;
    }

    if (!title.trim()) {
      setError("Please enter a title for your exhibition");
      return;
    }

    try {
      setIsSaving(true);
      setError(null);
      await saveExhibition(user.uid, title, description, artworks, isPublic);
      onSuccess();
    } catch (error) {
      setError("Failed to save exhibition. Please try again.");
      console.error("Error saving exhibition:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.saveExhibitionModal}>
      <div className={styles.modalContent}>
        <h2>Save Exhibition</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Exhibition Title *</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title for your exhibition"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description (optional)"
              rows={3}
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

          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.buttons}>
            <button
              type="button"
              onClick={onCancel}
              className={styles.cancelButton}
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.saveButton}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Exhibition"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SaveExhibition;
