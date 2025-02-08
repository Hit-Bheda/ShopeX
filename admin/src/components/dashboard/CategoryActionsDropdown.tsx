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
  
  interface Props {
    id: string,
    accessToken: string | null,
    initFunction: (accessToken: string) => void
  }
  
  const CategoryActionsDropdown: React.FC<Props> = ({ id, accessToken, initFunction }) => {
    const handleSubmit = () => {
      console.log("hi",id);
    }
  
    const handleDelete = async() => {
        console.log("hello");
        
        if(!accessToken) return
        const data = await deleteCategory(id,accessToken)

        await initFunction(accessToken)
        console.log("done", data);
        
    }
    
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="p-0 w-6 h-6" >
            <Ellipsis />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 rounded-lg">
          <DropdownMenuItem onClick={handleSubmit}>
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
  