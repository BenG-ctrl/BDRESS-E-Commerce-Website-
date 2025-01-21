"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fetchAllProducts } from "@/actions/product";
import Pagination from "./pagination"; // Assuming you have a Pagination component
import { Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { addToCart, updateCartItem, removeFromCart, getCart } from "@/actions/cart";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<any[]>([]); // Cart state
  const [isSliderOpen, setIsSliderOpen] = useState(false); // State to control the slider
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 3;

  // Fetch products and cart data
  useEffect(() => {
    const getData = async () => {
      try {
        const products = await fetchAllProducts();
        const cart = await getCart(); // Fetch cart data from the backend

        // Filter out any cart items with null or undefined productId
        const validCart = cart.filter((item: any) => item.productId !== null && item.productId !== undefined);

        setProducts(products);
        setCart(validCart); // Set cart data
        setTotalPages(Math.ceil(products.length / productsPerPage));
      } catch (error) {
        console.error("Error fetching data:", error);
        setCart([]); // Set cart to empty array if there's an error
      }
    };
    getData();
  }, []);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle adding a product to the cart
  const handleAddToCart = async (productId: string) => {
    try {
      await addToCart(productId);
      const updatedCart = await getCart(); // Re-fetch cart data
      setCart(updatedCart); // Update cart state
      setIsSliderOpen(true); // Open the slider after adding an item
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Handle updating the quantity of a cart item
  const handleQuantityChange = async (id: string, increment: boolean) => {
    try {
      // Find the cart item with the matching productId
      const cartItem = cart.find((item) => item.productId && item.productId._id === id);
  
      // If the cart item is found and productId is not null/undefined
      if (cartItem && cartItem.productId) {
        const newQuantity = increment ? cartItem.quantity + 1 : Math.max(1, cartItem.quantity - 1);
  
        // Update the quantity in the backend
        await updateCartItem(id, newQuantity);
  
        // Re-fetch the cart data to ensure it's up-to-date
        const updatedCart = await getCart();
  
        // Filter out any cart items with null or undefined productId
        const validCart = updatedCart.filter((item: any) => item.productId !== null && item.productId !== undefined);
  
        // Update the cart state
        setCart(validCart);
      } else {
        console.error("Cart item not found or productId is null/undefined");
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };
  // Handle removing a product from the cart
  const handleRemoveFromCart = async (productId: string) => {
    try {
      await removeFromCart(productId);
      const updatedCart = await getCart(); // Re-fetch cart data
      setCart(updatedCart); // Update cart state
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  // Close the cart slider
  const handleCloseSlider = () => {
    setIsSliderOpen(false);
  };

  // Paginate products
  const paginatedProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div>
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex justify-end">
          <Link href="/dashboard/shoppingCart">
            <Button>Go to Cart</Button>
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProducts.map((product) => (
            <Card key={product._id} className="w-full">
              <CardContent className="p-0">
                <div className="relative h-[200px]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold truncate">{product.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold">${product.price.toFixed(2)}</span>
                    <Button size="sm" onClick={() => handleAddToCart(product._id)}>
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        {/* Cart Slider */}
        {isSliderOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
    <div className="bg-white w-96 p-6 overflow-y-auto">
      <h2 className="font-semibold text-xl mb-4">Your Cart</h2>
      {cart.map((item) => {
        // Skip rendering if productId is null or undefined
        if (!item.productId) return null;

        return (
          <div key={`${item.productId._id}-${item.productId.name}`} className="mb-4">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 flex-shrink-0">
                <Image
                  src={item.productId.image}
                  alt={item.productId.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{item.productId.name}</h3>
                <p className="text-sm text-gray-500">${item.productId.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(item.productId._id, false)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(item.productId._id, true)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleRemoveFromCart(item.productId._id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        );
      })}
      <Button className="mt-4" onClick={handleCloseSlider}>
        Close
      </Button>
    </div>
  </div>
)}
      </div>
    </div>
  );
}