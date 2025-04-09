import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Folder, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { deleteProduct } from "@/api/actions";
import { toast } from "@/hooks/use-toast";
import EditProductDialog from "./EditProductDialog";
import { z } from "zod";
import { ProductResponseSchema } from "@/schemas";

interface Props {
  id: string;
  accessToken: string | null;
  product: z.infer<typeof ProductResponseSchema>;
  initFunction: (accessToken: string) => void;
}

const ProductActionsDropdown: React.FC<Props> = ({
  id,
  accessToken,
  initFunction,
  product,
}) => {
  const handleDelete = async () => {
    if (!accessToken) return;

    try {
      await deleteProduct(id, accessToken);
      initFunction(accessToken);
      toast({
        title: "✅ Success!",
        description: "Product Deleted Successfully!",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "❌ Error!",
        description: "Failed to delete product. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-0 w-8 h-8">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 rounded-lg">
        <EditProductDialog initFunction={initFunction} product={product}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Folder className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Edit</span>
          </DropdownMenuItem>
        </EditProductDialog>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete}>
          <Trash2 className="mr-2 h-4 w-4 text-muted-foreground" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProductActionsDropdown;
