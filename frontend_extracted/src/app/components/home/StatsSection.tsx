import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

const stats = [
  { value: 98.7, suffix: "%", label: "Detection Accuracy", description: "Industry-leading precision" },
  { value: 500, suffix: "M+", label: "Articles Analyzed", description: "Since platform launch" },
  { value: 1.8, suffix: "s", label: "Average Response", description: "Sub-2 second processing" },
  { value: 47, suffix: "+", label: "Languages", description: "Global coverage" },
  { value: 2, suffix: "B+", label: "Facts in Database", description: "Continuously updated" },
  { value: 10000, suffix: "+", label: "Trusted Sources", description: "Verified globally" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  const display = value % 1 !== 0
    ? count.toFixed(1)
    : count >= 1000
    ? Math.round(count).toLocaleString()
    : Math.round(count).toString();

  return (
    <div ref={ref}>
      {display}{suffix}
    </div>
  );
}

export function StatsSection() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1a2116 0%, #2a2e1a 50%, #1a2116 100%)",
      }}
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #889063 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(136,144,99,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "#889063" }}>
              Platform Performance
            </p>
            <h2
              className="mb-5"
              style={{
                color: "#E5D7C4",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Numbers That{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #CFBB99, #889063)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Speak Truth
              </span>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center rounded-2xl p-6"
              style={{
                background: "rgba(30,36,24,0.5)",
                border: "1px solid rgba(136,144,99,0.1)",
              }}
            >
              <div
                className="text-3xl mb-2"
                style={{
                  background: "linear-gradient(135deg, #CFBB99, #889063)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm mb-1" style={{ color: "#E5D7C4" }}>
                {stat.label}
              </div>
              <div className="text-xs" style={{ color: "#889063", opacity: 0.7 }}>
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
