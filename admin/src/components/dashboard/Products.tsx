import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "../ui/input";
import AddProductDialog from "./AddProductDialog";
import ProductActionsDropdown from "./ProductActions.Dropdown";
import { useEffect, useState } from "react";
import { ProductSchema } from "@/schemas";
import { z } from "zod";
import { getProducts } from "@/api/actions";
import { useAuthStore } from "@/store/AuthStore";

type ProductType = z.infer<typeof ProductSchema>;

const Products = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const initProducts = async () => {
      if (!accessToken) return;
      const data: ProductType[] = await getProducts(accessToken);
      console.log("data", data);
      setProducts(data);
    };
    initProducts();
  }, [accessToken]);

  return (
    <div className="p-2 w-full h-full border-none space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between w-full border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-sm text-gray-600">Manage Your Products!</p>
        </div>
        <AddProductDialog>
          <Button className="flex items-center gap-2">
            <Plus size={18} />
            Add Product
          </Button>
        </AddProductDialog>
      </div>

      {/* Search Input */}
      <div>
        <Input type="text" placeholder="Search....." />
      </div>

      {/* Products Table */}
      <div className="border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Images</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Sizes</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <TableRow key={index}>
                  {/* Images - Show up to 3 */}
                  <TableCell>
                    <div className="flex gap-1">
                      {product.images.slice(0, 3).map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt="Product"
                          className="w-12 h-12 object-cover rounded-md"
                        />
                      ))}
                      {product.images.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{product.images.length - 3} more
                        </span>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="truncate max-w-[200px]">
                    {product.description || "No description"}
                  </TableCell>
                  <TableCell>{product.sizes.join(", ")}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <ProductActionsDropdown />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-4 text-gray-500"
                >
                  No products available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Products;
