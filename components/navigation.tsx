"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Menu, X, ChevronRight } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";
import { useMediaQuery, useClickOutside } from "@mantine/hooks";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { navItems } from "@/constants";

export default function Navigation({
  services,
}: {
  services: { name: string; slug: string; description: string }[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const pathname = usePathname();
  const menuRef = useClickOutside(() => setIsOpen(false));

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const Logo = () => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="relative shrink-0"
    >
      <Link href="/" className="flex justify-center items-center gap-2">
        <div className="relative">
          <Image
            src="/logo.png"
            alt="Naya"
            width={200}
            height={100}
            className="object-contain"
          />
        </div>
        {/* <span className="text-xl font-semibold text-white">Naya</span> */}
      </Link>
    </motion.div>
  );

  const DesktopNav = () => (
    <NavigationMenu>
      <NavigationMenuList className="gap-1">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-primary/10 data-[state=open]:bg-primary/10 text-zinc-200">
            Services
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[400px] p-3 bg-black/95 backdrop-blur-sm border border-primary/10">
              <div className="grid gap-2">
                {services.map((service) => (
                  <Link
                    key={service.name}
                    href={`/services/${service.slug}`}
                    className="group block rounded-lg p-3 hover:bg-primary/10"
                  >
                    <div className="text-sm font-medium text-primary group-hover:underline">
                      {service.name}
                    </div>
                    <div className="text-xs text-zinc-400">
                      {service.description}
                    </div>
                  </Link>
                ))}
                <Link
                  href={"/services"}
                  className="group block rounded-lg p-3 hover:bg-primary/10"
                >
                  <div className="text-sm font-medium text-primary group-hover:underline">
                    view more
                  </div>
                  <div className="text-xs text-zinc-400">
                    see all what we got
                  </div>
                </Link>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {navItems.map((item) => (
          <NavigationMenuItem key={item.href}>
            <Link href={item.href} legacyBehavior passHref>
              <NavigationMenuLink
                className={`group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-primary/10 data-[state=open]:bg-primary/10 text-zinc-200 ${
                  pathname === item.href ? "bg-primary/10 text-primary" : ""
                }`}
              >
                {item.label}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );

  const MobileNav = () => (
    <motion.div
      ref={menuRef}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
    >
      <div className="w-full max-w-md px-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative shrink-0 mb-8"
        >
          <Link
            href="/"
            className="flex flex-col justify-center items-center gap-2"
          >
            <div className="relative">
              <Image
                src="/logoText.png"
                alt="Naya"
                width={288}
                height={60}
                className="object-contain"
              />
            </div>
          </Link>
        </motion.div>
        <nav className="space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block py-2 text-lg font-medium text-zinc-200 hover:text-primary transition-colors ${
                pathname === item.href ? "text-primary" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="services">
              <AccordionTrigger className="text-lg font-medium text-zinc-200 hover:text-primary transition-colors">
                Services
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pl-4">
                  {services.map((service) => (
                    <Link
                      key={service.name}
                      href={`/services/${service.slug}`}
                      className="block py-2 text-sm text-zinc-300 hover:text-primary transition-colors"
                    >
                      <div className="flex items-center">
                        <ChevronRight className="w-4 h-4 shrink-0 mr-2" />
                        <span>{service.name}</span>
                      </div>
                    </Link>
                  ))}
                  <Link
                    href={"/services"}
                    className="block py-2 text-sm text-zinc-300 hover:text-primary transition-colors"
                  >
                    <div className="flex items-center">
                      <ChevronRight className="w-4 h-4 shrink-0 mr-2" />
                      <span>view more</span>
                    </div>
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </nav>
        <div className="mt-8">
          <Link href="/start-project" passHref>
            <AnimatedButton
              variant="outline"
              className="w-full relative justify-center"
            >
              Get Started
              <motion.div
                animate={{
                  x: [0, 5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >
                <ArrowRight className="w-5 h-5 shrink-0" />
              </motion.div>
            </AnimatedButton>
          </Link>
        </div>
      </div>
    </motion.div>
  );

  return (
    <header className="w-full bg-black border-b border-primary/10 fixed top-0 z-40">
      <div className="container mx-auto px-4 lg:px-6 h-20 flex items-center justify-between">
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <DesktopNav />
        </div>

        {/* CTA Button and Menu Toggle */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4"
        >
          <Link href="/start-project" className="hidden lg:block">
            <AnimatedButton variant="outline">
              Get Started
              <motion.div
                animate={{
                  x: [0, 5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >
                <ArrowRight className="w-5 h-5 shrink-0" />
              </motion.div>
            </AnimatedButton>
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white hover:text-primary transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6 shrink-0 relative z-[999]" />
            ) : (
              <Menu className="w-6 h-6 shrink-0" />
            )}
          </button>
        </motion.div>

        {/* Mobile Navigation */}
        <AnimatePresence>{isMobile && isOpen && <MobileNav />}</AnimatePresence>
      </div>
    </header>
  );
}
