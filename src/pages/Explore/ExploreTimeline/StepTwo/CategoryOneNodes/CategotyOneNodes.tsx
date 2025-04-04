import UniversalButton from "../../../../../components/General/Buttons";
import { useToggle } from "../../../../../hooks/ToggleVisibility";
import Arrow from "../../../../../assets/cat-btn.svg";
import { SublevelTreeItemModel } from "../../../Models/SublevelTreeItemModel";
import CategoryTwoNode from "../CategoryTwoNodes/CategotyTwoNodes";
import style from "./CategoryOneNodes.module.css";

interface CategoryOneNodeProps {
  nodes: SublevelTreeItemModel[];
  showStepThree: () => void,
}

const CategoryOneNode: React.FC<CategoryOneNodeProps> = ({
  nodes, showStepThree
}) => {
  const [visibilityProps, toggleVisibility] = useToggle()
  return nodes.map((node, index) => (
    <div key={"node" + index} className={style.cat}>
      <div className={style.catContainer}>
        <h3 className="cat-title">
          {node.text}
        </h3>
        <UniversalButton onClick={() => { toggleVisibility("node" + index) }} customClass="arrow-btn">
          <img src={Arrow} alt="arrow" />
        </UniversalButton>
      </div>
      {visibilityProps.find((c) => c.id == "node" + index)?.visible && <CategoryTwoNode nodes={node.nodes} showStepThree={showStepThree} />}
    </div>
  ));
}

export default CategoryOneNode;