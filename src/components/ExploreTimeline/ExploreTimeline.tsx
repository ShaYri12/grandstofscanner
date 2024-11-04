"use client";

import React, { useState, useEffect } from "react";
import "./TimelineSearch.css";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const ExploreTimeline: React.FC = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();

  useEffect(() => {
    if (lang && lang !== i18next.language) {
      i18next.changeLanguage(lang);
    }
  }, [lang]);

  const [searchMethod, setSearchMethod] = useState<
    "name" | "category" | "material" | null
  >(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [productCategory, setProductCategory] = useState<string>("");
  const [material, setMaterial] = useState<string>("Antimoon");
  const [showResults, setShowResults] = useState<boolean>(false);
  const [showStepThree, setShowStepThree] = useState<boolean>(false);

  const handleSearch = () => {
    if (
      (searchMethod === "name" && searchValue) ||
      (searchMethod === "category" && productCategory) ||
      (searchMethod === "material" && material)
    ) {
      setShowResults(true);
    }
  };

  const handleShowStepThree = () => {
    setShowStepThree(true);
  };

  return (
    <div className="timeline-container">
      <h1 className="title"> {t("exploreheader.stepOne.title")}</h1>
      <div className="timeline">
        <StepOne
          setSearchMethod={setSearchMethod}
          setSearchValue={setSearchValue}
          setProductCategory={setProductCategory}
          setMaterial={setMaterial}
          handleSearch={handleSearch}
        />

        {showResults && <StepTwo showStepThree={handleShowStepThree} />}

        {showStepThree && <StepThree />}
      </div>
    </div>
  );
};

export default ExploreTimeline;
