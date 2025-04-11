import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getCategories } from "@/api/actions";
import { useAuthStore } from "@/store/AuthStore";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

interface categoryType {
  _id: string;
  name: string;
  description?: string;
}

const HomeCategoryDropDown: React.FC<Props> = ({
  value,
  onChange,
  placeholder = "Select Category!",
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<categoryType[]>([]);
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    const initCategories = async () => {
      if (!accessToken) return;
      setLoading(true);
      try {
        const data: categoryType[] = await getCategories(accessToken);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
      setLoading(false);
    };
    initCategories();
  }, [accessToken]);

  return (
    <Select value={value} onValueChange={onChange}>
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
              <div className="text-white">{category.name}</div>
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

export default HomeCategoryDropDown;
