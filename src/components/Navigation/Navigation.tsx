import React from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Image,
  User,
  Settings as SettingsIcon,
  Search,
} from "lucide-react";
import styles from "./Navigation.module.css";

interface NavigationProps {
  onLogout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onLogout }) => (
  <nav className={styles.nav}>
    <ul className={styles.navList}>
      <li>
        <Link to="/">
          <Home size={20} />
          <span className={styles.navText}>Home</span>
        </Link>
      </li>
      <li>
        <Link to="/exhibitions">
          <Image size={20} />
          <span className={styles.navText}>My Exhibitions</span>
        </Link>
      </li>
      <li>
        <Link to="/profile">
          <User size={20} />
          <span className={styles.navText}>My Profile</span>
        </Link>
      </li>
      <li>
        <Link to="/settings">
          <SettingsIcon size={20} />
          <span className={styles.navText}>Settings</span>
        </Link>
      </li>
      <li>
        <Link to="/search">
          <Search size={20} />
          <span className={styles.navText}>Search</span>
        </Link>
      </li>
      <li>
        <button className={styles.logoutButton} onClick={onLogout}>
          Logout
        </button>
      </li>
    </ul>
  </nav>
);

export default Navigation;
