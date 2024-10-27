import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import {
  updatePassword,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import {
  Settings as SettingsIcon,
  Bell,
  Shield,
  Trash2,
  Mail,
  Key,
} from "lucide-react";
import styles from "./Settings.module.css";

const Settings: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  // Form states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [exhibitionVisibility, setExhibitionVisibility] = useState(true);

  const resetMessages = () => {
    setError(null);
    setSuccess(null);
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();

    if (!user?.email) {
      setError("No user found");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      setLoading(true);
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      setSuccess("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error("Error updating password:", err);
      setError("Failed to update password. Please check your current password");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    try {
      setLoading(true);
      await deleteUser(user);
      navigate("/");
    } catch (err) {
      console.error("Error deleting account:", err);
      setError("Failed to delete account. Please try again");
      setShowDeleteConfirmation(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading settings...</div>;
  }

  if (!user) {
    return <div className={styles.error}>Please log in to view settings</div>;
  }

  return (
    <div className={styles.settings}>
      <h1 className={styles.title}>Settings</h1>

      {/* Account Security Section */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <Shield size={20} />
          Account Security
        </h2>
        <form className={styles.form} onSubmit={handlePasswordUpdate}>
          <div className={styles.formGroup}>
            <label htmlFor="currentPassword">Current Password</label>
            <input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="newPassword">New Password</label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={`${styles.button} ${styles.saveButton}`}
          >
            Update Password
          </button>
        </form>
      </div>

      {/* Notification Preferences */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <Bell size={20} />
          Notification Preferences
        </h2>
        <div className={styles.form}>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
            />
            <span className={styles.slider}></span>
            <span>Email Notifications</span>
          </label>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <Key size={20} />
          Privacy Settings
        </h2>
        <div className={styles.form}>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={exhibitionVisibility}
              onChange={(e) => setExhibitionVisibility(e.target.checked)}
            />
            <span className={styles.slider}></span>
            <span>Make new exhibitions public by default</span>
          </label>
        </div>
      </div>

      {/* Delete Account Section */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <Trash2 size={20} />
          Delete Account
        </h2>
        <p>
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
        <button
          className={`${styles.button} ${styles.deleteButton}`}
          onClick={() => setShowDeleteConfirmation(true)}
        >
          Delete Account
        </button>
      </div>

      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>{success}</div>}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className={styles.confirmationModal}>
          <div className={styles.modalContent}>
            <h3 className={styles.modalTitle}>Delete Account</h3>
            <p className={styles.modalText}>
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>
            <div className={styles.modalActions}>
              <button
                className={`${styles.button} ${styles.cancelButton}`}
                onClick={() => setShowDeleteConfirmation(false)}
              >
                Cancel
              </button>
              <button
                className={`${styles.button} ${styles.deleteButton}`}
                onClick={handleDeleteAccount}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
