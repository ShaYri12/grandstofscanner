import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import UniversalButton from "../../../../components/General/Buttons";
import { allRawMaterials } from "../../Services/SearchExplore";
import style from "./SearchByRawMaterial.module.css";
import ArrowDown from "../../../../assets/arrow-down.svg";
import { RawMaterialLookUpModel } from "../../Models/RawMaterialLookUpModel";

interface SearchByRawMaterialProps {
    handleSearch: (searchValue: RawMaterialLookUpModel) => void;
}

interface LangParam extends Record<string, string | undefined> {
    lang: string;
}

const SearchByRawMaterial: React.FC<SearchByRawMaterialProps> = ({
    handleSearch
}) => {
    const [rawMaterialsOptions, setRawMaterialsOptions] = useState<Record<string, RawMaterialLookUpModel[]>>({});
    const [currentRawMaterials, setCurrentRawMaterials] = useState<RawMaterialLookUpModel[]>([]);
    const [selectedOption, setSelectedOption] = useState<string>("Maak een keuze");
    const [activeTab, setActiveTab] = useState<"Biotische grondstoffen" | "Abiotische grondstoffen">("Biotische grondstoffen");
    const [activeButton, setActiveButton] = useState<"Primary" | "Recycled" | "">();
    const [showAdditionalButtons, setShowAdditionalButtons] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleDropdown = (): void => {
        setIsOpen((prev) => !prev);
    };

    const handleOptionSelect = (rawMaterialLookUpModel: RawMaterialLookUpModel): void => {
        setSelectedOption(rawMaterialLookUpModel.name);
        setIsOpen(false);
        handleSearch(rawMaterialLookUpModel);
    };

    const handleTabChange = (
        tab: "Biotische grondstoffen" | "Abiotische grondstoffen"
    ): void => {
        setActiveTab(tab);
        setActiveButton("");
        setShowAdditionalButtons(tab === "Abiotische grondstoffen");
        if (tab === "Biotische grondstoffen") {
            setCurrentRawMaterials(rawMaterialsOptions["Biotic"]);
        } else {
            const primary = rawMaterialsOptions["Primary"];
            const recycled = rawMaterialsOptions["Recycled"]
            setCurrentRawMaterials([...primary, ...recycled]);
        }
    };

    const handleSelectedButtonChange = (
        button: "Primary" | "Recycled"
    ): void => {
        setActiveButton(button);
        if (button === "Primary") {
            setCurrentRawMaterials(rawMaterialsOptions["Primary"]);
        } else {
            setCurrentRawMaterials(rawMaterialsOptions["Recycled"]);
        }
    };

    const { t } = useTranslation();
    const { lang } = useParams<LangParam>();

    useEffect(() => {
        allRawMaterials()
            .then((result) => {
                const bioticMaterials: RawMaterialLookUpModel[] = [];
                const recycledMaterials: RawMaterialLookUpModel[] = [];
                const primaryMaterials: RawMaterialLookUpModel[] = [];

                result.forEach((material) => {
                    if (material.isBiotic) {
                        bioticMaterials.push(material);
                        return;
                    } else if (material.isRecycled) {
                        recycledMaterials.push(material);
                        return;
                    } else {
                        primaryMaterials.push(material);
                    }
                });
                setRawMaterialsOptions({
                    "Biotic": bioticMaterials,
                    "Recycled": recycledMaterials,
                    "Primary": primaryMaterials
                });
            }).catch((error) => {
                console.error('Error: ', error);
            });

    }, [lang]);

    return (
        <div className={style.searchGroup}>
            <label>{t("exploreheader.stepOne.labelThree")}</label>
            <div className={style.customDropdown}>
                <input
                    type="text"
                    value={selectedOption}
                    readOnly
                    onClick={toggleDropdown}
                />
                <UniversalButton onClick={toggleDropdown}>
                    <img src={ArrowDown} alt="arrow" />
                </UniversalButton>
            </div>
            {isOpen && (
                <div className={style.dropdownOption}>
                    <div className={style.tabsContainer}>
                        <div className={style.tabsBtns}>
                            <UniversalButton
                                onClick={() => handleTabChange("Biotische grondstoffen")}
                                customClass={
                                    activeTab === "Biotische grondstoffen" ? style.active : ""
                                }
                            >
                                {t("exploreheader.stepOne.btnOne")}
                            </UniversalButton>

                            <UniversalButton
                                onClick={() => handleTabChange("Abiotische grondstoffen")}
                                customClass={`abiotische-grondstoffen ${activeTab === "Abiotische grondstoffen" ? style.active : ""
                                    }`}
                            >
                                {t("exploreheader.stepOne.btnTwo")}
                            </UniversalButton>
                        </div>
                        {showAdditionalButtons && (
                            <div className={style.tabsBtns}>
                                <UniversalButton
                                    onClick={() => handleSelectedButtonChange("Primary")}
                                    customClass={`${activeButton === "Primary" ? style.active : ""}`}
                                >
                                    {t("exploreheader.stepOne.btnThree")}
                                </UniversalButton>

                                <UniversalButton
                                    onClick={() => handleSelectedButtonChange("Recycled")}
                                    customClass={`${activeButton === "Recycled" ? style.active : ""}`}

                                >
                                    {t("exploreheader.stepOne.btnFour")}
                                </UniversalButton>
                            </div>
                        )}
                    </div>

                    <div className="options">
                        <ul>
                            {currentRawMaterials.map((rawMaterialLookUpModel: RawMaterialLookUpModel) => (
                                <li
                                    key={rawMaterialLookUpModel.id}
                                    onClick={() => handleOptionSelect(rawMaterialLookUpModel)}
                                    style={{ cursor: "pointer" }}
                                >
                                    {rawMaterialLookUpModel.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchByRawMaterial;
