import { NavLink } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Shield } from "lucide-react";

export function CtaSection() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #222b18 0%, #131810 100%)",
      }}
    >
      {/* Glow */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(136,144,99,0.3) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{
              background: "rgba(136,144,99,0.1)",
              border: "1px solid rgba(136,144,99,0.2)",
            }}
          >
            <Shield size={14} style={{ color: "#CFBB99" }} />
            <span className="text-xs tracking-widest uppercase" style={{ color: "#CFBB99" }}>
              Start Detecting Today
            </span>
          </div>

          <h2
            className="mb-6"
            style={{
              color: "#E5D7C4",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
            }}
          >
            Ready to Protect Your
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #CFBB99, #889063)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Organization from Misinformation?
            </span>
          </h2>

          <p
            className="max-w-2xl mx-auto mb-10"
            style={{ color: "#889063", lineHeight: 1.7, fontSize: "1.05rem" }}
          >
            Join thousands of journalists, researchers, and organizations already using
            VeritasAI to safeguard information integrity. Start using it for free today
            — no credit card required, no hidden fees.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <NavLink
              to="/contact"
              className="flex items-center gap-3 px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #889063, #4C3D19)",
                color: "#E5D7C4",
                boxShadow: "0 8px 32px rgba(136,144,99,0.4)",
              }}
            >
              <span className="tracking-wider">Start Using Free</span>
              <ArrowRight size={18} />
            </NavLink>
            <a
              href="#demo"
              className="flex items-center gap-3 px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105"
              style={{
                background: "rgba(207,187,153,0.07)",
                border: "1px solid rgba(207,187,153,0.2)",
                color: "#CFBB99",
              }}
            >
              <span className="tracking-wider">Try Live Demo</span>
            </a>
          </div>

          {/* Guarantee */}
          <div className="flex flex-wrap justify-center gap-8">
            {[
              "100% Free Forever",
              "No credit card required",
              "Unlimited analyses",
              "Full feature access",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(136,144,99,0.2)" }}
                >
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#889063" }} />
                </div>
                <span className="text-sm" style={{ color: "#889063" }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
