import { NavLink } from "react-router";
import { ArrowRight, Play, Sparkles, TrendingUp, Shield, Zap } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const heroImage = "https://images.unsplash.com/photo-1729554608003-5ec8be42da1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwZGF0YSUyMGFuYWx5c2lzJTIwZGFyayUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcyNzAzODUxfDA&ixlib=rb-4.1.0&q=80&w=1080";

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      style={{
        background: "linear-gradient(135deg, #131810 0%, #1e2418 40%, #2a2e1a 100%)",
      }}
    >
      {/* Background image overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Gradient overlays */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(136,144,99,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: "linear-gradient(to top, #1e2418, transparent)",
        }}
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-20"
          style={{
            width: `${[3, 5, 2, 4, 3, 6][i]}px`,
            height: `${[3, 5, 2, 4, 3, 6][i]}px`,
            background: "#889063",
            left: `${[15, 75, 35, 85, 55, 25][i]}%`,
            top: `${[20, 35, 65, 25, 70, 50][i]}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{
                background: "rgba(136,144,99,0.1)",
                border: "1px solid rgba(136,144,99,0.25)",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Sparkles size={14} style={{ color: "#CFBB99" }} />
              <span className="text-xs tracking-widest uppercase" style={{ color: "#CFBB99" }}>
                AI-Powered Truth Engine v3.0
              </span>
            </motion.div>

            <h1 className="mb-6" style={{ lineHeight: 1.1 }}>
              <span
                className="block"
                style={{
                  color: "#E5D7C4",
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  letterSpacing: "-0.02em",
                }}
              >
                Detect Fake News
              </span>
              <span
                className="block"
                style={{
                  background: "linear-gradient(135deg, #CFBB99 0%, #889063 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  letterSpacing: "-0.02em",
                }}
              >
                With Precision
              </span>
              <span
                className="block"
                style={{
                  color: "#E5D7C4",
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  letterSpacing: "-0.02em",
                }}
              >
                & Confidence
              </span>
            </h1>

            <p
              className="mb-10 max-w-lg"
              style={{ color: "#889063", lineHeight: 1.7, fontSize: "1.1rem" }}
            >
              VeritasAI uses cutting-edge neural networks and multi-source verification
              to analyze news content in real time. Protect your organization from
              misinformation with 98.7% detection accuracy.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <NavLink
                to="/contact"
                className="flex items-center gap-3 px-7 py-3.5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #889063, #4C3D19)",
                  color: "#E5D7C4",
                  boxShadow: "0 6px 24px rgba(136,144,99,0.35)",
                }}
              >
                <span className="text-sm tracking-wider">Start Using Free</span>
                <ArrowRight size={16} />
              </NavLink>
              <a
                href="#demo"
                className="flex items-center gap-3 px-7 py-3.5 rounded-xl transition-all duration-300 hover:scale-105"
                style={{
                  background: "rgba(207,187,153,0.07)",
                  border: "1px solid rgba(207,187,153,0.2)",
                  color: "#CFBB99",
                }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(207,187,153,0.15)" }}
                >
                  <Play size={12} fill="#CFBB99" />
                </div>
                <span className="text-sm tracking-wider">Watch Demo</span>
              </a>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6">
              {[
                { icon: Shield, text: "98.7% Accuracy" },
                { icon: Zap, text: "< 2s Response" },
                { icon: TrendingUp, text: "500M+ Analyzed" },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Icon size={15} style={{ color: "#CFBB99" }} />
                  <span className="text-sm" style={{ color: "#889063" }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            {/* Main card */}
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(136,144,99,0.15)",
              }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1678845536613-5cf0ec5245cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNoaW5lJTIwbGVhcm5pbmclMjBuZXVyYWwlMjBuZXR3b3JrJTIwZGVlcCUyMGFuYWx5c2lzfGVufDF8fHx8MTc3MjcwMzg1N3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="AI Analysis Dashboard"
                className="w-full h-80 object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent 40%, rgba(30,36,24,0.95) 100%)",
                }}
              />

              {/* Overlay stats */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Articles Scanned", value: "2.4M" },
                    { label: "Fake Detected", value: "98.7%" },
                    { label: "Avg. Time", value: "1.8s" },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="rounded-xl p-3 text-center"
                      style={{
                        background: "rgba(30,36,24,0.85)",
                        border: "1px solid rgba(136,144,99,0.2)",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <div
                        className="text-xl mb-1"
                        style={{ color: "#CFBB99" }}
                      >
                        {stat.value}
                      </div>
                      <div className="text-xs" style={{ color: "#889063" }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating alert card */}
            <motion.div
              className="absolute -top-6 -left-6 rounded-2xl px-4 py-3 flex items-center gap-3"
              style={{
                background: "rgba(30,36,24,0.95)",
                border: "1px solid rgba(136,144,99,0.3)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "rgba(220, 80, 80, 0.2)" }}
              >
                <div className="w-3 h-3 rounded-full" style={{ background: "#dc5050" }} />
              </div>
              <div>
                <div className="text-xs" style={{ color: "#E5D7C4" }}>
                  Fake News Detected
                </div>
                <div className="text-xs" style={{ color: "#889063" }}>
                  Confidence: 97.3%
                </div>
              </div>
            </motion.div>

            {/* Floating verified card */}
            <motion.div
              className="absolute -bottom-4 -right-4 rounded-2xl px-4 py-3 flex items-center gap-3"
              style={{
                background: "rgba(30,36,24,0.95)",
                border: "1px solid rgba(136,144,99,0.3)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "rgba(136,144,99,0.2)" }}
              >
                <Shield size={16} style={{ color: "#889063" }} />
              </div>
              <div>
                <div className="text-xs" style={{ color: "#E5D7C4" }}>
                  Source Verified
                </div>
                <div className="text-xs" style={{ color: "#889063" }}>
                  Trust Score: 94.1%
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
