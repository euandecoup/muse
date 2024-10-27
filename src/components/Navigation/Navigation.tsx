import React from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Image,
  User,
  Settings as SettingsIcon,
  Search,
  LogOut,
} from "lucide-react";
import styles from "./Navigation.module.css";

interface NavigationProps {
  onLogout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onLogout }) => (
  <nav className={styles.nav} role="navigation" aria-label="Main navigation">
    <ul className={styles.navList}>
      <li>
        <Link to="/" className={styles.navLink} aria-label="Home">
          <span className={styles.navIcon}>
            <Home size={20} />
          </span>
          <span className={styles.navText}>Home</span>
        </Link>
      </li>
      <li>
        <Link
          to="/exhibitions"
          className={styles.navLink}
          aria-label="My Exhibitions"
        >
          <span className={styles.navIcon}>
            <Image size={20} />
          </span>
          <span className={styles.navText}>My Exhibitions</span>
        </Link>
      </li>
      <li>
        <Link to="/profile" className={styles.navLink} aria-label="Profile">
          <span className={styles.navIcon}>
            <User size={20} />
          </span>
          <span className={styles.navText}>Profile</span>
        </Link>
      </li>
      <li>
        <Link to="/settings" className={styles.navLink} aria-label="Settings">
          <span className={styles.navIcon}>
            <SettingsIcon size={20} />
          </span>
          <span className={styles.navText}>Settings</span>
        </Link>
      </li>
      <li>
        <Link to="/search" className={styles.navLink} aria-label="Search">
          <span className={styles.navIcon}>
            <Search size={20} />
          </span>
          <span className={styles.navText}>Search</span>
        </Link>
      </li>
      <li>
        <button
          className={styles.logoutButton}
          onClick={onLogout}
          aria-label="Logout"
        >
          <span className={styles.navIcon}>
            <LogOut size={20} />
          </span>
          <span className={styles.logoutText}>Logout</span>
        </button>
      </li>
    </ul>
  </nav>
);

export default Navigation;
