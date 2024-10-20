import React from "react";
import { useAuth } from "../contexts/AuthContext";
import styles from "./GuestOption.module.css";

const GuestOption: React.FC = () => {
  const { continueAsGuest } = useAuth();

  return (
    <div className={styles.guestOption}>
      <p>
        Don't want to sign up? You can still explore artworks through the Muse
        app!
      </p>
      <button onClick={continueAsGuest} className={styles.guestButton}>
        Continue as Guest
      </button>
    </div>
  );
};

export default GuestOption;
