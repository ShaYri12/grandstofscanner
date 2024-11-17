import React from "react";
import { useTranslation } from "react-i18next";

// Define a type for the translation object structure
interface BoxTranslation {
  boxline1: string;
  boxline2: string;
  boxline3: string;
  boxbutton: string;
  boxline4: string;
  boxline5: string;
  boxline6: string;
}

/**
 * Type guard to check if an object is of type BoxTranslation
 */
function isBoxTranslation(obj: any): obj is BoxTranslation {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "boxline1" in obj &&
    "boxline2" in obj &&
    "boxline3" in obj &&
    "boxbutton" in obj &&
    "boxline4" in obj &&
    "boxline5" in obj &&
    "boxline6" in obj
  );
}

const HeroCard1: React.FC = () => {
  const { t } = useTranslation();
  const translation = t("box1");

  // Ensure the translation result is of type BoxTranslation
  const boxTranslation = isBoxTranslation(translation)
    ? translation
    : {
        boxline1: "",
        boxline2: "",
        boxline3: "",
        boxbutton: "",
        boxline4: "",
        boxline5: "",
        boxline6: "",
      };

  // Destructure the translation strings for box1
  const { boxline1 } = boxTranslation;

  return (
    <>
      <p>{boxline1}</p>
    </>
  );
};

export default HeroCard1;
