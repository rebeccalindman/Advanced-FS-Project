import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface Category {
  id: number;
  name: string;
  icon: string;
}

interface CheckboxesProps {
  selectedCategories: number[];
  setSelectedCategories: (categories: number[]) => void;
}

const Checkboxes: React.FC<CheckboxesProps> = ({ selectedCategories, setSelectedCategories }) => {
  const categories = useSelector((state: RootState) => state.notes.categories);

  if (!categories || categories.length === 0) {
    return <p>Loading categories...</p>;
  }

  const handleCheckboxChange = (id: number) => {
    setSelectedCategories(
      selectedCategories.includes(id)
        ? selectedCategories.filter((categoryId) => categoryId !== id)
        : [...selectedCategories, id]
    );
  };

  return (
    <div className="flex flex-row">
      {categories.map((category) => (
        <label className="flex flex-row items-center" key={category.id}>
          <input className="accent-mint m-2"
            type="checkbox"
            checked={selectedCategories.includes(category.id)}
            onChange={() => handleCheckboxChange(category.id)}
          />
          <span>{category.icon} {category.name}</span> {/* ✅ Ensures text stays aligned */}
        </label>
      ))}
    </div>
  );
};

export default Checkboxes;
