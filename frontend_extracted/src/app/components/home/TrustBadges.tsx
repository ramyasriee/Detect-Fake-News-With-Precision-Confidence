import { motion } from "motion/react";

const trustedBy = [
  "Reuters",
  "BBC Verify",
  "AP News",
  "FactCheck.org",
  "Politico",
  "The Guardian",
  "Bloomberg",
  "CNBC",
];

export function TrustBadges() {
  return (
    <section
      className="py-16 overflow-hidden"
      style={{
        background: "rgba(20,25,16,0.8)",
        borderTop: "1px solid rgba(136,144,99,0.08)",
        borderBottom: "1px solid rgba(136,144,99,0.08)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p
          className="text-center text-xs tracking-widest uppercase mb-10"
          style={{ color: "#889063", opacity: 0.6 }}
        >
          Trusted by leading media organizations & enterprises worldwide
        </p>

        <div className="relative">
          {/* Fade edges */}
          <div
            className="absolute left-0 top-0 bottom-0 w-24 z-10"
            style={{
              background:
                "linear-gradient(to right, rgba(20,25,16,1), transparent)",
            }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-24 z-10"
            style={{
              background:
                "linear-gradient(to left, rgba(20,25,16,1), transparent)",
            }}
          />

          <div className="flex gap-16 items-center overflow-hidden">
            <motion.div
              className="flex gap-16 items-center shrink-0"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...trustedBy, ...trustedBy].map((name, i) => (
                <div
                  key={i}
                  className="shrink-0 text-base tracking-widest uppercase"
                  style={{
                    color: "#4C3D19",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    opacity: 0.7,
                    filter: "brightness(1.8)",
                  }}
                >
                  {name}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
