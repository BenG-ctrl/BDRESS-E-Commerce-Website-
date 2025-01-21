"use server";

import { signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";

export const login = async (credentials: { email: string; password: string }) => {
  try {
    const result = await signIn('credentials', {
      ...credentials,
      redirect: false,
    });
    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return { error: "Invalid credentials" };
  }
};


export const register = async (credentials: { name: string; email: string; password: string }) => {
  try {
    const response = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

  

    if (!response.ok) {
      const data = await response.json();
      return { error: data.message || "Registration failed" };
    }

    const data = await response.json();
    await signIn("credentials", { email: credentials.email, password: credentials.password, redirect: false });

    return { message: "Registration successful" };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "An unexpected error occurred" };
  }
}; 

export const logout = async () => {
  return await signOut();
};

export const loginWithGoogle = async () => {
    return await signIn("google" ); 
};


