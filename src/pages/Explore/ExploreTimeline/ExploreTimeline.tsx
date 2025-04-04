"use client";
import React, { useState, useEffect } from "react";
import "./SharedTimeline.css";
import StepOne from "./StepOne/StepOne";
import StepTwo from "./StepTwo/StepTwo";
import StepThree from "./StepThree";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { allProductGroups, productGroupsByName } from "../Services/SearchExplore";
import { MainTreeItemModel } from "../Models/MainTreeItemModel";
import style from "./ExploreTimeline.module.css";
import { RawMaterialLookUpModel } from "../Models/RawMaterialLookUpModel";
import { ProductGroupMainApplicationModel } from "../Models/ProductGroupMainApplicationModel";

const ExploreTimeline: React.FC = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();

  useEffect(() => {
    if (lang && lang !== i18next.language) {
      i18next.changeLanguage(lang);
    }

    allProductGroups()
      .then((result) => {
        setProductGroups(result);
      }).catch((error) => {
        console.error('Error: ', error);
      });

  }, [lang]);

  const [showResults, setShowResults] = useState<boolean>(false);
  const [showStepThree, setShowStepThree] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<MainTreeItemModel[]>([]);
  const [productGroups, setProductGroups] = useState<MainTreeItemModel[]>([]);

  const handleTextSearch = async (searchValue: string): Promise<void> => {
    if (searchValue) {
      const exploreModel = await productGroupsByName(searchValue);
      setSearchResults(exploreModel);
      setShowResults(true);
    }
  };

  const handleCategorySearch = async (productGroupMainApplicationModel: ProductGroupMainApplicationModel): Promise<void> => {
    productGroups.forEach((productGroup) => {
      if (productGroup.id === productGroupMainApplicationModel.id) {
        setSearchResults([productGroup]);
        setShowResults(true);
      }
    });
  };

  const handleRawMaterialSearch = async (rawMaterialLookUpModel: RawMaterialLookUpModel): Promise<void> => {
    const results: MainTreeItemModel[] = [];
    productGroups.forEach((productGroup) => {
      productGroup.nodes.some((node) => {
        node.nodes.some((node) => {
          node.rawMaterials.some((rawMaterial) => {
            if (rawMaterial.id === rawMaterialLookUpModel.id && !results.includes(productGroup)) {
              results.push(productGroup);
              return;
            }
          })
        });
      });
    });

    setSearchResults(results);
    setShowResults(true);
  };

  const handleShowStepThree = (): void => {
    setShowStepThree(true);
  };

  return (
    <div className={style.timelineContainer}>
      <h1 className="title">{t("exploreheader.stepOne.title")}</h1>
      <div className={style.timeline}>
        <StepOne
          handleTextSearch={handleTextSearch}
          handleCategorySearch={handleCategorySearch}
          handleRawMaterialSearch={handleRawMaterialSearch}
        />

        {showResults && searchResults != undefined && <StepTwo showStepThree={handleShowStepThree} searchResults={searchResults} />}

        {showStepThree && <StepThree />}
      </div>
    </div>
  );
};

export default ExploreTimeline;
