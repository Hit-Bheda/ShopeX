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
import { ProductResponseSchema } from "@/schemas";
import { z } from "zod";
import { getProducts } from "@/api/actions";
import { useAuthStore } from "@/store/AuthStore";

type ProductType = z.infer<typeof ProductResponseSchema>;

const Products = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const [products, setProducts] = useState<ProductType[]>([]);

  const initProducts = async () => {
    if (!accessToken) return;
    const data: ProductType[] = await getProducts(accessToken);
    console.log("data", data);
    setProducts(data);
  };

  useEffect(() => {
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
        <AddProductDialog initFunction={initProducts}>
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
              <TableHead className="w-[120px]">Name</TableHead>
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

                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category.name}</TableCell>
                  <TableCell className="truncate max-w-[200px]">
                    {product.description || "No description"}
                  </TableCell>
                  <TableCell>{product.sizes.join(", ")}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <ProductActionsDropdown
                      id={product._id}
                      accessToken={accessToken}
                      initFunction={initProducts}
                    />
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
