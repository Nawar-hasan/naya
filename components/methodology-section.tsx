import { MotionClient } from "./ui/MotionClient";

const steps = [
  {
    number: "01",
    title: "Discovery Phase",
    description:
      "Understanding your vision and objectives through in-depth consultation.",
    details: [
      "Initial Consultation",
      "Goal Definition",
      "Requirements Analysis",
      "Vision Alignment",
    ],
  },
  {
    number: "02",
    title: "Research & Analysis",
    description:
      "Comprehensive research to inform strategic decisions and direction.",
    details: [
      "Market Research",
      "Competitor Analysis",
      "Technology Assessment",
      "Opportunity Identification",
    ],
  },
  {
    number: "03",
    title: "Strategic Planning",
    description: "Developing a tailored roadmap for your project's success.",
    details: [
      "Solution Design",
      "Resource Planning",
      "Timeline Development",
      "Risk Assessment",
    ],
  },
  {
    number: "04",
    title: "Implementation",
    description: "Executing the plan with precision and expertise.",
    details: [
      "Development Process",
      "Quality Control",
      "Progress Tracking",
      "Regular Updates",
    ],
  },
  {
    number: "05",
    title: "Optimization",
    description: "Continuous improvement and refinement of solutions.",
    details: [
      "Performance Analysis",
      "User Feedback",
      "Iterative Enhancement",
      "System Optimization",
    ],
  },
  {
    number: "06",
    title: "Success Delivery",
    description: "Ensuring successful deployment and ongoing support.",
    details: [
      "Final Testing",
      "Deployment",
      "Training & Support",
      "Continuous Monitoring",
    ],
  },
];

export default function MethodologySection() {
  return (
    <section className="py-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#B8860B]/5 to-transparent" />
      </div>

      <div className="container mx-auto ">
        <MotionClient className="relative">
          {/* Section Header */}
          <div className="text-center mb-24">
            <MotionClient
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative inline-block"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-[#B8860B] to-[#DAA520] opacity-20 blur-lg" />
              <h2 className="relative text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#B8860B] via-[#DAA520] to-[#B8860B] bg-clip-text text-transparent">
                Our Methodology
              </h2>
            </MotionClient>
            <MotionClient
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="mt-6 text-zinc-400 text-lg max-w-2xl mx-auto">
                A systematic approach to delivering excellence through proven
                steps
              </p>
            </MotionClient>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Central Line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#B8860B]/20  via-[#B8860B]/60 to-[#B8860B]/20" />

            {/* Steps */}
            <div className="space-y-32">
              {steps.map((step, index) => (
                <MotionClient
                  key={step.number}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`relative flex ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  } items-center gap-8 md:gap-16`}
                >
                  {/* Content Side */}
                  <div
                    className={`w-1/2  ${
                      index % 2 === 0 ? "text-right" : "text-left"
                    } `}
                  >
                    <MotionClient
                      initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      viewport={{ once: true }}
                      className="space-y-2  "
                    >
                      <h3
                        dir={index % 2 === 0 ? "rtl" : "ltr"}
                        className="text-3xl font-bold bg-gradient-to-r from-[#B8860B] to-[#DAA520] bg-clip-text text-transparent"
                      >
                        {step.title}
                      </h3>
                      <p className=" text-zinc-400 text-lg">
                        {step.description}
                      </p>
                    </MotionClient>
                    <div className=" h-20 w-full relative ">
                      <MotionClient
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className={`absolute ${
                          index % 2 !== 0
                            ? "-left-8 -translate-x-1/2"
                            : "-right-8 translate-x-1/2"
                        } top-2`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#B8860B] to-[#DAA520] rounded-full blur-lg opacity-50" />
                        <div className="relative w-16 h-16 rounded-full bg-gradient-to-r from-[#B8860B] to-[#DAA520] p-[2px]">
                          <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                            <span className="text-2xl font-bold bg-gradient-to-r from-[#B8860B] to-[#DAA520] bg-clip-text text-transparent">
                              {step.number}
                            </span>
                          </div>
                        </div>

                        {/* Connecting Lines */}
                        {/* <div
                          className={`absolute top-1/2 -translate-y-1/2 ${
                            index % 2 === 0 ? "-right-8" : "-left-8"
                          } w-8 h-px bg-gradient-to-r from-[#B8860B]/30 to-[#DAA520]/30`}
                        /> */}
                      </MotionClient>
                    </div>
                    <MotionClient
                      asChild
                      initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <ul
                        className={`space-y-2   ${
                          index % 2 === 0 ? "ml-auto" : "mr-auto"
                        } max-w-xs`}
                      >
                        {step.details.map((detail, i) => (
                          <li
                            key={i}
                            className={`flex ${
                              index % 2 === 0 ? "justify-end" : "justify-start"
                            } items-center gap-2 text-zinc-500 group`}
                          >
                            <div
                              className={`h-px bg-gradient-to-r from-[#B8860B]/50 to-[#DAA520]/50 transition-all duration-300 group-hover:w-12 ${
                                index % 2 === 0
                                  ? "order-1 w-8 ml-2"
                                  : "order-none w-8 mr-2"
                              }`}
                            />
                            <span className="group-hover:text-[#DAA520] transition-colors duration-300">
                              {detail}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </MotionClient>
                  </div>

                  {/* Empty Side */}
                  {/* <div className="w-1/2 max-md:hidden " /> */}
                </MotionClient>
              ))}
            </div>
          </div>
        </MotionClient>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <MotionClient
            key={i}
            className="absolute w-1 h-1 bg-[#B8860B]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
    </section>
  );
}
