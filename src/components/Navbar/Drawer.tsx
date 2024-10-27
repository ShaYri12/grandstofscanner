import React from "react";
import { Link } from "react-router-dom";
import styles from "./Drawer.module.css";
import { IoClose } from "react-icons/io5";

// Define a type for the individual link objects
interface LinkItem {
  path: string; // The path the link should navigate to
  label: string; // The text label of the link
}

// Define props for the Drawer component
interface DrawerProps {
  active: boolean; // Indicates if the drawer is currently active
  onClose: () => void; // Function to call when closing the drawer
  links: LinkItem[]; // An array of link objects to be displayed in the drawer
}

const Drawer: React.FC<DrawerProps> = ({ active, onClose, links }) => {
  return (
    <div className={`${styles.drawer} ${active ? styles.active : ""}`}>
      <div className={styles.drawerContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <IoClose />
        </button>
        <ul className={styles.navLinks}>
          {links.map((link) => (
            <li key={link.path}>
              <Link to={link.path} className={styles.link}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
