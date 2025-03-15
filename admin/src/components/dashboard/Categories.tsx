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
import AddCategoryDialog from "./AddCategoryDialog";
import { useCallback, useEffect, useState } from "react";
import { useAuthStore } from "@/store/AuthStore";
import { getCategories } from "@/api/actions";
import CategoryActionsDropdown from "./CategoryActionsDropdown";
import { TableSkeleton } from "../Skeletons";

interface ResponseType {
  _id: string;
  name: string;
  description: string | null;
}

const Categories = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const [data, setData] = useState<ResponseType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCategories = useCallback(async () => {
    try {
      if (!accessToken) return;
      setLoading(true);
      const categories = await getCategories(accessToken);
      setData(categories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div className="p-2 w-full h-full border-none space-y-5">
      {/* Header */}
      <div className="flex items-center flex-row justify-between w-full border-b-[1px] pb-4">
        <div>
          <h1 className="text-[1.5rem] font-bold">Categories</h1>
          <p className="text-[.9rem] font-light">Manage Your Categories!</p>
        </div>
        <AddCategoryDialog initFunction={fetchCategories}>
          <Button className="flex items-center justify-between">
            <Plus />
            Add Category
          </Button>
        </AddCategoryDialog>
      </div>

      {/* Search Input */}
      <Input type="text" placeholder="Search..." />

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableSkeleton cols={3} />
            ) : data && data.length > 0 ? (
              data.map((category) => (
                <TableRow key={category._id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.description || "N/A"}</TableCell>
                  <TableCell>
                    <CategoryActionsDropdown
                      id={category._id}
                      accessToken={accessToken}
                      getCategories={fetchCategories}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4">
                  No categories found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Categories;
