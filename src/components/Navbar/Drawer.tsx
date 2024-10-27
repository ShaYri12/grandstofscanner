import React from "react";
import { Link } from "react-router-dom";
import styles from "./Drawer.module.css";
import { IoClose } from "react-icons/io5";

interface LinkItem {
  path: string;
  label: string;
}

interface DrawerProps {
  active: boolean;
  onClose: () => void;
  links: LinkItem[];
  activePath: string;
}

const Drawer: React.FC<DrawerProps> = ({
  active,
  onClose,
  links,
  activePath,
}) => {
  return (
    <>
      {/* Overlay with onClick to close the drawer */}
      {active && (
        <div
          className={styles.overlay}
          onClick={onClose} // Close drawer only on overlay click
        ></div>
      )}

      <div className={`${styles.drawer} ${active ? styles.active : ""}`}>
        <div
          className={styles.drawerContent}
          onClick={(e) => e.stopPropagation()} // Prevent click from closing the drawer
        >
          <button className={styles.closeButton} onClick={onClose}>
            <IoClose />
          </button>
          <ul className={styles.navLinks}>
            {links.map((link) => (
              <li key={link.path}>
                <Link
                  onClick={onClose}
                  to={link.path}
                  className={
                    activePath === link.path ? styles.linkActive : styles.link
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Drawer;
