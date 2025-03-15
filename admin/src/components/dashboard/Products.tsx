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
import { TableSkeleton } from "../Skeletons";

type ProductType = z.infer<typeof ProductResponseSchema>;

const Products = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const [products, setProducts] = useState<ProductType[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const initProducts = async () => {
    if (!accessToken) return;

    setIsLoading(true);
    try {
      const data: ProductType[] = await getProducts(accessToken);
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initProducts();
  }, [accessToken]);

  // Filter products based on search query
  const filteredProducts = products?.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
        <Input
          type="text"
          placeholder="Search by name, category or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
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
            {isLoading ? (
              <TableSkeleton cols={7} />
            ) : filteredProducts && filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <TableRow key={index}>
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
                  colSpan={7}
                  className="text-center py-4 text-gray-500"
                >
                  {searchQuery
                    ? "No matching products found"
                    : "No products available"}
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
