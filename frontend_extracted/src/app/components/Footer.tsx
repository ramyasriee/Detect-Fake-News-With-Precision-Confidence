import { NavLink } from "react-router";
import { ShieldCheck, Twitter, Linkedin, Github, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #1e2418 0%, #131810 100%)",
        borderTop: "1px solid rgba(136,144,99,0.15)",
      }}
    >
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <NavLink to="/" className="flex items-center gap-3 mb-6 group">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #889063, #4C3D19)",
                  boxShadow: "0 4px 16px rgba(136,144,99,0.3)",
                }}
              >
                <ShieldCheck size={22} style={{ color: "#E5D7C4" }} strokeWidth={2} />
              </div>
              <div>
                <span className="block text-base tracking-widest uppercase" style={{ color: "#E5D7C4" }}>
                  VeritasAI
                </span>
                <span className="block text-xs tracking-wider" style={{ color: "#889063" }}>
                  TRUTH INTELLIGENCE
                </span>
              </div>
            </NavLink>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#889063" }}>
              The world's most advanced AI-powered fake news detection platform. 
              Trusted by journalists, enterprises, and government agencies to 
              ensure information integrity.
            </p>
            <div className="flex gap-3">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    background: "rgba(136,144,99,0.1)",
                    border: "1px solid rgba(136,144,99,0.2)",
                    color: "#889063",
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm tracking-widest uppercase mb-5" style={{ color: "#CFBB99" }}>
              Product
            </h4>
            <ul className="space-y-3">
              {["Features", "Pricing", "API Access", "Integrations", "Changelog", "Roadmap"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm transition-colors duration-200 hover:text-opacity-100"
                    style={{ color: "#889063" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#CFBB99")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#889063")}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm tracking-widest uppercase mb-5" style={{ color: "#CFBB99" }}>
              Company
            </h4>
            <ul className="space-y-3">
              {["About Us", "Our Mission", "Team", "Careers", "Press", "Partners"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm transition-colors duration-200"
                    style={{ color: "#889063" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#CFBB99")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#889063")}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm tracking-widest uppercase mb-5" style={{ color: "#CFBB99" }}>
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="mt-0.5 shrink-0" style={{ color: "#889063" }} />
                <span className="text-sm" style={{ color: "#889063" }}>
                  1250 Intelligence Ave,<br />San Francisco, CA 94105
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="shrink-0" style={{ color: "#889063" }} />
                <a
                  href="mailto:hello@veritasai.com"
                  className="text-sm transition-colors duration-200"
                  style={{ color: "#889063" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#CFBB99")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#889063")}
                >
                  hello@veritasai.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="shrink-0" style={{ color: "#889063" }} />
                <a
                  href="tel:+14155551234"
                  className="text-sm transition-colors duration-200"
                  style={{ color: "#889063" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#CFBB99")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#889063")}
                >
                  +1 (415) 555-1234
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid rgba(136,144,99,0.1)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs tracking-wider" style={{ color: "#4C3D19", color: "#889063", opacity: 0.6 }}>
            © {currentYear} VeritasAI. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy", "Security"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs tracking-wider transition-colors duration-200"
                style={{ color: "#889063", opacity: 0.6 }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
