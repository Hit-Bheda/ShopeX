import {Ellipsis, Plus} from "lucide-react";
import {Button} from "../ui/button";
import {
    Table,
    TableBody,
    // TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {Input} from "../ui/input";
import AddProductDialog from "./AddProductDialog";

const Products = () => {
    return (
        <div className="p-2 w-full h-full border-none space-y-5">
            <div className="flex items-center flex-row justify-between w-full border-b-[1px] pb-4">
                <div>
                    <h1 className="text-[1.5rem] font-bold">Products</h1>
                    <p className="text-[.9rem] font-light">Manage Your Products!</p>
                </div>
                <AddProductDialog>
                    <Button className="flex items-center justify-between">
                        <Plus/>
                        Add Product
                    </Button>
                </AddProductDialog>
            </div>
            <div>
                <Input type="text" placeholder="Search....."/>
            </div>
            <div className="border rounded-lg">
                <Table> {" "}
                    {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Thumbnail</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Sizes</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">Image</TableCell>
                            <TableCell>Shirt</TableCell>
                            <TableCell>This Is Shirt</TableCell>
                            <TableCell>X, XL</TableCell>
                            <TableCell>56</TableCell>
                            <TableCell>$250.00</TableCell>
                            <TableCell>
                                <Ellipsis/>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default Products;
