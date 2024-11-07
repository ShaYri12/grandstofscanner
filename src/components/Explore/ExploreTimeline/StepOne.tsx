import React, { useState, useEffect } from "react";
import ArrowDown from "../../../assets/arrow-down.svg";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

interface StepOneProps {
  setSearchMethod: React.Dispatch<
    React.SetStateAction<"name" | "category" | "material" | null>
  >;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  setProductCategory: React.Dispatch<React.SetStateAction<string>>;
  setMaterial: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
}

const StepOne: React.FC<StepOneProps> = ({
  setSearchMethod,
  setSearchValue,
  setProductCategory,
  handleSearch,
}) => {
  const [localSearchValue, setLocalSearchValue] = useState<string>("");
  const [localProductCategory, setLocalProductCategory] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] =
    useState<string>("Maak een keuze");
  const [activeTab, setActiveTab] = useState<
    "Biotische grondstoffen" | "Abiotische grondstoffen"
  >("Biotische grondstoffen");
  const [showAdditionalButtons, setShowAdditionalButtons] = useState(false); // State for additional buttons

  const options = {
    "Biotische grondstoffen": [
      "Primaire",
      "Aluminium / Bauxiet",
      "Antimoon",
      "Antimoon",
      "Antimoon",
      "Antimoon",
      "Antimoon",
    ],
    "Abiotische grondstoffen": ["Primaire", "Recycled", "Antimoon"],
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleTabChange = (
    tab: "Biotische grondstoffen" | "Abiotische grondstoffen"
  ) => {
    setActiveTab(tab);
    setShowAdditionalButtons(tab === "Abiotische grondstoffen");
  };

  const onSearchClick = () => {
    if (localSearchValue) {
      setSearchValue(localSearchValue);
      setSearchMethod("name");
    } else if (localProductCategory) {
      setProductCategory(localProductCategory);
      setSearchMethod("category");
    } else if (selectedOption !== "Maak een keuze") {
      setSearchMethod("material");
    }
    handleSearch();
  };

  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();

  useEffect(() => {
    if (lang && lang !== i18next.language) {
      i18next.changeLanguage(lang);
    }
  }, [lang]);

  return (
    <div className="timeline-item">
      <div className="content">
        <div className="search-group">
          <label> {t("exploreheader.stepOne.labelOne")}</label>
          <div className="input-group">
            <input
              type="text"
              placeholder="Placeholder"
              className="custom-input"
              value={localSearchValue}
              onChange={(e) => setLocalSearchValue(e.target.value)}
            />
            <button className="custom-button" onClick={onSearchClick}>
              {t("exploreheader.stepOne.toSearch")}
            </button>
          </div>
        </div>

        <div className="ofContainer">
          <div className="line"></div>
          <div className="separator">{t("exploreheader.stepOne.of")}</div>
          <div className="line"></div>
        </div>

        <div className="search-group">
          <label> {t("exploreheader.stepOne.labelTwo")}</label>
          <select
            className="custom-select"
            value={localProductCategory}
            onChange={(e) => setLocalProductCategory(e.target.value)}
          >
            <option value="">Maak een keuze</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>

        <div className="ofContainer">
          <div className="line"></div>
          <div className="separator">{t("exploreheader.stepOne.of")}</div>
          <div className="line"></div>
        </div>

        <div className="search-group">
          <label> {t("exploreheader.stepOne.labelThree")}</label>
          <div className="custom-dropdown">
            <input
              type="text"
              value={selectedOption}
              readOnly
              onClick={toggleDropdown}
            />
            <button onClick={toggleDropdown}>
              <img src={ArrowDown} alt="arrow" />
            </button>
          </div>
          {isOpen && (
            <div className="dropdown-option">
              <div className="tabs-container">
                <div className="tabs-btns">
                  <button
                    onClick={() => handleTabChange("Biotische grondstoffen")}
                    className={
                      activeTab === "Biotische grondstoffen" ? "active" : ""
                    }
                  >
                    {t("exploreheader.stepOne.btnOne")}
                  </button>
                  <button
                    className={`abiotische-grondstoffen ${
                      activeTab === "Abiotische grondstoffen" ? "active" : ""
                    }`}
                    onClick={() => handleTabChange("Abiotische grondstoffen")}
                  >
                    {t("exploreheader.stepOne.btnTwo")}
                  </button>
                </div>
                {showAdditionalButtons && (
                  <div className="tabs-btns">
                    <button onClick={() => handleOptionSelect("Primaire")}>
                      {t("exploreheader.stepOne.btnThree")}
                    </button>
                    <button onClick={() => handleOptionSelect("Recycled")}>
                      {t("exploreheader.stepOne.btnFour")}
                    </button>
                  </div>
                )}
              </div>

              <div className="options">
                <ul>
                  {options[activeTab].map((option: string, index: number) => (
                    <li key={index} onClick={() => handleOptionSelect(option)}>
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepOne;
