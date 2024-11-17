import React from "react";
import ExploreHeader from "../../components/PageSpecificComponents/Explore/ExploreHeader/ExploreHeader";
import ExploreTimeline from "../../components/PageSpecificComponents/Explore/ExploreTimeline/ExploreTimeline";
import styles from "./Explore.module.css";

const Explore: React.FC = () => {
  return (
    <div className={styles.container}>
      <ExploreHeader />
      <div className={styles.timelineSteps}>
        <div className={styles.timelineContainer}>
          <ExploreTimeline />
        </div>
      </div>
    </div>
  );
};

export default Explore;
