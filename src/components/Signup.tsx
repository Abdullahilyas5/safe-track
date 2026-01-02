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
import { Cross } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


// ✅ Validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(['child', 'parent'])
});

export default function Signup() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "child",
    },
  });


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

        <h2 className="text-4xl text-[#65A30D] font-semibold mb-6 text-center">Sign Up</h2>

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
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Roles</SelectLabel>
                      <SelectItem value="child">Child</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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

          <Button type="submit" disabled={isLoading} className="w-full p-6 bg-[#65A30D] hover:bg-green-700 text-white font-semibold rounded-lg">
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
    </div>
  );
}
