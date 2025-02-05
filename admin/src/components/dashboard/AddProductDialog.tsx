import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import React from "react";
import { Textarea } from "../ui/textarea";
import { ProductCategoryDropdown } from "./ProductCategoryDropdown";
import { SizeSelector } from "./SizeSelector";

interface Props {
  children: React.ReactNode;
}

const AddProductDialog: React.FC<Props> = ({ children }) => {
  const handleCategorySelect = (category: string) => {
    console.log("Selected category:", category);
    // Here you would typically update your state or trigger a data fetch
  };
  const handleSizeChange = (sizes: string[]) => {
    console.log("Selected sizes:", sizes)
    // Here you would typically update your state or trigger a data fetch
  }
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[100vh]">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
          <DialogDescription>
            Add new product here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="image">Upload Image</Label>
            <Input id="image" type="file" className="cursor-pointer" />
          </div>
          <div className="flex justify-between">
            <div>
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" placeholder="T-Shirt" />
              </div>
            </div>
            <div>
              <div className="grid gap-2">
                <Label>Category</Label>
                <ProductCategoryDropdown
                  onSelectCategory={handleCategorySelect}
                  placeholder="Choose a category"
                  className="w-[200px]"
                />
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="This is description!" className="max-h-[150px]" />
          </div>

          <div className="flex gap-2 justify-between">
            <div>
              <div className="grid gap-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input type="number" id="quantity" placeholder="10-15.." />
              </div>
            </div>
            <div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price</Label>
                <Input type="number" id="price" placeholder="0.0$" />
              </div>
            </div>
          </div>

          <div className="grid">
            <SizeSelector onSizeChange={handleSizeChange}/>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
