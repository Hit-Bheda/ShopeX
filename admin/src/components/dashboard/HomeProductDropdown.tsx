import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  placeholder?: string;
};

const HomeProductDropdown: React.FC<Props> = ({
  placeholder = "Select Product!",
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [value, setValue] = useState<string>("");

  const categories = [
    {
      _id: "1",
      name: "this",
    },
  ];

  const onSelectCategory = (selectedValue: string) => {
    setValue(selectedValue);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <Select value={value} onValueChange={onSelectCategory}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {loading ? (
          <SelectItem value="loading" disabled>
            Loading...
          </SelectItem>
        ) : categories.length > 0 ? (
          categories.map((category) => (
            <SelectItem key={category._id} value={category._id}>
              {category.name}
            </SelectItem>
          ))
        ) : (
          <SelectItem value="no_categories" disabled>
            No categories available
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
};

export default HomeProductDropdown;
