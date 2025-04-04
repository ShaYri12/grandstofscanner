import React, { useState, useEffect } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import style from "./StepOne.module.css";
import { ProductGroupMainApplicationModel } from "../../Models/ProductGroupMainApplicationModel";
import SearchByRawMaterial from "./SearchByRawMaterial";
import { RawMaterialLookUpModel } from "../../Models/RawMaterialLookUpModel";
import SearchByCategory from "./SearchByCategory";
import SearchByText from "./SearchByText";

interface StepOneProps {
  handleTextSearch: (searchValue: string) => void;
  handleCategorySearch: (productGroupMainApplicationModel: ProductGroupMainApplicationModel) => void;
  handleRawMaterialSearch: (rawMaterialLookUpModel: RawMaterialLookUpModel) => void;
}

interface LangParam extends Record<string, string | undefined> {
  lang: string;
}

const StepOne: React.FC<StepOneProps> = ({
  handleTextSearch, handleCategorySearch, handleRawMaterialSearch
}) => {

  useState<boolean>(false);
  const { t } = useTranslation();
  const { lang } = useParams<LangParam>();

  useEffect(() => {
    if (lang && lang !== i18next.language) {
      i18next.changeLanguage(lang);
    }
  }, [lang]);

  return (
    <div className="timeline-item">
      <div className="content">
        <SearchByText handleSearch={handleTextSearch} ></SearchByText>

        <div className={style.ofContainer}>
          <div className={style.line}></div>
          <div className={style.separator}>{t("exploreheader.stepOne.of")}</div>
          <div className={style.line}></div>
        </div>

        <SearchByCategory handleSearch={handleCategorySearch} ></SearchByCategory>

        <div className={style.ofContainer}>
          <div className={style.line}></div>
          <div className={style.separator}>{t("exploreheader.stepOne.of")}</div>
          <div className={style.line}></div>
        </div>

        <SearchByRawMaterial handleSearch={handleRawMaterialSearch} ></SearchByRawMaterial>
      </div>
    </div>
  );
};

export default StepOne;
