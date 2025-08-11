import { getAllServices } from "@/app/server/actions";
import { contactInfo } from "@/constants";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { MotionClient } from "./ui/MotionClient";

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const services = await getAllServices();
  return (
    <footer className="bg-black border-t border-primary/10">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-[#DAA520] bg-clip-text text-transparent">
              Naya
            </h3>
            <p className="text-zinc-400 max-w-xs">
              Transforming ideas into exceptional digital experiences through
              innovative technology and creative solutions.
            </p>
            <div className="flex gap-4">
              {[
                {
                  icon: FaFacebookF,
                  href: contactInfo.facebook,
                  label: "Facebook",
                },

                {
                  icon: FaInstagram,
                  href: contactInfo.instagram,
                  label: "Instagram",
                },
              ].map((social, index) => (
                <MotionClient
                  key={social.label}
                  asChild
                  whileHover={{ scale: 1.1 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="p-2 rounded-full border border-primary/20 text-primary hover:bg-primary/10 transition-colors relative group"
                  >
                    <div className="absolute inset-0 rounded-full bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <social.icon className="w-4 h-4" />
                  </a>
                </MotionClient>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { text: "About Us", href: "/about" },
                { text: "Services", href: "/services" },
                { text: "Portfolio", href: "/portfolio" },
                { text: "Contact", href: "/contact" },
              ].map((link, index) => (
                <MotionClient
                  asChild
                  key={link.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <li>
                    <Link
                      href={link.href}
                      className="text-zinc-400 hover:text-primary transition-colors relative group"
                    >
                      <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.text}
                    </Link>
                  </li>
                </MotionClient>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Our Services</h3>
            <ul className="space-y-2">
              {services.slice(0, 3).map((service, index) => (
                <MotionClient
                  asChild
                  key={service.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <li>
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-zinc-400 hover:text-primary transition-colors relative group"
                    >
                      <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {service.title}
                    </Link>
                  </li>
                </MotionClient>
              ))}
              <MotionClient
                asChild
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <li>
                  <Link
                    href={`/services`}
                    className="text-zinc-400 capitalize   hover:text-primary transition-colors relative group"
                  >
                    <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    view more
                  </Link>
                </li>
              </MotionClient>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <ul className="space-y-4">
              {[
                {
                  icon: Mail,
                  text: `${contactInfo.email}`,
                  href: `mailto:${contactInfo.email}`,
                },
                {
                  icon: Phone,
                  text: `${contactInfo.phone}`,
                  href: `tel:${contactInfo.phone}`,
                },
                {
                  icon: MapPin,
                  text: contactInfo.location,
                  href: contactInfo.googleMap,
                },
              ].map((contact, index) => (
                <MotionClient
                  asChild
                  key={contact.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <li className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      <contact.icon className="w-4 h-4" />
                    </div>
                    <Link
                      href={contact.href}
                      className="text-zinc-400 hover:text-primary transition-colors"
                    >
                      {contact.text}
                    </Link>
                  </li>
                </MotionClient>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-primary/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-zinc-500 text-sm">
              © {currentYear} Naya. All rights reserved.
            </p>
            <div className="flex gap-6">
              {[
                { text: "Privacy Policy", href: "/privacy" },
                { text: "Terms of Service", href: "/terms" },
                // { text: "Cookie Policy", href: "/cookies" },
              ].map((link) => (
                <Link
                  key={link.text}
                  href={link.href}
                  className="text-zinc-500 hover:text-primary text-sm transition-colors"
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
