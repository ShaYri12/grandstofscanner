import ExploreHeader from "../../components/ExploreHeader/ExploreHeader";
import ExploreTimeline from "../../components/ExploreTimeline/ExploreTimeline";
import styles from "./Explore.module.css";

const Explore = () => {
  return (
    <div>
      <ExploreHeader />
      <div className={styles.timelineSteps}>
        <div className={styles.timelineContainer}>
          <ExploreTimeline/>
        </div>
      </div>
    </div>
  );
};

export default Explore;
