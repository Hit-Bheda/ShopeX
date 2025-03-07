import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ProductCategoryDropdown } from "./ProductCategoryDropdown";
import React, { useEffect, useState } from "react";
import { createProduct, uploadSingleFile } from "@/api/actions";
import { useAuthStore } from "@/store/AuthStore";
import { ProductSchema } from "@/schemas";
import { toast } from "@/hooks/use-toast";

// Define available sizes array
const sizes = ["S", "M", "L", "XL"];

interface Props {
  children: React.ReactNode;
  initFunction: (accessToken: string) => void;
}

const AddProductDialog: React.FC<Props> = ({ children, initFunction }) => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      images: [] as string[],
      name: "",
      category: "",
      description: "",
      quantity: 1,
      price: 0.0,
      sizes: [] as string[],
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0 && accessToken) {
      if (images.length >= 2) {
        alert("You can only upload up to 2 images.");
        return;
      }

      setLoading(true);
      const file: File = e.target.files[0];
      if (!file) {
        console.log("File Not Found!");
        setLoading(false);
        return;
      }

      const data = await uploadSingleFile(accessToken, file);
      setImages((prevImages) => [...prevImages, data.url]);
      console.log("File Uploaded Successfully!", data.url);
      console.log(images);
      setLoading(false);
    }
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: z.infer<typeof ProductSchema>) => {
    if (!accessToken) return;
    console.log(data);
    await createProduct(data, accessToken);
    setOpen(false);
    await initFunction(accessToken);
    toast({
      title: "✅ Success!",
      description: "Product Added Successfully!",
    });
  };

  useEffect(() => {
    form.setValue("images", images);
  }, [images]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[100vh]">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
          <DialogDescription>
            Add a new product here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex justify-between items-center gap-4"
          >
            <div className="w-1/2 drag-drop gap-2 flex flex-col">
              <FormField
                control={form.control}
                name="images"
                render={() => (
                  <FormItem>
                    <FormLabel>Upload Image (Max 2)</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".png, .jpeg, .jpg"
                        multiple
                        onChange={handleFileChange}
                        disabled={loading || images.length >= 2}
                        className="cursor-pointer"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div
                className={
                  images.length > 0 ? "flex gap-4 items-start" : "hidden"
                }
              >
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Image ${index + 1}`}
                      className="w-[100px] h-auto object-contain cursor-pointer bg-zinc-900 rounded p-1"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-full"
                      onClick={() => removeImage(index)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-1/2">
              <div className="flex justify-between gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="T-Shirt" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <ProductCategoryDropdown
                          onSelectCategory={field.onChange}
                          value={field.value}
                          placeholder="Choose a category"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="This is the description!"
                        className="max-h-[150px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2 justify-between">
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} placeholder="10-15.." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          placeholder="0.0$"
                          step="0.01"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="sizes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available Sizes</FormLabel>
                    <FormControl>
                      <div className="flex flex-wrap gap-2">
                        {sizes.map((size) => (
                          <Button
                            key={size}
                            variant={
                              field.value.includes(size) ? "default" : "outline"
                            }
                            className="w-10 h-10 text-sm"
                            onClick={(e) => {
                              e.preventDefault();
                              field.onChange(
                                field.value.includes(size)
                                  ? field.value.filter(
                                      (s: string) => s !== size,
                                    )
                                  : [...field.value, size],
                              );
                            }}
                          >
                            {size}
                          </Button>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
