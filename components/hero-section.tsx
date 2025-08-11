import { getAllProjects, getAllTeamMembers } from "@/app/server/actions";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Code2,
  Globe2,
  MonitorSmartphone,
  Palette,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function HeroSection() {
  const teamMembers = await getAllTeamMembers();
  const projects = await getAllProjects();
  const numberOfProject = projects.length || 0;
  const numberOfMember = teamMembers.length || 0;
  return (
    <section className="relative bg-green  space-y-8 ">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-primary/5 to-transparent transform -skew-y-12"
          style={{ width: "200%", left: "-50%" }}
        />
      </div>

      <div className="mx-auto bg-custom relative flex md:justify-between items-center">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-12 lg:gap-20 items-center relative z-10">
          {/* Left Content */}
        <div className="min-h-screen container lg:col-span-3 space-y-12">
  <div className="space-y-6 pt-20">
    <h1 className="max-mn:text-3xl text-4xl md:text-6xl font-bold leading-tight">
      <span className="text-white block">Fueling</span>
      <span className="relative inline-block">
        <span className="relative z-10 text-primary">
          Your Brand's Digital Success
        </span>
        <div className="absolute -inset-1 bg-primary/20 blur-xl" />
      </span>
    </h1>
    <p className="max-mn:text-base text-xl text-zinc-400 max-w-xl">
     we specialize in transforming brands into digital leaders.  
      Through data-driven marketing, innovative creative strategies, and cutting-edge technology,  
      we deliver personalized campaigns that not only engage your audience but convert them into loyal customers.  
      Partner with us to elevate your brand visibility, drive measurable growth, and dominate your market.
    </p>
  </div>

  <div className="flex flex-wrap gap-6">
    <Link href="/contact">
      <Button
        size={"lg"}
        className="h-14 px-8 bg-primary text-black font-medium text-lg"
      >
        <span className="flex items-center gap-2">
          Let's Talk
          <ArrowRight className="w-5 h-5" />
        </span>
      </Button>
    </Link>
    <Link href="/services">
      <Button
        variant={"outline"}
        size={"lg"}
        className="h-14 px-8 border-primary text-primary"
      >
        See How We Can Help
      </Button>
    </Link>
  </div>

  <div className="flex max-md:flex-col gap-12 pt-8 border-t border-white/10">
    {[
      { number: "10+", label: "Years Driving Results" },
      { number: numberOfProject + "+", label: "Successful Campaigns" },
      { number: numberOfMember + "+", label: "Expert Marketing Professionals" },
    ].map((stat, index) => (
      <div key={index} className="space-y-2">
        <div className="text-3xl font-bold text-primary">
          {stat.number}
        </div>
        <div className="text-sm text-zinc-500">{stat.label}</div>
      </div>
    ))}
  </div>
</div>


          {/* Right Content */}
          <div className="lg:col-span-2 w-full relative">
            <div className="aspect-square max-lg:scale-[0.6] origin-center relative">
              <div className="absolute inset-0 border border-primary/30 transform rotate-45">
                <div className="absolute inset-0 flex items-center justify-center -rotate-45">
                  <div className="relative w-40 h-40">
                    <div className="absolute -inset-4 bg-primary/10 blur-xl rounded-full" />
                    <Image
                      src="/nawargroup.png"
                      alt="Naya"
                      width={300}
                      height={300}
                      className="relative w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Icons */}
                <div className="absolute inset-0">
                  <div className="absolute top-[10%] left-1/2 -translate-x-1/2 -rotate-45 z-50">
                    <a
                      href="https://buildify.example.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 bg-black/50 border border-primary/20 rounded-lg cursor-pointer flex justify-center items-center"
                    >
                      <Image
                        src="/buildify.png"
                        alt="Buildify"
                        width={30}
                        height={30}
                        className="object-contain"
                      />
                    </a>
                  </div>

                  <div className="absolute bottom-[10%] left-[40%] left-1/2 -translate-x-1/2 -rotate-45 z-50">
                    <a
                      href="https://example.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 bg-black/50 border border-primary/20 rounded-lg cursor-pointer flex justify-center items-center"
                    >
                      <Image
                        src="/s7.png"
                        alt="s7"
                        width={30}
                        height={30}
                        className="object-contain"
                      />
                    </a>
                  </div>

                  <div className="absolute left-[10%] top-1/2 -translate-y-1/2 -rotate-45 z-50">
                    <a
                      href="https://mostawa.example.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 bg-black/50 border border-primary/20 rounded-lg cursor-pointer flex justify-center items-center"
                    >
                      <Image
                        src="/mostua.png"
                        alt="Mostawa"
                        width={30}
                        height={30}
                        className="object-contain"
                      />
                    </a>
                  </div>

                  <div className="absolute right-[10%] top-[70%] top-1/2 -translate-y-1/2 -rotate-45 z-50">
                    <a
                      href="https://ola.example.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 bg-black/50 border border-primary/20 rounded-lg cursor-pointer flex justify-center items-center"
                    >
                      <Image
                        src="/ola.png"
                        alt="Ola"
                        width={30}
                        height={30}
                        className="object-contain"
                      />
                    </a>
                  </div>

                  <div className="absolute right-[10%] top-[20%] top-1/2 -translate-y -rotate-45 z-50">
                    <a
                      href="https://olwar.example.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 bg-black/50 border border-primary/20 rounded-lg cursor-pointer flex justify-center items-center"
                    >
                      <Image
                        src="/OLWAR.png"
                        alt="OLWAR"
                        width={30}
                        height={30}
                        className="object-contain"
                      />
                    </a>
                  </div>
                </div>

                {/* Inner Borders */}
                <div className="absolute inset-8 border border-primary/20">
                  <div className="absolute inset-8 border border-primary/10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
