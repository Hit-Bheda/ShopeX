import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, Folder, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

const ProductActionsDropdown = () => {
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
        <DropdownMenuItem>
          <Trash2 className="text-muted-foreground" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProductActionsDropdown;
