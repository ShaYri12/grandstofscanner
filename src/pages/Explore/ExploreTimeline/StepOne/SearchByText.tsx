import { t } from "i18next";
import UniversalButton from "../../../../components/General/Buttons";
import stepOneStyle from "./StepOne.module.css";
import { useState } from "react";

interface SearchByTextProps {
    handleSearch: (searchValue: string) => void;
}
const SearchByText: React.FC<SearchByTextProps> = ({
    handleSearch
}) => {

    const [localSearchValue, setLocalSearchValue] = useState<string>("");
    return (
        <div>
            <label>{t("exploreheader.stepOne.labelOne")}</label>
            <div className={stepOneStyle.inputGroup}>
                <input
                    type="text"
                    placeholder="Placeholder"
                    className={stepOneStyle.customInput}
                    value={localSearchValue}
                    onChange={(e) => setLocalSearchValue(e.target.value)}
                />
                <UniversalButton
                    onClick={() => handleSearch(localSearchValue)}
                    customClass={stepOneStyle.button}
                >
                    {t("exploreheader.stepOne.toSearch")}
                </UniversalButton>
            </div>
        </div>
    );
};

export default SearchByText;