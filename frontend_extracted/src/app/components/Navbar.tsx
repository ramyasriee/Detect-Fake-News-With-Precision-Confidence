import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router";
import { Menu, X, ShieldCheck, ChevronDown } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/features", label: "Features" },
    { to: "/pricing", label: "Pricing" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(30, 36, 24, 0.97)"
          : "rgba(30, 36, 24, 0.6)",
        backdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid rgba(136, 144, 99, 0.15)" : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.4)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3 group">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{
                background: "linear-gradient(135deg, #889063, #4C3D19)",
                boxShadow: "0 4px 16px rgba(136,144,99,0.35)",
              }}
            >
              <ShieldCheck size={22} style={{ color: "#E5D7C4" }} strokeWidth={2} />
            </div>
            <div>
              <span
                className="block text-base tracking-widest uppercase"
                style={{ color: "#E5D7C4", letterSpacing: "0.12em" }}
              >
                VeritasAI
              </span>
              <span
                className="block text-xs tracking-wider"
                style={{ color: "#889063", letterSpacing: "0.18em" }}
              >
                TRUTH INTELLIGENCE
              </span>
            </div>
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm tracking-wider transition-all duration-200 ${
                    isActive
                      ? "font-medium"
                      : "hover:text-opacity-100"
                  }`
                }
                style={({ isActive }) => ({
                  color: isActive ? "#CFBB99" : "#889063",
                  background: isActive ? "rgba(136,144,99,0.12)" : "transparent",
                  letterSpacing: "0.08em",
                })}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <NavLink
              to="/contact"
              className="px-5 py-2.5 rounded-xl text-sm tracking-wider transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #889063, #4C3D19)",
                color: "#E5D7C4",
                letterSpacing: "0.08em",
                boxShadow: "0 4px 16px rgba(136,144,99,0.3)",
              }}
            >
              Start Free
            </NavLink>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg transition-colors"
            style={{ color: "#CFBB99" }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className="lg:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: isOpen ? "400px" : "0",
          background: "rgba(30, 36, 24, 0.98)",
          borderTop: isOpen ? "1px solid rgba(136,144,99,0.15)" : "none",
        }}
      >
        <div className="px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `px-4 py-3 rounded-xl text-sm tracking-wider transition-all duration-200 ${
                  isActive ? "font-medium" : ""
                }`
              }
              style={({ isActive }) => ({
                color: isActive ? "#CFBB99" : "#889063",
                background: isActive ? "rgba(136,144,99,0.1)" : "transparent",
              })}
            >
              {link.label}
            </NavLink>
          ))}
          <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(136,144,99,0.15)" }}>
            <NavLink
              to="/contact"
              className="w-full flex items-center justify-center py-3 rounded-xl text-sm tracking-wider transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #889063, #4C3D19)",
                color: "#E5D7C4",
              }}
            >
              Start Free
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
