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
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

type productType = z.infer<typeof ProductResponseSchema>;

const HomeProductDropdown: React.FC<Props> = ({
  value,
  onChange,
  placeholder = "Select Product!",
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<productType[]>([]);
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    const initProduct = async () => {
      if (!accessToken) return;
      setLoading(true);
      try {
        const data: productType[] = await getProducts(accessToken);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false);
    };
    initProduct();
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
        ) : products.length > 0 ? (
          products.map((product) => (
            <SelectItem key={product._id} value={product._id}>
              <div className="flex items-center gap-1">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-[20px]"
                />
                {product.name}
              </div>
            </SelectItem>
          ))
        ) : (
          <SelectItem value="no_products" disabled>
            No products available
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
};

export default HomeProductDropdown;
