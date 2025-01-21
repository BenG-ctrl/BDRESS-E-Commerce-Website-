"use server";

import { fetchAuth } from "@/lib/api";

export const addToCart = async (productId: string) => {
    const response = await fetchAuth('/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to add to cart');
    }
  
    return response.json();
  };
  
  export const getCart = async () => {
    try {
    const response = await fetchAuth('/cart') 
  
    if (!response.ok) {
      throw new Error('Failed to fetch cart');
    }
  
    return await response.json();
   } catch (error) {
        console.error("Error fetching cart:", error);
        return []; // Return an empty array or handle the error as needed
      }
  };
  
  export const updateCartItem = async (productId: string, quantity: number) => {
    const response = await fetchAuth(`/cart/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to update cart item');
    }
  
    return response.json();
  };
  
  export const removeFromCart = async (productId: string) => {
    const response = await fetchAuth(`/cart/${productId}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      throw new Error('Failed to remove from cart');
    }
  
    return response.json();
  };