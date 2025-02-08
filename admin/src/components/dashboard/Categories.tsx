import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Input } from "../ui/input";
import AddCategoryDialog from "./AddCategoryDialog";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/AuthStore";
import { getCategories } from "@/api/actions";
import ProductActionsDropdown from "./ProductActions.Dropdown";

interface ResponseType {
    id: string,
    name: string,
    description: string | null
}

const Categories = () => {
    const accessToken = useAuthStore((state) => state.accessToken);
    const [data, setData] = useState<ResponseType[]>([]);

    useEffect(() => {
        const initCategories = async (accessToken: string | null) => {
            if (!accessToken) return;
            const categories = await getCategories(accessToken);
            setData(categories); 
        };
        initCategories(accessToken);
    }, [accessToken]);

    return (
        <div className="p-2 w-full h-full border-none space-y-5">
            <div className="flex items-center flex-row justify-between w-full border-b-[1px] pb-4">
                <div>
                    <h1 className="text-[1.5rem] font-bold">Categories</h1>
                    <p className="text-[.9rem] font-light">Manage Your Categories!</p>
                </div>
                <AddCategoryDialog>
                    <Button className="flex items-center justify-between">
                        <Plus />
                        Add Category
                    </Button>
                </AddCategoryDialog>
            </div>
            <div>
                <Input type="text" placeholder="Search....." />
            </div>
            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length > 0 ? (
                            data.map((category, index) => (
                                <TableRow key={index}>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell>{category.description}</TableCell>
                                    <TableCell>
                                        <ProductActionsDropdown />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={2} className="text-center">
                                    No categories available.
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
