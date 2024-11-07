import ExploreHeader from "../../components/Explore/ExploreHeader/ExploreHeader";
import ExploreTimeline from "../../components/Explore/ExploreTimeline/ExploreTimeline";
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
