"use server";

import { fetchAuth } from "@/lib/api";
import { revalidatePath } from "next/cache";

export const fetchProducts = async () => {
  try {
    const res = await fetchAuth("/myProducts");
    if (!res.ok) {
      const errorData = await res.json();
      if (res.status === 404) {
        throw new Error("No products found for this user.");
      } else {
        throw new Error("Failed to fetch products");
      }
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
};

export const fetchAllProducts = async () => {
  try {
    const res = await fetchAuth("/myProducts/all"); // Call the new endpoint
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to fetch all products");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch All Products Error:", error);
    throw error;
  }
};

export const addProducts = async (formData: FormData) => {
  try {
    const res = await fetchAuth("/myProducts", {
      method: "POST",
      body: formData,
    });
    revalidatePath("dashboard/myProducts");
    return res.json();
  } catch (error) {
    console.error("Error adding product:", error);
    throw new Error("Failed to add product");
  }
};

const uploadImageToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ml_default"); // Replace with your Cloudinary upload preset

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/ddkvbmw87/image/upload", // Replace with your Cloudinary cloud name
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();
  return data.secure_url;
};

export const deleteProduct = async (id: string) => {
  const res = await fetchAuth(`/myProducts/${id}`, {
    method: "DELETE",
  });
  revalidatePath("dashboard/myProducts");
  return res.json();
};