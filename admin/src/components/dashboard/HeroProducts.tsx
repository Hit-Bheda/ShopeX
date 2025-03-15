"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Save } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import HomeProductDropdown from "./HomeProductDropdown";
import { setHeroProducts } from "@/api/actions";
import { useAuthStore } from "@/store/AuthStore";

const formSchema = z.object({
  product1: z.string().min(1, "Product 1 is required"),
  product2: z.string().min(1, "Product 2 is required"),
});

const HeroProducts = () => {
  const { toast } = useToast();
  const accessToken = useAuthStore((state) => state.accessToken);
  const [isPending, setIsPending] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product1: "",
      product2: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!accessToken) return;
      setIsPending(true);
      console.log("Selected Products:", values);
      await setHeroProducts(accessToken, values);
      toast({
        title: "✅ Success!",
        description: "Products saved successfully!",
      });
    } catch (error) {
      toast({
        title: "❌ Error!",
        description: String(error),
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold">
          Manage The Home Page!
        </CardTitle>
        <CardDescription>
          Select featured products to display on your homepage
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="product1"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="font-medium">Product 1</FormLabel>
                    <FormControl>
                      <HomeProductDropdown {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="product2"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="font-medium">Product 2</FormLabel>
                    <FormControl>
                      <HomeProductDropdown {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="border-t bg-muted/10 px-6 py-4">
            <Button type="submit" disabled={isPending} className="ml-auto">
              {isPending ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default HeroProducts;
