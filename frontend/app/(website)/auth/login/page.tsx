"use client";
import { useState } from "react";
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
import { login, loginWithGoogle } from "@/actions/auth";

const formSchema = z.object({
  email: z.string().email("Email is invalid"),
  password: z.string().min(1, "Password is required"),
});

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const result: any = await login(values);

      if (result?.error) {
        setError(result.error); // Display the error message
      } else {
        // Redirect to the profile page after successful login
        window.location.href = "/";
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
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
                  Login
                </Button>
              </form>
            </Form>
            <form action={loginWithGoogle}>
              <div className="mt-4">
                <Button type="submit" className="w-full">
                  Sign in with Google
                </Button>
              </div>
            </form>
            <div className="text-center mt-4">
              <Link href="/auth/register" className="text-sm hover:underline">
                Not yet registered? Click here
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}