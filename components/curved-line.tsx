import { MotionClient } from "./ui/MotionClient";

export default function CurvedLine() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        {/* Glow Filter */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feComposite in="blur" operator="over" in2="SourceGraphic" />
          </filter>
        </defs>

        {/* Animated Path */}
        <MotionClient
          asChild
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { duration: 3, ease: "easeInOut" },
            opacity: { duration: 0.5 },
          }}
        >
          <path
            d="M20,10 C40,40 60,60 80,90"
            stroke="url(#goldGradient)"
            strokeWidth="0.2"
            fill="none"
            filter="url(#glow)"
          />
        </MotionClient>

        {/* Gold Gradient */}
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#FFD700" stopOpacity="0.3" />
        </linearGradient>

        {/* Decorative Particles */}
        {[...Array(5)].map((_, i) => (
          <MotionClient
            asChild
            key={i}
            initial={{
              opacity: 0,
              x: 20 + i * 15,
              y: 10 + i * 20,
            }}
            animate={{
              opacity: [0, 1, 0],
              x: 20 + i * 15,
              y: [10 + i * 20, 90],
            }}
            transition={{
              duration: 4,
              delay: i * 0.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <circle r="0.3" fill="#D4AF37" filter="url(#glow)" />
          </MotionClient>
        ))}
      </svg>
    </div>
  );
}
