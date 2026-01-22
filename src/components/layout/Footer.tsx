import { Link } from "react-router-dom";
import { Mountain, Facebook, Instagram, Mail, MapPin } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Početna" },
  { href: "/grad-i-sela", label: "Grad i sela" },
  { href: "/planine", label: "Planine" },
  { href: "/galerija", label: "Galerija" },
  { href: "/o-nama", label: "O nama" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Mountain className="h-8 w-8 text-primary-foreground/90" />
              <span className="font-serif text-xl font-semibold">
                Ognjište Bosansko Grahovo
              </span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-sm">
              Otkrijte prirodne ljepote, bogatu baštinu i gostoljubivost našeg kraja.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Brze veze</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Kontakt</h4>
            <div className="space-y-3 text-sm text-primary-foreground/70">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>Bosansko Grahovo, Bosna i Hercegovina</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:info@ognjiste-bg.ba" className="hover:text-primary-foreground transition-colors">
                  info@ognjiste-bg.ba
                </a>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary-foreground/10 mt-10 pt-8 text-center text-sm text-primary-foreground/50">
          <p>© {new Date().getFullYear()} Ognjište Bosansko Grahovo. Sva prava zadržana.</p>
        </div>
      </div>
    </footer>
  );
}
