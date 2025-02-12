import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ProductCategoryDropdown } from "./ProductCategoryDropdown";

// Define available sizes array
const sizes = ['S', 'M', 'L', 'XL'];

const formSchema = z.object({
  image: z.string().min(1, "Image Is Required!"),
  name: z.string().min(1, "Product name is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().optional(),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  price: z.coerce.number().min(0.01, "Price must be at least 0.01"),
  // Fixed array validation
  sizes: z.array(z.string()).min(1, "Please Select Available Sizes!")
});

interface Props {
  children: React.ReactNode;
}

const AddProductDialog: React.FC<Props> = ({ children }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: "",
      name: "",
      category: "",
      description: "",
      quantity: 1,
      price: 0.0,
      sizes: [] as string[] // Fixed default value for array
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[100vh]">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
          <DialogDescription>
            Add a new product here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex">
            <div className="w-1/2 p-4">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Image</FormLabel>
                  <FormControl>
                    <Input 
                      type="file" 
                      onChange={(e) => field.onChange(e.target.files?.[0]?.name || '')}
                      className="cursor-pointer" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
            <div className="w-1/2 ">
            
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
                    <Textarea {...field} placeholder="This is the description!" className="max-h-[150px]" />
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
                          variant={field.value.includes(size) ? "default" : "outline"}
                          className="w-10 h-10 text-sm"
                          onClick={(e) => {
                            e.preventDefault();
                            field.onChange(
                              field.value.includes(size)
                                ? field.value.filter((s: string) => s !== size)
                                : [...field.value, size]
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
}

export default AddProductDialog;