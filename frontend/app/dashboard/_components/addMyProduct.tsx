'use client'

import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { X } from 'lucide-react'
import { addProducts } from '@/actions/product'
import { toast } from '@/hooks/use-toast'

const categories = [
  { value: "casual-wear", label: "Casual Wear" },
  { value: "formal-wear", label: "Formal Wear" },
  { value: "sportswear", label: "Sportswear/Activewear" },
  { value: "workwear", label: "Workwear" },
  { value: "loungewear", label: "Loungewear" },
  { value: "mens-clothing", label: "Men's Clothing" },
  { value: "womens-clothing", label: "Women's Clothing" },
  { value: "unisex-clothing", label: "Unisex Clothing" },
  { value: "summer-clothing", label: "Summer Clothing" },
  { value: "winter-clothing", label: "Winter Clothing" },
  { value: "rainy-season-clothing", label: "Rainy Season Clothing" },
  { value: "spring-autumn-clothing", label: "Spring/Autumn Clothing" },
  { value: "cotton-clothing", label: "Cotton Clothing" },
  { value: "woolen-clothing", label: "Woolen Clothing" },
  { value: "silk-clothing", label: "Silk Clothing" },
  { value: "denim-clothing", label: "Denim Clothing" },
  { value: "synthetic-clothing", label: "Synthetic Clothing" },
  { value: "party-wear", label: "Party Wear" },
  { value: "wedding-wear", label: "Wedding Wear" },
  { value: "cultural-traditional-wear", label: "Cultural/Traditional Wear" },
  { value: "outdoor-adventure-clothing", label: "Outdoor/Adventure Clothing" },
  { value: "swimwear", label: "Swimwear" },
  { value: "sleepwear", label: "Sleepwear" },
  { value: "maternity-wear", label: "Maternity Wear" },
]

const materials = [
  { value: "cotton", label: "Cotton" },
  { value: "wool", label: "Wool" },
  { value: "silk", label: "Silk" },
  { value: "denim", label: "Denim" },
  { value: "Fur", label: "Fur" },
  { value: "synthetic", label: "Synthetic" },
  { value: "leather", label: "Leather" },
  { value: "fabric", label: "Fabric" },
  { value: "nylon", label: "Nylon" },
  { value: "polyester", label: "Polyester" },
  { value: "spandex", label: "Spandex" },
  { value: "polyamide", label: "Polyamide" },
]

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  price: z
    .number()
    .min(0.01, { message: "Price must be greater than 0." }), // Ensure price is greater than 0
  category: z.string().min(1, { message: "Category is required." }),
  materials: z.string().min(1, { message: "material is required." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  image: z.any(),
});

type ProductFormValues = z.infer<typeof formSchema>

export function ProductAddModal() {
  const [open, setOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      category: "",
      materials: "",
      description: "",
      image: "",
    },
  });

  const [file, setFile] = useState<any>();

   // Function to generate description using Hugging Face API
   const generateDescription = async () => {
    const name = form.getValues("name");
    const category = form.getValues("category");
    const materials = form.getValues("materials");
  
    if (!name || !category || !materials) {
      toast({
        title: "Error",
        description: "Please fill in the name, category, and material fields.",
        variant: "destructive",
      });
      return;
    }
  
    setIsGenerating(true);
  
    try {
      console.log("Sending request to generate description with:", { name, category, materials });
  
      const response = await fetch("/api/generate-description", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, category, materials }),
      });
  
      console.log("Response status:", response.status);
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response data:", errorData);
        throw new Error("Failed to generate description");
      }
  
      const data = await response.json();
      console.log("Generated description:", data.description);
  
      form.setValue("description", data.description); // Set the generated description
    } catch (error) {
      console.error("Error generating description:", error);
      toast({
        title: "Error",
        description: "Failed to generate description. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  async function onSubmit(values: ProductFormValues) {
    try {
      let formData = new FormData();
      formData.append('name', values.name);
      formData.append('price', String(values.price));
      formData.append('category', values.category);
      formData.append('materials', values.materials);
      formData.append('description', values.description);
      formData.append('image', file, file.name);

      await addProducts(formData);
      setOpen(false); // Close the dialog after submission
      form.reset(); // Reset the form
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Product name" {...field} />
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
      <FormLabel>Price (€)</FormLabel>
      <FormControl>
        <Input
          type="number"
          placeholder="0.00"
          {...field}
          onChange={(e) => {
            const value = e.target.value;

            // Allow positive numbers with optional 1 or 2 decimal places
            if (/^\d*\.?\d{0,2}$/.test(value)) {
              const numericValue = parseFloat(value);
              if (!isNaN(numericValue) && numericValue >= 0) {
                field.onChange(numericValue);
              } else {
                field.onChange(0);
              }
            }
          }}
          value={field.value === 0 ? "" : field.value} // Display raw value
          min="0"
          step="0.01"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>     
           <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
              <FormField
              control={form.control}
              name="materials"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Material</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a material" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {materials.map((material) => (
                        <SelectItem key={material.value} value={material.value}>
                          {material.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Product description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              onClick={generateDescription}
              disabled={isGenerating}
              variant="outline"
            >
              {isGenerating ? "Generating..." : "Generate Description"}
            </Button>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input id="image" type="file" onChange={(e) => setFile(e.target.files![0])} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Create</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}