import React, { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import {
  getUserExhibitions,
  Exhibition,
} from "../../../services/exhibitionService";
import { User, Mail, Calendar, Image, Eye, Lock } from "lucide-react";
import styles from "./Profile.module.css";

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUserExhibitions = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const userExhibitions = await getUserExhibitions(user.uid);
        setExhibitions(userExhibitions);
      } catch (err) {
        console.error("Error loading exhibitions:", err);
        setError("Failed to load exhibition data");
      } finally {
        setLoading(false);
      }
    };

    loadUserExhibitions();
  }, [user]);

  if (loading) {
    return <div className={styles.loading}>Loading profile...</div>;
  }

  if (!user) {
    return (
      <div className={styles.error}>Please log in to view your profile</div>
    );
  }

  const joinDate = user.metadata.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString()
    : "Unknown";

  const publicExhibitions = exhibitions.filter((ex) => ex.isPublic).length;
  const privateExhibitions = exhibitions.length - publicExhibitions;

  return (
    <div className={styles.profile}>
      <h1 className={styles.title}>My Profile</h1>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <User size={20} />
          User Information
        </h2>
        <div className={styles.info}>
          <div className={styles.infoItem}>
            <Mail size={16} />
            <span>{user.email}</span>
          </div>
          <div className={styles.infoItem}>
            <Calendar size={16} />
            <span>Joined {joinDate}</span>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <Image size={20} />
          Exhibition Statistics
        </h2>
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span>Total Exhibitions</span>
            <span>{exhibitions.length}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>
              <Eye size={16} />
              Public Exhibitions
            </span>
            <span>{publicExhibitions}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>
              <Lock size={16} />
              Private Exhibitions
            </span>
            <span>{privateExhibitions}</span>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Recent Activity</h2>
        {exhibitions.length > 0 ? (
          <div className={styles.activityList}>
            {exhibitions.slice(0, 5).map((exhibition) => (
              <div key={exhibition.id} className={styles.activityItem}>
                <div className={styles.activityInfo}>
                  <h3>{exhibition.title}</h3>
                  <p>
                    {exhibition.artworks.length} artworks •
                    {exhibition.isPublic ? " Public" : " Private"}
                  </p>
                </div>
                <span className={styles.activityDate}>
                  {new Date(
                    exhibition.createdAt.seconds * 1000
                  ).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.emptyState}>No exhibitions created yet</p>
        )}
      </div>

      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default Profile;
