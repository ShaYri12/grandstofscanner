import styles from "./Landinfo.module.css";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import LandinfoTableArea from "../../components/LandinfoTableArea/LandinfoTableArea";

export default function Landinfo() {
  return (
    <section className={styles.container}>
      <div className={styles.texts}>
        <div className={styles.textsinner}>
          <nav className={styles.breadcrumb}>
            <Link to="/" className={styles.breadcrumbLink}>
              Home
            </Link>
            <FaChevronRight className={styles.breadcrumbIcon} />
            <span className={styles.breadcrumbCurrent}>Handelen</span>
          </nav>
          <div>
            <h2 className={styles.heading1}>Landinfo</h2>
            <p className={styles.para1}>
              Op deze pagina vindt u landspecifieke informatie.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.box}>
        <LandinfoTableArea />
      </div>
    </section>
  );
}
