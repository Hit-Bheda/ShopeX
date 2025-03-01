import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, Folder, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { deleteProduct } from "@/api/actions";
import { toast } from "@/hooks/use-toast";

interface Props {
  id: string;
  accessToken: string | null;
  initFunction: (accessToken: string) => void;
}

const ProductActionsDropdown: React.FC<Props> = ({
  id,
  accessToken,
  initFunction,
}) => {
  const handleDelete = async () => {
    if (!accessToken) return;
    await deleteProduct(id, accessToken);
    initFunction(accessToken);
    toast({
      title: "✔ Success!",
      description: "Product Deleted Successfully!",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-0 w-6 h-6">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 rounded-lg">
        <DropdownMenuItem>
          <Folder className="text-muted-foreground" />
          <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete}>
          <Trash2 className="text-muted-foreground" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProductActionsDropdown;
