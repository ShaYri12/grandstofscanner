import { useTranslation } from "react-i18next";
import UniversalButton from "../../../../../components/General/Buttons";
import { ProductGroupTreeItemModel } from "../../../Models/ProductGroupTreeItemModel";
import style from "./CategoryTwoNodes.module.css";

interface CategoryTwoNodeProps {
  nodes: ProductGroupTreeItemModel[];
  showStepThree: () => void,
}

const CategoryTwoNode: React.FC<CategoryTwoNodeProps> = ({
  nodes,
  showStepThree
}) => {
  const { t } = useTranslation();
  return nodes.map((node, index) => (
    <div key={"nodelevel2" + index} className={style.cat}>
      <div className={style.catContainer}>
        <h3 className="cat-title">
          {node.text}
        </h3>
        <div className={style.btns}>
          <UniversalButton
            onClick={showStepThree}
            customClass={style.btnOne}
          >
            {t("exploreheader.stepTwo.viewFactSheet")}
          </UniversalButton>
          <UniversalButton
            onClick={showStepThree}
            customClass={style.btnTwo}
          >
            {t("exploreheader.stepTwo.add")}
          </UniversalButton>
        </div>
      </div>
    </div>
  ));
}

export default CategoryTwoNode;