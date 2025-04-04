import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import stepOneStyle from "./StepOne.module.css";
import { ProductGroupMainApplicationModel } from "../../Models/ProductGroupMainApplicationModel";
import { productGroupsByProductCategory } from "../../Services/SearchExplore";

interface SearchByCategoryProps {
    handleSearch: (searchValue: ProductGroupMainApplicationModel) => void;
}

interface LangParam extends Record<string, string | undefined> {
    lang: string;
}

const SearchCategory: React.FC<SearchByCategoryProps> = ({
    handleSearch
}) => {
    const [mainCategories, setMainCategories] = useState<ProductGroupMainApplicationModel[]>([]);
    const [localProductCategory, setLocalProductCategory] = useState<string>("");
    const { t } = useTranslation();
    const { lang } = useParams<LangParam>();

    useEffect(() => {
        productGroupsByProductCategory()
            .then((result) => {
                setMainCategories(result);
            }).catch((error) => {
                console.error('Error: ', error);
            });
    }, [lang]);

    const productCategorySelected = (selectedValue: string): void => {
        if (selectedValue) {
            setLocalProductCategory(selectedValue);
            const selectedCategory = mainCategories.find((category) => category.id.toString() === selectedValue);
            if (selectedCategory) {
                handleSearch(selectedCategory);
            }
        }
    }

    return (
        <div>
            <label>{t("exploreheader.stepOne.labelTwo")}</label>
            <select
                className={stepOneStyle.customSelect}
                value={localProductCategory}
                onChange={(e) => productCategorySelected(e.target.value)}
            >
                <option value="">Maak een keuze</option>
                {mainCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SearchCategory;
