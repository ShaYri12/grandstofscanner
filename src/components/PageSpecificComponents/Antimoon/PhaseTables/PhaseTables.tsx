import React from "react";
import styles from "./PhaseTables.module.css";
import { useTranslation } from "react-i18next";
import { GoArrowDown, GoArrowRight } from "react-icons/go";

type Phase = {
  materials: string[];
};

interface PhaseTablesProps {
  phases: Phase[];
}

const PhaseTables: React.FC<PhaseTablesProps> = ({ phases }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      {phases.map((phase, index) => (
        <React.Fragment key={index}>
          <div className={styles.phaseTable}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>{`${t("antimoon.expandableSection.phase")} ${
                    index + 1
                  }`}</th>
                </tr>
              </thead>
              <tbody>
                {phase.materials.map((material, idx) => (
                  <tr key={idx}>
                    <td>{material}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Render arrow except after the last phase */}
          {index < phases.length - 1 && (
            <div className={styles.arrowContainer}>
              <span className={styles.arrowRight}>
                <GoArrowRight />
              </span>
              <span className={styles.arrowDown}>
                <GoArrowDown />
              </span>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// Example Usage
const phasesData: Phase[] = [
  {
    materials: [
      "Material 1",
      "Material 2",
      "Material 3",
      "Material 4",
      "Material 5",
    ],
  },
  {
    materials: ["Material 1", "Material 2", "Material 3"],
  },
  {
    materials: ["Material 1"],
  },
];

const App: React.FC = () => {
  return <PhaseTables phases={phasesData} />;
};

export default App;
