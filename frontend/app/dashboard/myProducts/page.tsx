import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProductAddModal } from "../_components/addMyProduct";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchProducts, deleteProduct } from "@/actions/product";
import { auth } from "@/auth";


export default async function ProductsPage() {
  const session = await auth();
console.log(session);
  if (!session) {
    return <div>Please log in to view your products.</div>;
  }

  let products = [];

  try {
    products = await fetchProducts();
  } catch (error) {
    console.error("Error fetching products:", error);
    return <div>Failed to fetch products. Please try again later.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-background">
      <div className="flex justify-between items-center p-4 md:p-6 ">
        <h1 className="text-2xl md:text-3xl font-bold">Your Products</h1>
        <ProductAddModal />
      </div>
      <ScrollArea className="flex-grow w-full">
        <div className="p-4 md:p-6">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="hidden md:table-cell">
                  Description
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product: any) => (
                <TableRow key={product._id}>
                  <TableCell>
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={80}
                      height={80}
                      className="rounded-md object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell className="hidden md:table-cell max-w-xs truncate">
                    {product.description}
                  </TableCell>
                  <TableCell>
                    <form
                      action={async () => {
                        "use server";
                        await deleteProduct(product._id);
                      }}
                    >
                      <Button variant="destructive">
                        <Trash />
                      </Button>
                    </form>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </div>
  );
}