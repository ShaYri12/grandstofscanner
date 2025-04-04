import UniversalButton from "../../../../../components/General/Buttons";
import { useToggle } from "../../../../../hooks/ToggleVisibility";
import Arrow from "../../../../../assets/cat-btn.svg";
import { MainTreeItemModel } from "../../../Models/MainTreeItemModel";
import CategoryOneNode from "../CategoryOneNodes/CategotyOneNodes";
import styles from "./CategoryMainNodes.module.css"

interface CategoryMainNodeProps {
  searchResults: MainTreeItemModel[];
  showStepThree: () => void,
}

const CategoryMainNodes: React.FC<CategoryMainNodeProps> = ({
  searchResults, showStepThree
}) => {
  const [visibilityProps, toggleVisibility] = useToggle()
  return searchResults.map((result, index) => (
    <div key={"cat" + index}>
      <div className={styles.cat}>
        <h3 className="cat-title">
          {result.text}
        </h3>
        <UniversalButton onClick={() => { toggleVisibility("cat" + index) }} customClass="arrow-btn">
          <img src={Arrow} alt="arrow" />
        </UniversalButton>
      </div>
      {visibilityProps.find((c) => c.id == "cat" + index)?.visible &&
        <div className={styles.catContainer}>
          <CategoryOneNode nodes={result.nodes} showStepThree={showStepThree}></CategoryOneNode>
        </div>}
    </div>
  ))
}

export default CategoryMainNodes;