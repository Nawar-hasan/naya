import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { MotionClient } from "@/components/ui/MotionClient";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />

        {/* Animated particles */}
        {[...Array(50)].map((_, i) => (
          <MotionClient
            key={i}
            className="absolute w-1 h-1 bg-primary"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}

        {/* Decorative lines */}
        {[...Array(5)].map((_, i) => (
          <MotionClient
            key={i}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
            style={{
              top: `${(i + 1) * 20}%`,
            }}
            animate={{
              scaleX: [1, 1.5, 1],
              opacity: [0.1, 0.3, 0.1],
              x: [-1000, 1000],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 z-10 relative h-screen flex items-center justify-center">
        <div className="text-center space-y-8">
          <MotionClient
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative inline-block"
          >
            <div className="text-[12rem] font-bold leading-none bg-gradient-to-r from-primary via-[#B8860B] to-primary bg-clip-text text-transparent relative z-10">
              404
            </div>
            <MotionClient
              className="absolute inset-0 bg-primary/20 blur-3xl"
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </MotionClient>
          <MotionClient
            asChild
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Page Not Found
            </h1>
          </MotionClient>
          <MotionClient
            asChild
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-xl text-zinc-400 max-w-lg mx-auto">
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved.
            </p>
          </MotionClient>

          <MotionClient
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-black hover:opacity-90 transition-all duration-300 px-8 py-6 text-lg font-semibold rounded-md"
              >
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Button>
            </Link>
            <Link href={"/"} passHref>
              <Button
                variant="outline"
                size="lg"
                className="border-primary/20 text-primary hover:text-primary hover:bg-primary/10 hover:border-primary transition-all duration-300 px-8 py-6 text-lg font-semibold rounded-md"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Go Back
              </Button>
            </Link>
          </MotionClient>
        </div>
      </div>
    </main>
  );
}
