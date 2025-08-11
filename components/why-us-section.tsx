import { MotionClient } from "./ui/MotionClient";

export default function WhyUsSection() {
  return (
    <section className="relative overflow-hidden py-16">
      {/* Background */}
      <div className="absolute inset-0 bg-[#1a1a1a]" />
      <div className="container mx-auto relative">
        <MotionClient
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Hexagon Grid */}
          <div className="relative w-full max-w-md mx-auto mb-6">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <defs>
                {/* Gradient */}
                <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#B8860B" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#DAA520" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#B8860B" stopOpacity="0.4" />
                </linearGradient>
                {/* Glow Filter */}
                <filter id="hexGlow">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feComposite in="blur" in2="SourceGraphic" operator="over" />
                </filter>
                {/* Point Glow */}
                <radialGradient id="hexPointGlow">
                  <stop offset="0%" stopColor="#FFD700" stopOpacity="1" />
                  <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Hexagon Grid */}
              <g filter="url(#hexGlow)">
                {[
                  [100, 50], // Center
                  [75, 87], // Bottom-left
                  [125, 87], // Bottom-right
                  [50, 87], // Far left
                  [150, 87], // Far right
                  [75, 13], // Top-left
                  [125, 13], // Top-right
                ].map(([cx, cy], index) => (
                  <MotionClient
                    key={index}
                    asChild
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: index * 0.2, ease: "easeInOut" }}
                  >
                    <path
                      d={`M${cx - 15},${cy - 26} L${cx + 15},${cy - 26} L${cx + 30},${cy} L${cx + 15},${cy + 26} L${cx - 15},${cy + 26} L${cx - 30},${cy} Z`}
                      stroke="url(#hexGradient)"
                      strokeWidth="0.5"
                      fill="none"
                    />
                  </MotionClient>
                ))}
              </g>

              {/* Glowing Points */}
              {[
                [100, 50], // Center
                [75, 87], // Bottom-left
                [125, 87], // Bottom-right
                [75, 13], // Top-left
                [125, 13], // Top-right
              ].map(([cx, cy], index) => (
                <MotionClient key={index} asChild>
                  <g>
                    <MotionClient
                      asChild
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
                      transition={{
                        duration: 2,
                        delay: index * 0.3,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    >
                      <circle cx={cx} cy={cy} r="2" fill="#FFD700" />
                    </MotionClient>
                    <MotionClient
                      asChild
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0.5, 0.3] }}
                      transition={{
                        duration: 2,
                        delay: index * 0.3,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    >
                      <circle cx={cx} cy={cy} r="4" fill="url(#hexPointGlow)" />
                    </MotionClient>
                  </g>
                </MotionClient>
              ))}
            </svg>
          </div>

          {/* Content */}
          <div className="space-y-12 py-4">
            <MotionClient
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#B8860B] via-[#DAA520] to-[#B8860B] bg-clip-text text-transparent">
                Why Partner With Us
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                We combine strategic thinking with creative execution to grow brands and drive results.
              </p>
            </MotionClient>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <MotionClient
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative bg-[#222] p-6 rounded-lg shadow-lg"
              >
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#B8860B] to-[#DAA520] bg-clip-text text-transparent">
                  Strategic Brand Building
                </h3>
                <p className="text-zinc-400 text-base leading-relaxed">
                  At Naya, we go beyond visuals — we build brands with purpose.  
                  Our team crafts experiences that connect emotionally and convert effectively.
                </p>
              </MotionClient>

              <MotionClient
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative bg-[#222] p-6 rounded-lg shadow-lg"
              >
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#B8860B] to-[#DAA520] bg-clip-text text-transparent">
                  Expert Minds. Proven Process.
                </h3>
                <p className="text-zinc-400 text-base leading-relaxed">
                  Our multidisciplinary team brings together expertise in marketing,  
                  development, content, and design. With a clear process and innovative thinking,  
                  we deliver campaigns that perform.
                </p>
              </MotionClient>

              <MotionClient
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative bg-[#222] p-6 rounded-lg shadow-lg"
              >
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#B8860B] to-[#DAA520] bg-clip-text text-transparent">
                  Results That Drive Growth
                </h3>
                <p className="text-zinc-400 text-base leading-relaxed">
                  We don’t just launch campaigns — we generate outcomes.  
                  Whether your goal is visibility, engagement, or revenue,  
                  we back every idea with data.
                </p>
              </MotionClient>
            </div>
          </div>
        </MotionClient>
      </div>

      {/* Light Beam Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <MotionClient
            key={i}
            className="absolute w-full h-full opacity-20"
            style={{
              background: `
                linear-gradient(${45 + i * 30}deg, 
                  transparent 0%, 
                  rgba(218,165,32,0.05) 45%, 
                  rgba(218,165,32,0.1) 50%, 
                  rgba(218,165,32,0.05) 55%, 
                  transparent 100%
                )
              `,
            }}
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 12 + i * 4,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </section>
  );
}