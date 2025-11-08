"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react"; // ✅ import NextAuth signIn

// ✅ Validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});





export default function Signup() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });


  // useEffect(() => {
  //   (async () => {
  //     const res = await fetch("api/user/route.ts");
  //     const data = await res.json();
  //     console.log("Data from backend on mount:", data);
  //     alert("Data from backend on mount: " + JSON.stringify(data));
  //   })();
  // }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      setError("");

      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to sign up");
      }

      // After successful signup, redirect to signin page
      window.location.href = '/signin';
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      console.error("Signup error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Simplified Google auth
  const handleGoogleAuth = () => {
    signIn("google", {
      callbackUrl: "/callback",
      redirect: true,
    });
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
      <Form {...form}>
        <h2 className="text-4xl font-semibold mb-6 text-center">Sign Up</h2>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input className="w-full" placeholder="Enter your name" {...field} />
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
                  <Input className="w-full" placeholder="Enter your email" {...field} />
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
                  <Input className="w-full" type="password" placeholder="Enter password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && (
            <div className="text-red-500 text-sm mt-2">{error}</div>
          )}

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Signing up..." : "Sign Up"}
          </Button>
        </form>
      </Form>

      <div className="text-center mt-4">
        <span>
          Already have an account?{" "}
          <Link href="/Signin" className="text-blue-600 hover:underline">
            Signin
          </Link>
        </span>
      </div>

      <Button
        onClick={handleGoogleAuth}
        className="w-full mt-4 flex bg-white items-center justify-center gap-2 border border-gray-300 text-gray-700 hover:bg-gray-100"
      >
        <FcGoogle size={20} />
        Sign up with Google
      </Button>

      <Button
        onClick={async () => {
          await fetch("/api/user",{
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then(response => response.json())
            .then(data => {
              console.log("Response from backend:", data);
              alert("Response from backend: " + JSON.stringify(data));
            })
            .catch(error => {
              console.error("Error fetching from backend:", error);
              alert("Error fetching from backend: " + error.message);
            });
        }}
        className="w-full mt-4 flex bg-white items-center justify-center gap-2 border border-gray-300 text-gray-700 hover:bg-gray-100"
      >
        <FcGoogle size={20} />
        working with backend
      </Button>
    </div>
  );
}
