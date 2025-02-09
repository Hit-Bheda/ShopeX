import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { Ellipsis, Folder, Trash2 } from "lucide-react";
  import { Button } from "../ui/button";
import { deleteCategory } from "@/api/actions";
import { useToast } from "@/hooks/use-toast";
  
  interface Props {
    id: string,
    accessToken: string | null,
    initFunction: (accessToken: string) => void
  }
  
  const CategoryActionsDropdown: React.FC<Props> = ({ id, accessToken, initFunction }) => {
    const { toast } = useToast()
  
    const handleDelete = async() => {
        console.log("hello");
        
        if(!accessToken) return
        await deleteCategory(id,accessToken)
        await initFunction(accessToken)
        toast({
          title: "✔ Success!",
          description: "Category Deleted Successfully!"
        })
    }

    const handleUpdate = () => {
      console.log("TODO: Comlete This Feature!")
    }
    
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="p-0 w-6 h-6" >
            <Ellipsis />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 rounded-lg">
          <DropdownMenuItem onClick={handleUpdate}>
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
  
  export default CategoryActionsDropdown;
  