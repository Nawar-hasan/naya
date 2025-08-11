"use client";

import { submitContact } from "@/app/server/actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import faPixels from "@/lib/facebook-pixels";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

type ContactFormData = z.infer<typeof schema>;
const ContactForm = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: submitContact,
    onMutate: (variables) => {
      faPixels.event("contact-request", variables);
    },
    onSettled: (params, error, variables) => {
      faPixels.event("contact-request", {
        ...params,
        error,
        variables,
      });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<ContactFormData> = (data) => {
    mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      onMouseMove={handleMouseMove}
      className="relative"
    >
      <Card className="relative overflow-hidden border-primary/20 bg-black/50 backdrop-blur-sm p-8">
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 100}% ${
              mousePosition.y * 100
            }%, rgba(255, 215, 0, 0.1), transparent 50%)`,
          }}
        />

        <div className="relative">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary via-[#B8860B] to-primary bg-clip-text text-transparent">
            Send us a Message
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-zinc-400">
                Your Name
              </Label>
              <Input
                id="name"
                {...register("name")}
                className="bg-black/30 border-primary/20 text-white focus:border-primary/50 transition-colors"
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-400">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className="bg-black/30 border-primary/20 text-white focus:border-primary/50 transition-colors"
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="text-zinc-400">
                Subject
              </Label>
              <Input
                id="subject"
                {...register("subject")}
                className="bg-black/30 border-primary/20 text-white focus:border-primary/50 transition-colors"
                placeholder="Project Inquiry"
              />
              {errors.subject && (
                <p className="text-red-500 text-sm">{errors.subject.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-zinc-400">
                Message
              </Label>
              <Textarea
                id="message"
                {...register("message")}
                className="min-h-[150px] bg-black/30 border-primary/20 text-white focus:border-primary/50 transition-colors"
                placeholder="Tell us about your project..."
              />
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-black hover:opacity-90 transition-all duration-300 py-6 rounded-md font-semibold"
            >
              <Send className="w-5 h-5 mr-2" />
              {isPending ? "Sending..." : "Send Message"}
            </Button>
          </form>

          {isSuccess && (
            <p className="mt-4 text-green-500">Message sent successfully!</p>
          )}
          {isError && (
            <p className="mt-4 text-red-500">
              Failed to send message. Please try again.
            </p>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default ContactForm;
