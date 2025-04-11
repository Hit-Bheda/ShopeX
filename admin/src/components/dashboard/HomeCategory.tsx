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
import { setHomeCategory } from "@/api/actions";
import { useAuthStore } from "@/store/AuthStore";
import HomeCategoryDropdown from "./HomeCategoryDropdown";

const formSchema = z.object({
  _id: z.string().min(1, "Id is required"),
});

const HomeCategory = () => {
  const { toast } = useToast();
  const accessToken = useAuthStore((state) => state.accessToken);
  const [isPending, setIsPending] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      _id: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!accessToken) return;
      setIsPending(true);
      console.log("Selected Products:", values);
      await setHomeCategory(accessToken, values);
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
                name="_id"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="font-medium">Category</FormLabel>
                    <FormControl>
                      <HomeCategoryDropdown {...field} />
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

export default HomeCategory;
