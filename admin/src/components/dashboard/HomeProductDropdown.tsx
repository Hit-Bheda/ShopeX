import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { z } from "zod";
import { ProductResponseSchema } from "@/schemas";
import { getProducts } from "@/api/actions";
import { useAuthStore } from "@/store/AuthStore";

type Props = {
  placeholder?: string;
};

type productType = z.infer<typeof ProductResponseSchema>

const HomeProductDropdown: React.FC<Props> = ({
  placeholder = "Select Product!",
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [value, setValue] = useState<string>("");
  const [products, setProducts] = useState<productType[]>()
  const accessToken = useAuthStore((state) => state.accessToken)

  const onSelectCategory = (selectedValue: string) => {
    setValue(selectedValue);
  };

  const initProduct = async (accessToken: string) => {
    const data: productType[] = await getProducts(accessToken)
    setProducts(data)
  }

  useEffect(() => {
    setLoading(true)
    if(!accessToken) return
    initProduct(accessToken)
    setLoading(false)  
  }, [accessToken]);

  return (
    <Select value={value} onValueChange={onSelectCategory} >
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {loading ? (
          <SelectItem value="loading" disabled>
            Loading...
          </SelectItem>
        ) : products && products.length > 0 ? (
          products.map((product) => (
            <SelectItem key={product._id} value={product._id}>
              <div className="flex items-center gap-1">
                <img src={product.images[0]} alt="" className="w-[20px]" />
              {product.name}
              </div>
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
