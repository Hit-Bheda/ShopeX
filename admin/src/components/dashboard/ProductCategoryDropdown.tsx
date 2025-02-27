import { getCategories } from "@/api/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthStore } from "@/store/AuthStore";
import { useEffect, useState } from "react";

interface ResponseType {
  _id: string;
  name: string;
  description: string | null;
}

export type BasicProductCategoryDropdownProps = {
  onSelectCategory: (category: string) => void;
  placeholder?: string;
  className?: string;
  value?: string;
};

export function ProductCategoryDropdown({
  onSelectCategory,
  placeholder = "Select category",
  className,
  value,
}: BasicProductCategoryDropdownProps) {
  const [categories, setCategories] = useState<ResponseType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    const initCategories = async () => {
      if (!accessToken) return;

      setLoading(true);
      try {
        const data: ResponseType[] = await getCategories(accessToken);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
      setLoading(false);
    };

    initCategories();
  }, [accessToken]);

  return (
    <Select value={value} onValueChange={onSelectCategory}>
      <SelectTrigger className={className}>
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
}
