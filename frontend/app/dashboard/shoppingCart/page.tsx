"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { updateCartItem, removeFromCart, getCart } from "@/actions/cart";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export default function ShoppingCart() {
  const [cart, setCart] = useState<any[]>([]); // Cart state

  // Fetch cart data from the backend
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cart = await getCart(); // Fetch cart data

        // Filter out any cart items with null or undefined productId
        const validCart = cart.filter((item:any) => item.productId !== null && item.productId !== undefined);

        setCart(validCart); // Set cart data
      } catch (error) {
        console.error("Error fetching cart:", error);
        setCart([]); // Set cart to empty array if there's an error
      }
    };

    fetchCart();
  }, []);

  // Calculate the total amount of the cart
  const totalAmount = cart.reduce((total, item) => {
    return total + item.productId.price * item.quantity;
  }, 0);

  // Handle updating the quantity of a cart item
  const handleQuantityChange = async (productId: string, increment: boolean) => {
    try {
      const cartItem = cart.find((item) => item.productId._id === productId);
      if (cartItem) {
        const newQuantity = increment ? cartItem.quantity + 1 : Math.max(1, cartItem.quantity - 1);
        await updateCartItem(productId, newQuantity);
        const updatedCart = await getCart(); // Re-fetch cart data

        // Filter out any cart items with null or undefined productId
        const validCart = updatedCart.filter((item: any) => item.productId !== null && item.productId !== undefined);

        setCart(validCart); // Update cart state
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

      // Filter out any cart items with null or undefined productId
      const validCart = updatedCart.filter((item: any) => item.productId !== null && item.productId !== undefined);

      setCart(validCart); // Update cart state
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-end gap-4 mb-6">
        <Link href="/clothesPage">
          <Button variant="outline">Further Purchase</Button>
        </Link>
        <Link href={`/payment?total=${totalAmount}`}>
          <Button>Go to Payment</Button>
        </Link>
      </div>

      <div className="space-y-4">
        {cart.map((item) => {
          // Skip rendering if productId is null or undefined
          if (!item.productId) return null;

          return (
            <Card key={item.productId._id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <div className="relative w-32 h-32 flex-shrink-0">
                    <Image
                      src={item.productId.image}
                      alt={item.productId.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg">{item.productId.name}</h3>
                      <p className="text-2xl font-bold">${item.productId.price.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleQuantityChange(item.productId._id, false)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleQuantityChange(item.productId._id, true)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

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
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}