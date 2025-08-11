"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios, { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/ui/login-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Define the Zod schema for form validation
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

// Infer the type from the schema
type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  // Initialize the form with React Hook Form and Zod resolver
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormValues) => {
      const response = await axios.post("/api/login", data);
      return response.data;
    },
    onSuccess: (data) => {
      document.cookie = `auth-token=${data.token}; path=/`;
      router.push("/dashboard");
      toast({
        title: "Success",
        description: "Logged in successfully",
        variant: "default",
      });
    },
    onError: (error: AxiosError) => {
      toast({
        title: "Error",
        description:
          //@ts-expect-error error response
          error.response?.data?.message || "An unexpected error occurred",
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: LoginFormValues) {
    loginMutation.mutate(data);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      <div className="relative z-10">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at ${50}% ${50}%, rgba(218,165,32,0.15), transparent ${
                  40 + i * 20
                }%)`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.2, 0.3],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#FFD700] pointer-events-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: Math.random() * 2,
            }}
          />
        ))}

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="w-[400px] border-[#FFD700]/20 bg-black/90 backdrop-blur-xl">
              {/* Logo */}
              <div className="absolute -top-20 left-1/2 -translate-x-1/2">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#FFD700] to-[#DAA520] p-[2px]"
                >
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <span className="text-3xl font-bold bg-gradient-to-r from-[#FFD700] via-[#DAA520] to-[#FFD700] bg-clip-text text-transparent">
                      GR
                    </span>
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FFD700] to-[#DAA520] blur-xl opacity-50" />
                </motion.div>
              </div>

              <CardHeader className="space-y-1 pt-6">
                <CardTitle className="text-2xl text-center bg-gradient-to-r from-[#FFD700] via-[#DAA520] to-[#FFD700] bg-clip-text text-transparent">
                  Welcome Back
                </CardTitle>
                <CardDescription className="text-center text-zinc-400">
                  Enter your credentials to access the dashboard
                </CardDescription>
              </CardHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <CardContent className="grid gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-400">Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                              <Input
                                {...field}
                                type="email"
                                placeholder="name@example.com"
                                className="border-[#FFD700]/20 bg-black/50 text-white pl-10"
                              />
                            </div>
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
                          <FormLabel className="text-zinc-400">
                            Password
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                              <Input
                                {...field}
                                type={showPassword ? "text" : "password"}
                                className="border-[#FFD700]/20 bg-black/50 text-white pl-10 pr-10"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4 text-zinc-500" />
                                ) : (
                                  <Eye className="h-4 w-4 text-zinc-500" />
                                )}
                                <span className="sr-only">
                                  {showPassword
                                    ? "Hide password"
                                    : "Show password"}
                                </span>
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="w-full"
                    >
                      <LoginButton
                        type="submit"
                        disabled={loginMutation.isPending}
                        isLoading={loginMutation.isPending}
                      >
                        {loginMutation.isPending ? "Signing in..." : "Sign in"}
                      </LoginButton>
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="text-sm text-zinc-500 text-center"
                    >
                      Demo credentials: admin@example.com / password
                    </motion.p>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
