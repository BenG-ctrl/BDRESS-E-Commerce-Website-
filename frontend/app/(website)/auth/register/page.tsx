"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { register, loginWithGoogle } from "@/actions/auth";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { signIn } from "@/auth";
import { generateVerificationToken } from "@/lib/auth";

const formSchema = z.object({
  name: z.string().min(2, "Name should be at least 2 characters").max(50),
  email: z.string().email("Email is invalid"),
  password: z.string().min(8, "Password must be at least 8 characters long").refine((val) => {
    const hasUpperCase = /[A-Z]/.test(val);
    const hasLowerCase = /[a-z]/.test(val);
    const hasSpecialChar = /[!@#\\$%\\^&\\*]/.test(val);
    return hasUpperCase && hasLowerCase && hasSpecialChar;
  }, {
    message: "Password must include 1 uppercase, 1 lowercase, and 1 special character",
  }),
});

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    
    
    await register(values);

    window.location.href = "/";
  }

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex justify-center">
                  <div className="relative w-26 h-26">
                    <Image
                      src="/bdress-high-resolution-logo.png"
                      alt="Logo"
                      width={128}
                      height={128}
                    />
                  </div>
                </div>
                {error && (
                  <div className="text-red-500 text-center">{error}</div>
                )}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Name" className="bg-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" className="bg-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="Password" className="bg-white" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Register
                </Button>
              </form>
            </Form>
            <form action={loginWithGoogle}>
              <div className="mt-4">
                <Button type="submit" className="w-full">
                  Sign Up with Google
                </Button>
              </div>
            </form>
            <div className="text-center mt-4">
              <Link href="/auth/login" className="text-sm hover:underline">
                Already have an account? Click here
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}